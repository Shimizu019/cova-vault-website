import type { DocumentationTopic } from '../types';

export const documentationTopics: DocumentationTopic[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    summary: 'Understand what Cova Vault is and how the modules fit together.',
    body: [
      'Cova Vault bundles password storage, notes, tasks, finance tracking, savings goals, favorites, and a unified activity log in one responsive interface.',
      'Open the module you need — Credentials, Notes, Tasks, PeraLog, My Wallet, Savings, Folders, Favorites, or Calendar — and organize it your way.',
    ],
    relatedFeatures: ['credentials', 'notes', 'tasks'],
  },
  {
    id: 'installation',
    title: 'Installation',
    summary: 'Get the Android APK from the official GitHub Releases page.',
    body: [
      'Android is available as an APK from Shimizu019/cova-vault GitHub Releases.',
      'The app requires Android 7.0 (API 24) or newer.',
      'The app declares only the INTERNET permission in the Android project.',
      'Download only from the official release page and verify the file name and version before installing.',
      'Windows is coming soon; there is currently no Windows executable.',
    ],
    relatedFeatures: [],
  },
  {
    id: 'first-setup',
    title: 'First Setup',
    summary: 'What to expect the first time you open Cova Vault.',
    body: [
      'Open the installed app and create the information you want to organize.',
      'Set your own master password in Settings — the app starts from a default first-run value that should not be kept.',
      'Start with Credentials and Notes; add tasks, finance, and savings as needed.',
      'Exact first-run behavior should match the current Android app; refer to the app itself for the latest flow.',
    ],
    relatedFeatures: ['credentials', 'notes', 'tasks'],
  },
  {
    id: 'credentials',
    title: 'Credentials',
    summary: 'Store usernames, passwords, websites, and tags.',
    body: [
      'Each credential can include username, password, website, tags, and favorite status.',
      'Use the password strength meter and password generator when creating or updating credentials.',
    ],
    relatedFeatures: ['credentials'],
  },
  {
    id: 'notes',
    title: 'Notes',
    summary: 'Keep quick notes organized with favorites, search, and folders.',
    body: [
      'Create notes for ideas, references, and important information.',
      'Use favorites, search, and folders to stay organized.',
    ],
    relatedFeatures: ['notes', 'folders', 'favorites'],
  },
  {
    id: 'tasks',
    title: 'Tasks',
    summary: 'Track to-dos with status, calendar integration, and folders.',
    body: [
      'Create tasks, track status, and organize them into folders.',
      'Use Calendar and Schedule to review date-based tasks and due items.',
    ],
    relatedFeatures: ['tasks', 'calendar', 'folders'],
  },
  {
    id: 'peralog',
    title: 'PeraLog',
    summary: 'Track income, expenses, budgets, and balance.',
    body: [
      'PeraLog records income and expense entries with categories.',
      'Monthly summary, category breakdown, budgets, and the balance card help track financial activity.',
    ],
    relatedFeatures: ['peralog'],
  },
  {
    id: 'wallet',
    title: 'My Wallet',
    summary: 'See your current-month wallet balance, built from PeraLog activity.',
    body: [
      'My Wallet shows your total wallet balance for the current month on the Dashboard.',
      'The balance is built from your starting balance plus your income and expense records.',
      'Record income and expenses with categories in PeraLog, and set a budget per category to track spending against a limit.',
      'Amounts are kept in Philippine pesos, and expense entries can record the cash given and the change due.',
    ],
    relatedFeatures: ['wallet'],
  },
  {
    id: 'savings',
    title: 'Savings',
    summary: 'Set savings goals and monitor progress.',
    body: ['Create savings goals and track progress over time.', 'Savings data persists across navigation.'],
    relatedFeatures: ['savings'],
  },
  {
    id: 'folders',
    title: 'Folders',
    summary: 'Organize credentials, notes, and tasks.',
    body: ['Folders can be module-specific or mixed.', 'Deleting a folder keeps its items under No Folder.'],
    relatedFeatures: ['folders'],
  },
  {
    id: 'favorites',
    title: 'Favorites',
    summary: 'Star important items for quick access.',
    body: ['Use the favorite toggle to surface frequently used credentials and items.'],
    relatedFeatures: ['favorites'],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    summary: 'Review tasks and due items by date.',
    body: ['Calendar and Schedule provide a date-based view of tasks.'],
    relatedFeatures: ['calendar', 'tasks'],
  },
  {
    id: 'activity-log',
    title: 'Activity Log',
    summary: 'See everything happening in your vault in one place.',
    body: [
      'The app keeps a unified activity log of what is happening inside your vault.',
      'Review your vault activity without needing any website account or sync service.',
    ],
    relatedFeatures: ['activity-log'],
  },
  {
    id: 'backup',
    title: 'Backup & Export',
    summary: 'Export an encrypted backup file and import it again later.',
    body: [
      'Settings → Backup & Export manages your encrypted backups and exports.',
      'An exported backup is a JSON file of encrypted data, written as cova-backup-YYYY-MM-DD.json, so it is only readable with the same key.',
      'Importing an encrypted backup file restores the data it contains.',
      'There is no automatic or cloud backup — the file is only as safe as where you save it, so keep your own safe copies.',
    ],
    relatedFeatures: [],
  },
  {
    id: 'security',
    title: 'Security',
    summary: 'Read the factual Security page before making trust decisions.',
    body: [
      'Vault data is persisted through an encrypted storage layer; the Android project derives keys with PBKDF2-SHA256 (100,000 iterations) and encrypts with AES-GCM (256-bit).',
      'The app locks behind a master password. On first run it accepts the project default until you set your own in Settings.',
      'See the Security page for limitations and user responsibility.',
    ],
    relatedFeatures: [],
  },
  {
    id: 'faq',
    title: 'FAQ',
    summary: 'Common questions about availability and downloads.',
    body: [
      'Android is available through GitHub Releases; Windows is coming soon.',
      'No website account is required to view information or download Android releases.',
    ],
    relatedFeatures: [],
  },
];

