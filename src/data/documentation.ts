import type { DocumentationTopic } from '../types';

export const documentationTopics: DocumentationTopic[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    summary: 'Understand what Cova Vault is and how the modules fit together.',
    body: [
      'Cova Vault bundles password storage, notes, tasks, finance tracking, savings goals, favorites, and a unified activity log in one responsive interface.',
      'Start with Dashboard for an overview, then open the module you need: Credentials, Notes, Tasks, PeraLog, Savings, Folders, Favorites, or Calendar.',
    ],
    relatedFeatures: ['credentials', 'notes', 'tasks'],
  },
  {
    id: 'installation',
    title: 'Installation',
    summary: 'Get the Android APK from the official GitHub Releases page.',
    body: [
      'Android is available as an APK from Shimizu019/cova-vault GitHub Releases.',
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
    summary: 'Organize cash and digital money.',
    body: [
      'My Wallet organizes physical cash alongside digital wallets.',
      'Track balances in one place and review the total across cash and digital money.',
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
    id: 'backup',
    title: 'Backup & Export',
    summary: 'Only treated as verified when documented by the Android project.',
    body: [
      'The Android project documents client-side persistence behavior in its own repository.',
      'Do not assume cloud sync, automatic backup, or account recovery exists unless a verified release documents it.',
    ],
    relatedFeatures: [],
  },
  {
    id: 'security',
    title: 'Security',
    summary: 'Read the factual Security page before making trust decisions.',
    body: [
      'Only the security behavior documented by the Android project should be treated as verified.',
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

