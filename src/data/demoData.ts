/** Fictional sample data for the interactive `/demo` sandbox only.
 * Every record here is hardcoded placeholder content (example domains,
 * obviously invented passwords containing "Demo"/"Sample"). This module must
 * never contain real credentials, and the demo page keeps all interaction
 * state in memory — nothing here is written to persistent storage or sent
 * anywhere.
 *
 * This data mirrors the actual app's structure so the demo feels like the
 * real Cova Vault application without persisting anything.
 */

/** --- Credentials --- */
export interface DemoCredential {
  id: string;
  name: string;
  username: string;
  password: string;
  website: string;
  tags: string[];
  favorite: boolean;
  folderId?: string;
}

/** --- Notes --- */
export interface DemoNote {
  id: string;
  title: string;
  body: string;
  updated: string;
  folderId?: string;
}

/** --- Tasks --- */
export type DemoTaskStatus = 'todo' | 'in_progress' | 'done';
export interface DemoTask {
  id: string;
  title: string;
  status: DemoTaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  folderId?: string;
}

/** --- Wallets --- */
export type DemoWalletType = 'cash' | 'digital' | 'bank' | 'other';
export interface DemoWallet {
  id: string;
  name: string;
  type: DemoWalletType;
  startingBalance: number;
}
export interface DemoWalletRecord {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  date: string;
}
export interface DemoBudget {
  category: string;
  limit: number;
}

/** --- Savings --- */
export interface DemoSavingGoal {
  id: string;
  name: string;
  current: number;
  target: number;
}

/** --- Folders --- */
export type DemoFolderTab = 'credentials' | 'notes' | 'tasks';
export interface DemoFolder {
  id: string;
  name: string;
}

/** --- Activity --- */
export type DemoActivityType =
  | 'credentials' | 'notes' | 'tasks' | 'wallet' | 'savings';
export interface DemoActivity {
  id: string;
  text: string;
  timestamp: string;
  type: DemoActivityType;
}

/** --- Demo State (in-memory only) --- */
export interface DemoState {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  wallets: DemoWallet[];
  walletRecords: DemoWalletRecord[];
  goals: DemoSavingGoal[];
  folders: DemoFolder[];
  activity: DemoActivity[];
  revealedPasswords: string[];
  passwordVisibility: Record<string, boolean>;
}

export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString('en-US')}`;
}

export const DEMO_WALLET_SUMMARY = {
  balance: 2050,
  income: 2500,
  expenses: 1450,
} as const;

export function createInitialDemoState(): DemoState {
  return {
    credentials: [
      {
        id: 'demo-cred-1',
        name: 'Example Mail',
        username: 'demo.user@example.com',
        password: 'DemoPass!2024#Sample',
        website: 'https://mail.example.com',
        tags: ['email'],
        favorite: true,
      },
      {
        id: 'demo-cred-2',
        name: 'Example Shop',
        username: 'demo_shopper',
        password: 'Shop$Demo42Sample',
        website: 'https://shop.example.com',
        tags: ['shop'],
        favorite: false,
      },
    ],
    notes: [
      {
        id: 'demo-note-1',
        title: 'Weekend trip ideas',
        body: 'Pack light, charge the power bank, and download offline maps before leaving.',
        updated: 'Oct 7, 2026',
      },
      {
        id: 'demo-note-2',
        title: 'Gift list (sample)',
        body: 'Placeholder ideas for fictional people: a book, a plant, and concert tickets.',
        updated: 'Oct 5, 2026',
      },
    ],
    tasks: [
      { id: 'demo-task-1', title: 'Review saved logins', status: 'done', priority: 'high' },
      { id: 'demo-task-2', title: 'Plan the monthly budget', status: 'done', priority: 'medium' },
      { id: 'demo-task-3', title: 'Sort notes into folders', status: 'in_progress', priority: 'low' },
    ],
    wallets: [
      { id: 'demo-wallet-1', name: 'Daily Cash', type: 'cash', startingBalance: 1500 },
      { id: 'demo-wallet-2', name: 'Sample E-Wallet', type: 'digital', startingBalance: 2050 },
    ],
    walletRecords: [
      { id: 'demo-rec-1', description: 'Sample salary', category: 'Salary', amount: 8000, type: 'income', date: 'Oct 1, 2026' },
      { id: 'demo-rec-2', description: 'Sample groceries', category: 'Food', amount: 250, type: 'expense', date: 'Oct 3, 2026' },
      { id: 'demo-rec-3', description: 'Sample jeepney fares', category: 'Transport', amount: 85, type: 'expense', date: 'Oct 5, 2026' },
    ],
    goals: [
      { id: 'demo-goal-1', name: 'Emergency fund', current: 3100, target: 5000 },
      { id: 'demo-goal-2', name: 'New phone fund', current: 1200, target: 8000 },
    ],
    folders: [
      { id: 'folder-1', name: 'Work' },
      { id: 'folder-2', name: 'Personal' },
    ],
    activity: [
      { id: 'demo-act-1', text: 'Marked "Plan the monthly budget" complete', timestamp: 'Oct 8, 2026', type: 'tasks' },
      { id: 'demo-act-2', text: 'Added note "Weekend trip ideas"', timestamp: 'Oct 7, 2026', type: 'notes' },
    ],
    revealedPasswords: [],
    passwordVisibility: {},
  };
}