import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  CalendarDays,
  Coins,
  Folder,
  KeyRound,
  ListChecks,
  PiggyBank,
  Receipt,
  ShieldCheck,
  Shuffle,
  Star,
  StickyNote,
  Wallet,
  Zap,
} from 'lucide-react';

/**
 * Presentation metadata for the 11 vault modules: Lucide icon, tinted-square
 * accent color, and a one-line summary condensed from the module's existing
 * description in `features.ts` (no new claims are introduced here).
 * Class strings are kept literal so Tailwind's JIT can see them.
 */
export interface ModuleMeta {
  icon: LucideIcon;
  /** Full Tailwind classes for the tinted rounded-square icon holder. */
  tint: string;
  /** One-line description condensed from the existing feature description. */
  line: string;
}

export const moduleMeta: Record<string, ModuleMeta> = {
  credentials: {
    icon: KeyRound,
    tint: 'text-sky-400 light:text-sky-600 bg-sky-500/10 ring-1 ring-inset ring-sky-500/30',
    line: 'Password storage with tags, favorites, a strength meter, and a generator.',
  },
  'password-generator': {
    icon: Shuffle,
    tint: 'text-violet-400 light:text-violet-600 bg-violet-500/10 ring-1 ring-inset ring-violet-500/30',
    line: 'Generate strong passwords when creating or updating credentials.',
  },
  folders: {
    icon: Folder,
    tint: 'text-orange-400 light:text-orange-600 bg-orange-500/10 ring-1 ring-inset ring-orange-500/30',
    line: 'Persistent folders for credentials, notes, and tasks.',
  },
  notes: {
    icon: StickyNote,
    tint: 'text-teal-400 light:text-teal-600 bg-teal-500/10 ring-1 ring-inset ring-teal-500/30',
    line: 'Quick notes with favorites, search, and folder organization.',
  },
  tasks: {
    icon: ListChecks,
    tint: 'text-emerald-400 light:text-emerald-600 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/30',
    line: 'To-dos with status tracking, calendar integration, and folders.',
  },
  calendar: {
    icon: CalendarDays,
    tint: 'text-cyan-400 light:text-cyan-600 bg-cyan-500/10 ring-1 ring-inset ring-cyan-500/30',
    line: 'Date-based view of tasks and due items.',
  },
  favorites: {
    icon: Star,
    tint: 'text-amber-400 light:text-amber-600 bg-amber-500/10 ring-1 ring-inset ring-amber-500/30',
    line: 'Starred credentials and items for quick access.',
  },
  peralog: {
    icon: Receipt,
    tint: 'text-green-400 light:text-green-600 bg-green-500/10 ring-1 ring-inset ring-green-500/30',
    line: 'Income and expenses with categories, budgets, and a live balance.',
  },
  wallet: {
    icon: Wallet,
    tint: 'text-indigo-400 light:text-indigo-600 bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/30',
    line: 'Current-month wallet balance on the Dashboard, built from your records.',
  },
  savings: {
    icon: PiggyBank,
    tint: 'text-fuchsia-400 light:text-fuchsia-600 bg-fuchsia-500/10 ring-1 ring-inset ring-fuchsia-500/30',
    line: 'Savings goals with progress tracking.',
  },
  'activity-log': {
    icon: Activity,
    tint: 'text-rose-400 light:text-rose-600 bg-rose-500/10 ring-1 ring-inset ring-rose-500/30',
    line: 'A unified log of what is happening inside your vault.',
  },
};

export interface ModuleGroup {
  key: string;
  label: string;
  icon: LucideIcon;
  tint: string;
  keys: string[];
}

/** The 11 modules grouped the way the product describes them. */
export const moduleGroups: ModuleGroup[] = [
  {
    key: 'security',
    label: 'Security',
    icon: ShieldCheck,
    tint: 'text-sky-400 light:text-sky-600 bg-sky-500/10 ring-1 ring-inset ring-sky-500/30',
    keys: ['credentials', 'password-generator', 'folders'],
  },
  {
    key: 'productivity',
    label: 'Productivity',
    icon: Zap,
    tint: 'text-violet-400 light:text-violet-600 bg-violet-500/10 ring-1 ring-inset ring-violet-500/30',
    keys: ['notes', 'tasks', 'calendar', 'favorites'],
  },
  {
    key: 'money',
    label: 'Money',
    icon: Coins,
    tint: 'text-emerald-400 light:text-emerald-600 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/30',
    keys: ['peralog', 'wallet', 'savings'],
  },
  {
    key: 'system',
    label: 'System',
    icon: Activity,
    tint: 'text-rose-400 light:text-rose-600 bg-rose-500/10 ring-1 ring-inset ring-rose-500/30',
    keys: ['activity-log'],
  },
];
