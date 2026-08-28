// Tiny event bus so any CTA anywhere in the tree can open the order modal
// without threading an onOpenOrder prop through every section component.
export const ORDER_MODAL_EVENT = "order-modal:open";

export function openOrderModal() {
  window.dispatchEvent(new CustomEvent(ORDER_MODAL_EVENT));
}
