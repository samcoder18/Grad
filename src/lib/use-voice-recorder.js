import { useCallback, useEffect, useRef, useState } from "react";

// Records a short voice message in the order form via MediaRecorder and
// exposes the result as a Blob that gets sent to Telegram with the order.
const MAX_SECONDS = 120;

const MIME_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/ogg;codecs=opus",
  "audio/mp4",
];

function pickMimeType() {
  if (typeof MediaRecorder === "undefined") return undefined;
  return MIME_CANDIDATES.find((t) => MediaRecorder.isTypeSupported(t));
}

export function useVoiceRecorder() {
  const [status, setStatus] = useState("idle"); // idle | requesting | recording | recorded
  const [error, setError] = useState(null);
  const [blob, setBlob] = useState(null);
  const [url, setUrl] = useState(null);
  const [duration, setDuration] = useState(0);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const cancelledRef = useRef(false);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const stop = useCallback(() => {
    if (recorderRef.current?.state !== "inactive") {
      recorderRef.current?.stop();
    }
  }, []);

  const reset = useCallback(() => {
    // Only an in-flight recording needs its onstop result discarded.
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      cancelledRef.current = true;
      recorderRef.current.stop();
    }
    stopTimer();
    stopTracks();
    recorderRef.current = null;
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setBlob(null);
    setDuration(0);
    setError(null);
    setStatus("idle");
  }, []);

  // Cleanup on unmount so the mic is never left open.
  useEffect(() => reset, [reset]);

  const start = useCallback(async () => {
    setError(null);
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stopTimer();
        stopTracks();
        // reset() was called while recording — discard the partial take.
        if (cancelledRef.current) {
          cancelledRef.current = false;
          return;
        }
        const type = recorder.mimeType || mimeType || "audio/webm";
        const recorded = new Blob(chunksRef.current, { type });
        setBlob(recorded);
        setUrl(URL.createObjectURL(recorded));
        setStatus("recorded");
      };

      recorder.start();
      setDuration(0);
      setStatus("recording");
      timerRef.current = setInterval(() => {
        setDuration((d) => {
          if (d + 1 >= MAX_SECONDS) {
            stop();
            return MAX_SECONDS;
          }
          return d + 1;
        });
      }, 1000);
    } catch (err) {
      stopTracks();
      setStatus("idle");
      setError(
        err?.name === "NotAllowedError"
          ? "Нет доступа к микрофону. Разрешите доступ в настройках браузера."
          : "Не удалось начать запись. Попробуйте ещё раз.",
      );
    }
  }, [stop]);

  return { status, error, blob, url, duration, start, stop, reset };
}
