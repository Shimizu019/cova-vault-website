import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  BookOpen,
  CalendarDays,
  Folder,
  HelpCircle,
  KeyRound,
  ListChecks,
  PiggyBank,
  Receipt,
  Rocket,
  ScrollText,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  Star,
  StickyNote,
  Wallet,
} from 'lucide-react';

/** Lucide icon per documentation topic; unknown topics fall back to BookOpen. */
export const topicIcons: Record<string, LucideIcon> = {
  'getting-started': Rocket,
  installation: Smartphone,
  'first-setup': SlidersHorizontal,
  credentials: KeyRound,
  notes: StickyNote,
  tasks: ListChecks,
  peralog: Receipt,
  wallet: Wallet,
  savings: PiggyBank,
  folders: Folder,
  favorites: Star,
  calendar: CalendarDays,
  'activity-log': ScrollText,
  backup: Archive,
  security: ShieldCheck,
  faq: HelpCircle,
};

export const topicIcon = (id: string): LucideIcon => topicIcons[id] ?? BookOpen;
