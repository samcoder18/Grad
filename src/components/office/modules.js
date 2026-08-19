import {
  Crown,
  ChartLineUp,
  Bank,
  Folders,
  Handshake,
  PenNib,
  PhoneCall,
  Network,
  Headset,
} from "@phosphor-icons/react";
import Leadership from "./Leadership.jsx";
import Department from "./Department.jsx";
import Deals from "./Deals.jsx";
import Contracts from "./Contracts.jsx";
import ColdCallAssistant from "./ColdCallAssistant.jsx";
import PartnerNetwork from "./PartnerNetwork.jsx";
import Clients from "./Clients.jsx";

export const MODULE_GROUPS = [
  { id: "company", title: "Компания" },
  { id: "deals", title: "Сделки" },
  { id: "growth", title: "Развитие" },
];

export const MODULES = [
  { id: "leadership", group: "company", title: "Руководство", icon: Crown, component: Leadership },
  { id: "sales", group: "company", title: "Отдел продаж", icon: ChartLineUp, component: Department, props: { departmentId: "sales" } },
  { id: "finance", group: "company", title: "Финансовый отдел", icon: Bank, component: Department, props: { departmentId: "finance" } },
  { id: "finadmin", group: "company", title: "Финансово-адм. отдел", icon: Folders, component: Department, props: { departmentId: "finadmin" } },
  { id: "deals", group: "deals", title: "Сделки", icon: Handshake, component: Deals },
  { id: "contracts", group: "deals", title: "Договоры по ЭЦП", icon: PenNib, component: Contracts },
  { id: "assistant", group: "growth", title: "Ассистент переговоров", icon: PhoneCall, component: ColdCallAssistant },
  { id: "partners", group: "growth", title: "Партнёрская сеть", icon: Network, component: PartnerNetwork },
  { id: "clients", group: "growth", title: "Клиенты", icon: Headset, component: Clients },
];
