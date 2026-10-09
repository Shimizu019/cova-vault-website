/**
 * Fictional sample data for the interactive `/demo` sandbox only.
 *
 * Every record here is hardcoded placeholder content (example domains,
 * obviously invented passwords containing "Demo"/"Sample"). This module must
 * never contain real credentials, and the demo page keeps all interaction
 * state in memory — nothing here is written to persistent storage or sent
 * anywhere.
 */

export interface DemoCredential {
  id: string;
  name: string;
  username: string;
  password: string;
  website: string;
  favorite: boolean;
}

export interface DemoNote {
  id: string;
  title: string;
  body: string;
  updated: string;
}

export interface DemoTask {
  id: string;
  title: string;
  done: boolean;
}

export interface DemoWalletRecord {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export interface DemoSavingGoal {
  id: string;
  name: string;
  current: number;
  target: number;
}

export interface DemoActivity {
  id: string;
  text: string;
  time: string;
}

export interface DemoState {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  walletRecords: DemoWalletRecord[];
  goals: DemoSavingGoal[];
  activity: DemoActivity[];
  revealedPasswords: string[];
}

/** Illustrative wallet summary mirroring the site's PeraLog examples. */
export const DEMO_WALLET_SUMMARY = {
  balance: 2050,
  income: 2500,
  expenses: 1450,
} as const;

export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString('en-US')}`;
}

/** Fresh deep copies every call so Reset Demo always restores pristine state. */
export function createInitialDemoState(): DemoState {
  return {
    credentials: [
      {
        id: 'demo-cred-1',
        name: 'Example Mail',
        username: 'demo.user@example.com',
        password: 'DemoPass!2024#Sample',
        website: 'https://mail.example.com',
        favorite: true,
      },
      {
        id: 'demo-cred-2',
        name: 'Example Shop',
        username: 'demo_shopper',
        password: 'Shop$Demo42Sample',
        website: 'https://shop.example.com',
        favorite: false,
      },
      {
        id: 'demo-cred-3',
        name: 'Example Forum',
        username: 'demo_forum_fan',
        password: 'Forum*Demo77Sample',
        website: 'https://forum.example.com',
        favorite: false,
      },
    ],
    notes: [
      {
        id: 'demo-note-1',
        title: 'Weekend trip ideas',
        body: 'Pack light, charge the power bank, and download offline maps before leaving. Fictional planning note.',
        updated: 'Oct 7, 2026',
      },
      {
        id: 'demo-note-2',
        title: 'Gift list (sample)',
        body: 'Placeholder ideas for fictional people: a book, a plant, and concert tickets.',
        updated: 'Oct 5, 2026',
      },
      {
        id: 'demo-note-3',
        title: 'Meeting scratchpad',
        body: 'Sample talking points: budget review, holiday schedule, and the storage cleanup task.',
        updated: 'Oct 2, 2026',
      },
    ],
    tasks: [
      { id: 'demo-task-1', title: 'Review saved logins', done: true },
      { id: 'demo-task-2', title: 'Plan the monthly budget', done: true },
      { id: 'demo-task-3', title: 'Sort notes into folders', done: false },
      { id: 'demo-task-4', title: 'Export an encrypted backup', done: false },
    ],
    walletRecords: [
      { id: 'demo-rec-1', description: 'Sample salary', category: 'Salary', amount: 8000, type: 'income', date: 'Oct 1, 2026' },
      { id: 'demo-rec-2', description: 'Sample groceries', category: 'Food', amount: 250, type: 'expense', date: 'Oct 3, 2026' },
      { id: 'demo-rec-3', description: 'Sample jeepney fares', category: 'Transport', amount: 85, type: 'expense', date: 'Oct 5, 2026' },
      { id: 'demo-rec-4', description: 'Sample freelance payout', category: 'Freelance', amount: 1500, type: 'income', date: 'Oct 7, 2026' },
    ],
    goals: [
      { id: 'demo-goal-1', name: 'Emergency fund', current: 3100, target: 5000 },
      { id: 'demo-goal-2', name: 'New phone fund', current: 1200, target: 8000 },
    ],
    activity: [
      { id: 'demo-act-1', text: "Marked 'Plan the monthly budget' complete", time: 'Oct 8, 2026' },
      { id: 'demo-act-2', text: 'Added note "Weekend trip ideas"', time: 'Oct 7, 2026' },
      { id: 'demo-act-3', text: 'Recorded ₱250 grocery expense', time: 'Oct 5, 2026' },
    ],
    revealedPasswords: [],
  };
}
