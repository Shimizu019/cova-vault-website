import * as React from 'react';
import { Check, Eye, EyeOff, KeyRound, StickyNote, ListChecks, Wallet, Activity, PiggyBank, Star, LayoutDashboard, Folder, Calendar, Clock, Key, ExternalLink, Shield, Settings, LogOut, Lock, Info, Book, Mail, Plus, Trash2, Pencil, Search, CloudDownload, RefreshCw, FolderOpen, ArrowLeftRight, Landmark, Smartphone, Bell, Sliders, Globe, HardDrive, Thermometer, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import {
  formatPeso,
  DEMO_WALLET_SUMMARY,
  type DemoCredential,
  type DemoNote,
  type DemoTask,
  type DemoWallet,
  type DemoWalletRecord,
  type DemoSavingGoal,
  type DemoFolder,
  type DemoActivity,
  type DemoActivityType,
} from '../../data/demoData';

// --- Demo-local utilities ---

function addToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  // Simple console-based feedback for the demo
  if (type === 'error') console.warn('[Demo]', message);
  else console.log('[Demo]', message);
}

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function maskPassword(password: string): string {
  return '•'.repeat(Math.min(password.length, 16));
}

// Simple Input component for demo forms
function Input({ value, onChange, placeholder, type, min, step, maxLength, autoFocus, className, id }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <input
      id={id}
      type={type || 'text'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      maxLength={maxLength}
      autoFocus={autoFocus}
      className={`input w-full ${className || ''}`}
    />
  );
}

export function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">{title}</h3>
        {hint ? <p className="text-xs text-cova-faint">{hint}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export const TINT_BLUE = 'text-sky-400 light:text-sky-600 bg-sky-500/10 ring-1 ring-inset ring-sky-500/30';
export const TINT_TEAL = 'text-teal-400 light:text-teal-600 bg-teal-500/10 ring-1 ring-inset ring-teal-500/30';
export const TINT_GREEN = 'text-emerald-400 light:text-emerald-600 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/30';
export const TINT_INDIGO = 'text-indigo-400 light:text-indigo-600 bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/30';
export const TINT_FUCHSIA = 'text-fuchsia-400 light:text-fuchsia-600 bg-fuchsia-500/10 ring-1 ring-inset ring-fuchsia-500/30';
export const TINT_ROSE = 'text-rose-400 light:text-rose-600 bg-rose-500/10 ring-1 ring-inset ring-rose-500/30';
export const TINT_AMBER = 'text-amber-400 light:text-amber-600 bg-amber-500/10 ring-1 ring-inset ring-amber-500/30';

function StatCard({ icon: Icon, label, value, tint }: {
  icon: typeof Key;
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
      <span className={`grid h-9 w-9 place-items-center rounded-btn ${tint}`} aria-hidden="true">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <p className="mt-3 text-xl font-bold text-cova-text">{value}</p>
      <p className="mt-1 text-xs font-medium text-cova-muted">{label}</p>
    </div>
  );
}

export function DemoDashboardPage({ credentials, notes, tasks, openTasks, activity }: {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  openTasks: number;
  activity: DemoActivity[];
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Key} label="Credentials" value={String(credentials.length)} tint={TINT_BLUE} />
        <StatCard icon={StickyNote} label="Notes" value={String(notes.length)} tint={TINT_TEAL} />
        <StatCard icon={ListChecks} label="Open tasks" value={String(openTasks)} tint={TINT_GREEN} />
        <StatCard icon={Wallet} label="Wallet balance" value={formatPeso(DEMO_WALLET_SUMMARY.balance)} tint={TINT_INDIGO} />
      </div>
      <Panel title="Recent activity" hint="Sample feed">
        {activity.length === 0 ? (
          <p className="text-sm text-cova-faint">No activity yet — try completing a task.</p>
        ) : (
          <ul className="space-y-2.5">
            {activity.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 rounded-btn bg-cova-elevated px-4 py-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-btn ${TINT_ROSE}`} aria-hidden="true">
                  <Activity className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-cova-text">{entry.text}</span>
                  <span className="mt-0.5 block text-xs text-cova-faint">{entry.timestamp}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
export function DemoCredentialsPage({ credentials, revealed, onTogglePassword, onToggleFavorite, onAddCredential }: {
  credentials: DemoCredential[];
  revealed: string[];
  onTogglePassword: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAddCredential: (cred: DemoCredential) => void;
}) {
  const [search, setSearch] = React.useState('');
  const [showAdd, setShowAdd] = React.useState(false);
  const [formName, setFormName] = React.useState('');
  const [formUsername, setFormUsername] = React.useState('');
  const [formPassword, setFormPassword] = React.useState('');
  const [formWebsite, setFormWebsite] = React.useState('');

  const filtered = credentials.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase()) ||
    c.website.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!formName.trim() || !formUsername.trim() || !formPassword.trim()) {
      addToast('Name, username, and password are required', 'error');
      return;
    }
    const newCred: DemoCredential = {
      id: `cred-${Date.now()}`,
      name: formName.trim(),
      username: formUsername.trim(),
      password: formPassword,
      website: formWebsite.trim(),
      tags: [],
      favorite: false,
    };
    onAddCredential(newCred);
    addToast('Credential added', 'success');
    setShowAdd(false);
    setFormName('');
    setFormUsername('');
    setFormPassword('');
    setFormWebsite('');
  };

  const handleCancel = () => {
    setShowAdd(false);
    setFormName('');
    setFormUsername('');
    setFormPassword('');
    setFormWebsite('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <Key className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Credentials
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">
              {filtered.length}
            </span>
          </h1>
          <p className="text-sm text-cova-muted mt-1">Manage your stored passwords securely</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cova-faint pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search credentials..."
              className="input pl-9 pr-3 w-full"
              aria-label="Search credentials"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
          >
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="mb-6 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">Add Credential</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Name <span className="text-cova-danger">*</span></label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Example Mail" autoFocus />
            </div>
            <div>
              <label className="label">Username <span className="text-cova-danger">*</span></label>
              <Input value={formUsername} onChange={(e) => setFormUsername(e.target.value)} placeholder="demo.user@example.com" />
            </div>
            <div>
              <label className="label">Password <span className="text-cova-danger">*</span></label>
              <Input value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder="DemoPass!2024" />
            </div>
            <div>
              <label className="label">Website</label>
              <Input value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} placeholder="https://example.com" />
            </div>
            <p className="text-xs text-cova-faint">This is a fictional demo — never enter real passwords here.</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
{filtered.length > 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-2/5">Name</th>
                  <th className="w-1/5">Username</th>
                  <th className="w-1/5">Password</th>
                  <th className="w-1/6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cred) => {
                  const isVisible = revealed.includes(cred.id);
                  return (
                    <tr key={cred.id} className="border-b border-cova-border/50 hover:bg-cova-elevated/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-btn bg-cova-primary/15 flex items-center justify-center flex-shrink-0">
                            <Key className="w-4 h-4 text-cova-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-cova-text truncate flex items-center gap-1">
                              <Star className={cred.favorite ? "w-3 h-3 text-cova-warning fill-cova-warning" : "w-3 h-3 text-cova-faint"} flex-shrink-0 />{cred.name}
                            </div>
                            <div className="text-xs text-cova-faint truncate">{cred.website || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-cova-muted truncate block max-w-[200px]">{cred.username}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-cova-text">
                          {isVisible ? cred.password : '•'.repeat(12)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => onTogglePassword(cred.id)}
                            className="p-1.5 rounded text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors"
                            aria-label={isVisible ? "Hide password" : "Show password"}
                          >
                            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(cred.id)}
                            className="p-1.5 rounded text-cova-warning hover:bg-cova-elevated transition-colors"
                            aria-label="Toggle favorite"
                          >
                            <Star className={cred.favorite ? "w-4 h-4 fill-cova-warning text-cova-warning" : "w-4 h-4 text-cova-warning"} />
                          </button>
                          <div className="relative">
                            <button
                              type="button"
                              className="p-1.5 rounded text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors"
                              aria-label="More actions"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <Key className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No credentials found</h3>
            <p className="mt-2 text-sm text-cova-muted">Start by adding a sample credential.</p>
          </div>
        </div>
      )}
    </div>
  );
}
export function DemoWalletPage({ records, onAddWallet, onReset }: {
  records: DemoWalletRecord[];
  onAddWallet: (wallet: DemoWallet) => void;
  onReset: () => void;
}) {
  const [showAdd, setShowAdd] = React.useState(false);
  const [walletName, setWalletName] = React.useState('');
  const [walletType, setWalletType] = React.useState<'cash' | 'digital' | 'bank' | 'other'>('cash');
  const [walletAmount, setWalletAmount] = React.useState('0');

  const handleAdd = () => {
    if (!walletName.trim()) {
      addToast('Wallet name is required', 'error');
      return;
    }
    const newWallet: DemoWallet = {
      id: `wallet-${Date.now()}`,
      name: walletName.trim(),
      type: walletType,
      startingBalance: parseFloat(walletAmount) || 0,
    };
    onAddWallet(newWallet);
    addToast('Wallet added successfully', 'success');
    setShowAdd(false);
    setWalletName('');
    setWalletAmount('0');
  };

  const handleCancel = () => {
    setShowAdd(false);
    setWalletName('');
    setWalletType('cash');
    setWalletAmount('0');
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
        <Wallet className="w-5 h-5 text-cova-primary" aria-hidden="true" /> My Wallet
      </h1>
      <p className="text-sm text-cova-muted mt-1">Manage your wallet balances and transactions</p>

      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
      >
        <Plus className="w-4 h-4" /> Add Wallet
      </button>

      {showAdd && (
        <div className="mt-4 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">Add Wallet</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label">Wallet Name <span className="text-cova-danger">*</span></label>
              <Input
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="e.g. GCash, Maya, Cash"
                maxLength={40}
              />
            </div>
            <div>
              <label className="label">Type</label>
              <select
                value={walletType}
                onChange={(e) => setWalletType(e.target.value as typeof walletType)}
                className="input w-full"
              >
                <option value="cash">Cash</option>
                <option value="digital">Digital Wallet</option>
                <option value="bank">Bank</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Starting Amount (₱)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {records.map((record) => (
          <div key={record.id} className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-cova-text">{record.description}</p>
                <p className="text-xs text-cova-faint">{record.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-cova-success">{formatPeso(record.amount)}</p>
                <p className="text-xs text-cova-faint">{record.type === 'income' ? 'Income' : 'Expense'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {records.length === 0 ? (
        <div className="mt-6 rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <Wallet className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No wallets yet</h3>
            <p className="mt-2 text-sm text-cova-muted">Add a wallet to get started.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function DemoSavingsPage({ goals, onCreateGoal, onDeleteGoal }: {
  goals: DemoSavingGoal[];
  onCreateGoal: (goal: DemoSavingGoal) => void;
  onDeleteGoal: (id: string) => void;
}) {
  const [showNew, setShowNew] = React.useState(false);
  const [draftName, setDraftName] = React.useState('');
  const [draftTarget, setDraftTarget] = React.useState('');

  const handleSave = () => {
    const target = parseFloat(draftTarget);
    if (!draftName.trim() || isNaN(target) || target <= 0) {
      addToast('Fill in name and target amount', 'error');
      return;
    }
    const newGoal: DemoSavingGoal = {
      id: `goal-${Date.now()}`,
      name: draftName.trim(),
      current: 0,
      target,
    };
    onCreateGoal(newGoal);
    addToast('Savings goal created', 'success');
    setShowNew(false);
    setDraftName('');
    setDraftTarget('');
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftName('');
    setDraftTarget('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Savings
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">{goals.length}</span>
          </h1>
          <p className="text-sm text-cova-muted mt-1">Track your savings goals and progress</p>
        </div>
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
        >
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      {showNew && (
        <div className="mb-6 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">New Savings Goal</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Goal Name <span className="text-cova-danger">*</span></label>
              <Input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="e.g. Emergency fund" autoFocus />
            </div>
            <div>
              <label className="label">Target Amount (₱) <span className="text-cova-danger">*</span></label>
              <Input type="number" min="1" value={draftTarget} onChange={(e) => setDraftTarget(e.target.value)} placeholder="50000" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {goals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
            <p className="text-xs text-cova-faint uppercase tracking-wider font-semibold">Total Saved</p>
            <p className="text-2xl font-bold text-cova-text mt-1">{formatPeso(goals.reduce((s, g) => s + g.current, 0))}</p>
          </div>
          <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
            <p className="text-xs text-cova-faint uppercase tracking-wider font-semibold">Total Target</p>
            <p className="text-2xl font-bold text-cova-text mt-1">{formatPeso(goals.reduce((s, g) => s + g.target, 0))}</p>
          </div>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <PiggyBank className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No savings goals yet</h3>
            <p className="mt-2 text-sm text-cova-muted">Set a goal and track your progress over time.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((g) => {
            const pct = Math.min(Math.round(g.current / g.target * 100), 100);
            const color = pct >= 100 ? '#22C55E' : pct >= 50 ? '#F97316' : '#7C3AED';
            return (
              <div key={g.id} className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-btn bg-cova-primary/15 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="w-5 h-5 text-cova-primary" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteGoal(g.id)}
                    className="p-1.5 rounded text-cova-faint hover:bg-cova-danger/10 hover:text-cova-danger transition-colors"
                    aria-label="Delete goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-cova-text">{g.name}</p>
                  <p className="text-xs text-cova-faint mt-0.5">{formatPeso(g.current)} of {formatPeso(g.target)}</p>
                </div>
                <div>
                  <div className="w-full h-2 bg-cova-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: pct + '%', backgroundColor: color }} />
                  </div>
                  <p className="text-xs text-cova-faint mt-1 text-right" style={{ color }}>{pct}%</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DemoNotesPage({ notes, onCreateNote, onDeleteNote }: {
  notes: DemoNote[];
  onCreateNote: (note: DemoNote) => void;
  onDeleteNote: (id: string) => void;
}) {
  const [search, setSearch] = React.useState('');
  const [showNew, setShowNew] = React.useState(false);
  const [draftTitle, setDraftTitle] = React.useState('');
  const [draftBody, setDraftBody] = React.useState('');

  const filtered = notes.filter(n =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!draftTitle.trim()) {
      addToast('Title is required', 'error');
      return;
    }
    const newNote: DemoNote = {
      id: `note-${Date.now()}`,
      title: draftTitle.trim(),
      body: draftBody,
      updated: new Date().toISOString().split('T')[0],
    };
    onCreateNote(newNote);
    addToast('Note created', 'success');
    setShowNew(false);
    setDraftTitle('');
    setDraftBody('');
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftTitle('');
    setDraftBody('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Notes
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">{filtered.length}</span>
          </h1>
          <p className="text-sm text-cova-muted mt-1">Keep your important notes secure</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cova-faint pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="input pl-9 pr-3 w-full"
              aria-label="Search notes"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
          >
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
      </div>

      {showNew && (
        <div className="mb-6 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">New Note</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Title <span className="text-cova-danger">*</span></label>
              <Input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="e.g. Weekend trip ideas" autoFocus />
            </div>
            <div>
              <label className="label">Content</label>
              <textarea value={draftBody} onChange={(e) => setDraftBody(e.target.value)} placeholder="Write your note here..." className="input min-h-[120px] resize-y font-sans" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <StickyNote className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No notes found</h3>
            <p className="mt-2 text-sm text-cova-muted">Create a note to get started.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((n) => (
            <div key={n.id} className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-btn bg-cova-primary/15 flex items-center justify-center flex-shrink-0">
                  <StickyNote className="w-5 h-5 text-cova-primary" />
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteNote(n.id)}
                  className="p-1.5 rounded text-cova-faint hover:bg-cova-danger/10 hover:text-cova-danger transition-colors"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="font-semibold text-cova-text">{n.title}</p>
                <p className="text-xs text-cova-faint mt-1 line-clamp-4 whitespace-pre-wrap break-words">
                  {n.body || <span className="italic">Empty note</span>}
                </p>
              </div>
              <div className="mt-auto pt-2 border-t border-cova-border/50">
                <span className="text-xs text-cova-faint">Last updated {n.updated}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function DemoTasksPage({ tasks, onCreateTask, onToggleTask, onDeleteTask }: {
  tasks: DemoTask[];
  onCreateTask: (task: DemoTask) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}) {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const [showNew, setShowNew] = React.useState(false);
  const [draftTitle, setDraftTitle] = React.useState('');
  const [draftPriority, setDraftPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

  const filtered = tasks.filter(t => {
    const matchQ = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchS = statusFilter === 'all' || t.status === statusFilter;
    return matchQ && matchS;
  });

  const handleSave = () => {
    if (!draftTitle.trim()) {
      addToast('Title is required', 'error');
      return;
    }
    const newTask: DemoTask = {
      id: `task-${Date.now()}`,
      title: draftTitle.trim(),
      status: 'todo',
      priority: draftPriority,
    };
    onCreateTask(newTask);
    addToast('Task created', 'success');
    setShowNew(false);
    setDraftTitle('');
    setDraftPriority('medium');
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftTitle('');
    setDraftPriority('medium');
  };

  const statusColors = { todo: 'bg-cova-faint/15 text-cova-muted', in_progress: 'bg-cova-warning/15 text-cova-warning', done: 'bg-cova-success/15 text-cova-success' };
  const statusLabels = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
  const priorityColors = { low: 'bg-cova-success/15 text-cova-success', medium: 'bg-cova-warning/15 text-cova-warning', high: 'bg-cova-danger/15 text-cova-danger' };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Tasks
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">{filtered.length}</span>
          </h1>
          <p className="text-sm text-cova-muted mt-1">Manage your tasks and to-dos</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cova-faint pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="input pl-9 pr-3 w-full"
              aria-label="Search tasks"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="input w-auto"
            aria-label="Filter by status"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
          >
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
      </div>

      {showNew && (
        <div className="mb-6 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">New Task</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Title <span className="text-cova-danger">*</span></label>
              <Input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="What needs to be done?" autoFocus />
            </div>
            <div>
              <label className="label">Priority</label>
              <div className="flex gap-2 mt-1">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDraftPriority(p)}
                    className={`flex-1 py-2 rounded-btn border text-sm font-medium capitalize transition-colors ${
                      draftPriority === p ? 'border-cova-primary bg-cova-primary/15 text-cova-primary' : 'border-cova-border bg-cova-bg text-cova-muted hover:border-cova-border'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <ListChecks className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No tasks found</h3>
            <p className="mt-2 text-sm text-cova-muted">Create a task to get started.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card flex items-center gap-4">
              <button
                type="button"
                onClick={() => onToggleTask(t.id)}
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor: t.status === 'done' ? '#22C55E' : 'rgb(var(--cova-border-rgb))',
                  backgroundColor: t.status === 'done' ? '#22C55E' : 'transparent',
                }}
                aria-label={t.status === 'done' ? 'Mark incomplete' : 'Mark complete'}
              >
                {t.status === 'done' && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-cova-text truncate ${t.status === 'done' ? 'line-through text-cova-faint' : ''}`}>{t.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[t.status]}`}>{statusLabels[t.status]}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[t.priority]}`}>{t.priority}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDeleteTask(t.id)}
                className="p-1.5 rounded text-cova-faint hover:bg-cova-danger/10 hover:text-cova-danger transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Demo Folders Page
export function DemoFoldersPage({ credentials, notes, tasks, folders, onCreateFolder, onDeleteFolder, onOpenFolder, openFolder, onBack }: {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  folders: DemoFolder[];
  onCreateFolder: (name: string) => void;
  onDeleteFolder: (id: string) => void;
  onOpenFolder: (folder: DemoFolder) => void;
  openFolder: DemoFolder | null;
  onBack: () => void;
}) {
  const [showNew, setShowNew] = React.useState(false);
  const [draftName, setDraftName] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'credentials' | 'notes' | 'tasks'>('credentials');

  const handleCreate = () => {
    if (!draftName.trim()) {
      addToast('Folder name is required', 'error');
      return;
    }
    onCreateFolder(draftName.trim());
    addToast('Folder created', 'success');
    setShowNew(false);
    setDraftName('');
  };

  if (openFolder) {
    return (
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-cova-muted hover:text-cova-text transition-colors mb-4"
        >
          <FolderOpen className="w-4 h-4" /> Back to Folders
        </button>
        <div className="flex items-center gap-3 mb-6">
          <FolderOpen className="w-8 h-8 text-cova-primary" />
          <div>
            <h1 className="text-xl font-bold text-cova-text">{openFolder.name}</h1>
            <p className="text-sm text-cova-muted">
              {credentials.filter(c => c.folderId === openFolder.id).length} credentials · {notes.filter(n => n.folderId === openFolder.id).length} notes · {tasks.filter(t => t.folderId === openFolder.id).length} tasks
            </p>
          </div>
        </div>
        <div className="flex gap-2 mb-4 border-b border-cova-border">
          {(['credentials', 'notes', 'tasks'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-cova-primary border-b-2 border-cova-primary' : 'text-cova-muted hover:text-cova-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {activeTab === 'credentials' && credentials.filter(c => c.folderId === openFolder.id).map(c => (
            <div key={c.id} className="px-5 py-3 flex items-center gap-3 rounded-card border border-cova-border bg-cova-surface">
              <div className="w-8 h-8 rounded-btn bg-cova-primary/10 flex items-center justify-center flex-shrink-0">
                <Key className="w-4 h-4 text-cova-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cova-text truncate">{c.name}</p>
                <p className="text-xs text-cova-faint truncate">{c.username}</p>
              </div>
            </div>
          ))}
          {activeTab === 'notes' && notes.filter(n => n.folderId === openFolder.id).map(n => (
            <div key={n.id} className="px-5 py-3 flex items-center gap-3 rounded-card border border-cova-border bg-cova-surface">
              <div className="w-8 h-8 rounded-btn bg-cova-primary/10 flex items-center justify-center flex-shrink-0">
                <StickyNote className="w-4 h-4 text-cova-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cova-text truncate">{n.title}</p>
                <p className="text-xs text-cova-faint truncate">{n.body || 'Empty note'}</p>
              </div>
            </div>
          ))}
          {activeTab === 'tasks' && tasks.filter(t => t.folderId === openFolder.id).map(t => (
            <div key={t.id} className="px-5 py-3 flex items-center gap-3 rounded-card border border-cova-border bg-cova-surface">
              <div className="w-8 h-8 rounded-btn bg-cova-primary/10 flex items-center justify-center flex-shrink-0">
                <ListChecks className="w-4 h-4 text-cova-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cova-text truncate">{t.title}</p>
                <p className="text-xs text-cova-faint">{t.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <Folder className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Folders
          </h1>
          <p className="text-sm text-cova-muted mt-1">Organize your credentials, notes, and tasks</p>
        </div>
        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
        >
          <Plus className="w-4 h-4" /> New Folder
        </button>
      </div>

      {showNew && (
        <div className="mb-6 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <h3 className="text-base font-semibold text-cova-text">New Folder</h3>
          <div className="mt-4">
            <label className="label">Folder Name <span className="text-cova-danger">*</span></label>
            <Input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="e.g. Work accounts" autoFocus />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setShowNew(false)}
              className="px-4 py-2 rounded-btn border border-cova-border bg-cova-surface text-cova-text text-sm font-semibold hover:border-cova-primary/50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="px-4 py-2 rounded-btn bg-cova-primary text-white text-sm font-semibold hover:bg-cova-primaryHover transition"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {folders.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <Folder className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No folders yet</h3>
            <p className="mt-2 text-sm text-cova-muted">Create folders to organize your items.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((f) => (
            <div key={f.id} className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card flex items-center gap-3 hover:bg-cova-elevated transition-colors group cursor-pointer" onClick={() => onOpenFolder(f)}>
              <FolderOpen className="w-8 h-8 text-cova-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cova-text truncate">{f.name}</p>
                <p className="text-xs text-cova-faint">
                  {credentials.filter(c => c.folderId === f.id).length + notes.filter(n => n.folderId === f.id).length + tasks.filter(t => t.folderId === f.id).length} items
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDeleteFolder(f.id); }}
                className="p-1.5 rounded text-cova-faint hover:bg-cova-danger/10 hover:text-cova-danger transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Delete folder"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Demo Favorites Page
export function DemoFavoritesPage({ credentials, onToggleFavorite }: {
  credentials: DemoCredential[];
  onToggleFavorite: (id: string) => void;
}) {
  const [search, setSearch] = React.useState('');
  const favs = credentials.filter(c => c.favorite);
  const q = search.toLowerCase();
  const shown = favs.filter(c => !q || c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q));

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <Star className="w-5 h-5 text-cova-warning fill-cova-warning" aria-hidden="true" /> Favorites
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">{favs.length}</span>
          </h1>
          <p className="text-sm text-cova-muted mt-1">Your starred credentials</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cova-faint pointer-events-none" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search favorites..." className="input pl-9 pr-3 w-full" aria-label="Search favorites" />
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <Star className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No favorites yet</h3>
            <p className="mt-2 text-sm text-cova-muted">Star any credential to add it to your favorites.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-card border border-cova-border bg-cova-surface shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-2/5">Name</th>
                  <th className="w-1/5">Username</th>
                  <th className="w-1/5">Password</th>
                  <th className="w-1/6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <tr key={c.id} className="border-b border-cova-border/50 hover:bg-cova-elevated/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-btn bg-cova-primary/15 flex items-center justify-center flex-shrink-0">
                          <Key className="w-4 h-4 text-cova-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-cova-text truncate flex items-center gap-1">
                            <Star className="w-3 h-3 text-cova-warning fill-cova-warning flex-shrink-0" />{c.name}
                          </div>
                          <div className="text-xs text-cova-faint truncate">{c.website || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-cova-muted truncate block max-w-[200px]">{c.username}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-cova-text">••••••••</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(c.id)}
                          className="p-1.5 rounded text-cova-warning hover:bg-cova-elevated transition-colors"
                          aria-label="Unfavorite"
                        >
                          <Star className="w-4 h-4 fill-cova-warning text-cova-warning" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
// Demo Calendar Page
export function DemoCalendarPage({ tasks }: { tasks: DemoTask[] }) {
  const today = new Date();
  const [year, setYear] = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth());
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const calDays = React.useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  }, [year, month]);

  const tasksByDate = React.useMemo(() => {
    const map: Record<string, DemoTask[]> = {};
    tasks.forEach(t => {
      if (t.dueDate) {
        const key = t.dueDate.split('T')[0];
        if (!map[key]) map[key] = [];
        map[key].push(t);
      }
    });
    return map;
  }, [tasks]);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const isToday = (d: Date) => d.toDateString() === today.toDateString();
  const priorityBars = { low: 'bg-cova-success', medium: 'bg-cova-warning', high: 'bg-cova-danger' };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Calendar
          </h1>
          <p className="text-sm text-cova-muted mt-1">Tasks by due date — {MONTHS[month]} {year}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} className="p-2 rounded-btn text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors" aria-label="Previous month">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-cova-text w-40 text-center">{MONTHS[month]} {year}</span>
          <button type="button" onClick={next} className="p-2 rounded-btn text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors" aria-label="Next month">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface shadow-card overflow-hidden">
        <div className="grid grid-cols-7">
          {DAYS.map(d => <div key={d} className="px-1 sm:px-2 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-cova-faint uppercase border-b border-cova-border">{d}</div>)}
          {calDays.map((day, i) => {
            if (!day) return <div key={'e' + i} className="min-h-[64px] sm:min-h-[96px] border-b border-r border-cova-border/50" />;
            const key = day.toISOString().split('T')[0];
            const dayTasks = tasksByDate[key] || [];
            return (
              <div key={key} className={`min-h-[64px] sm:min-h-[96px] border-b border-r border-cova-border/50 p-1 sm:p-1.5 ${isToday(day) ? 'bg-cova-primary/5' : ''}`}>
                <span className={`inline-flex w-5 h-5 sm:w-6 sm:h-6 items-center justify-center rounded-full text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1 ${isToday(day) ? 'bg-cova-primary text-white' : 'text-cova-muted'}`}>
                  {day.getDate()}
                </span>
                <div className="space-y-0.5 hidden sm:block">
                  {dayTasks.slice(0, 3).map(t => (
                    <div key={t.id} className={`text-[10px] px-1 py-0.5 rounded truncate font-medium text-white ${priorityBars[t.priority]}`} title={t.title}>{t.title}</div>
                  ))}
                  {dayTasks.length > 3 && <div className="text-[10px] text-cova-faint px-1">+{dayTasks.length - 3} more</div>}
                </div>
                <div className="sm:hidden">
                  {dayTasks.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-cova-primary mx-auto" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// Demo Schedule Page
export function DemoSchedulePage({ tasks }: { tasks: DemoTask[] }) {
  const today = new Date();
  const [weekStart, setWeekStart] = React.useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay());
    return d;
  });

  const days = React.useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const prevWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); };
  const nextWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); };
  const isToday = (d: Date) => d.toDateString() === today.toDateString();
  const isPast = (d: Date) => d < new Date(today.toDateString());
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
            <Clock className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Schedule
          </h1>
          <p className="text-sm text-cova-muted mt-1">Weekly overview of your tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prevWeek} className="p-2 rounded-btn text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors" aria-label="Previous week">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-cova-text whitespace-nowrap">
            {days[0].toLocaleDateString()} – {days[6].toLocaleDateString()}
          </span>
          <button type="button" onClick={nextWeek} className="p-2 rounded-btn text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors" aria-label="Next week">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface shadow-card overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '64px repeat(7, minmax(120px, 1fr))' }}>
          <div className="border-b border-r border-cova-border" />
          {days.map(d => (
            <div key={d.toISOString()} className={`px-2 py-3 text-center border-b border-r border-cova-border ${isToday(d) ? 'bg-cova-primary/5' : ''}`}>
              <div className="text-xs font-semibold text-cova-faint uppercase">{DAY_NAMES[d.getDay()]}</div>
              <div className={`text-lg font-bold mt-0.5 ${isToday(d) ? 'text-cova-primary' : isPast(d) ? 'text-cova-faint' : 'text-cova-text'}`}>{d.getDate()}</div>
            </div>
          ))}
          {Array.from({ length: 15 }, (_, i) => i + 6).map(h => (
            <React.Fragment key={h}>
              <div className="px-2 py-2 text-xs text-cova-faint text-right border-r border-cova-border">
                {h > 12 ? h - 12 + 'pm' : h === 12 ? '12pm' : h + 'am'}
              </div>
              {days.map(d => {
                const key = d.toISOString().split('T')[0];
                const dayTasks = tasks.filter(t => t.dueDate && t.dueDate.split('T')[0] === key).slice(0, 2);
                return (
                  <div key={h + '-' + key} className="min-h-[52px] border-b border-r border-cova-border/50 p-1">
                    {dayTasks.map(t => (
                      <div key={t.id} className={`text-[10px] px-1 py-0.5 rounded mb-0.5 truncate ${t.status === 'done' ? 'bg-cova-success/20 text-cova-success line-through' : 'bg-cova-primary/20 text-cova-primary'}`}>
                        {t.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
// Demo Password Generator Page
export function DemoGeneratorPage() {
  const [length, setLength] = React.useState(16);
  const [options, setOptions] = React.useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generate = React.useCallback(() => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  }, [length, options]);

  React.useEffect(() => { generate(); }, [generate]);

  const strength = React.useMemo(() => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (options.uppercase && options.lowercase) score++;
    if (options.numbers || options.symbols) score++;
    return { score, label: ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][Math.min(score, 4)], color: ['#EF4444', '#F97316', '#F97316', '#22C55E', '#22C55E'][Math.min(score, 4)] };
  }, [length, options]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    addToast('Password copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-cova-primary" /> Password Generator
        </h1>
        <p className="text-sm text-cova-muted mt-1">Create strong, secure passwords in seconds</p>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card mb-6">
        <div className="relative mb-4">
          <div className="w-full px-4 py-4 bg-cova-bg rounded-btn border border-cova-border text-center font-mono text-xl font-semibold text-cova-text break-all select-all" role="status" aria-live="polite" aria-label="Generated password">
            {password}
          </div>
          <div className="absolute right-2 top-2 flex gap-1">
            <button type="button" onClick={handleCopy} className={`p-2 rounded-btn transition-colors ${copied ? 'bg-cova-success text-white' : 'bg-cova-surface border border-cova-border text-cova-muted hover:bg-cova-elevated hover:text-cova-text'}`} aria-label="Copy password">
              <Copy className="w-4 h-4" />
            </button>
            <button type="button" onClick={generate} className="p-2 rounded-btn bg-cova-surface border border-cova-border text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors" aria-label="Generate new password">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <div className="flex gap-1 mb-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="h-2 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: i < strength.score ? strength.color : 'rgb(var(--cova-border-rgb))' }} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: strength.color }}>{strength.label}</span>
            <span className="text-xs text-cova-faint">{strength.score}/5 strength</span>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card mb-6 space-y-6">
        <div>
          <label className="label">Password Length: {length}</label>
          <input type="range" min={8} max={64} step={1} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-cova-primary" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-cova-faint uppercase tracking-wider mb-3">Character Types</h3>
          <div className="grid grid-cols-2 gap-3">
            {([
              { key: 'uppercase' as const, label: 'Uppercase (A-Z)' },
              { key: 'lowercase' as const, label: 'Lowercase (a-z)' },
              { key: 'numbers' as const, label: 'Numbers (0-9)' },
              { key: 'symbols' as const, label: 'Symbols (!@#)' },
            ]).map(({ key, label }) => (
              <label key={key} className={`flex items-center gap-3 px-4 py-2.5 rounded-btn border transition-colors cursor-pointer ${options[key] ? 'border-cova-primary bg-cova-primary/10 text-cova-primary' : 'border-cova-border hover:border-cova-primary/50 bg-cova-bg text-cova-text'}`}>
                <input type="checkbox" checked={options[key]} onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key] }))} className="w-4 h-4 rounded border-cova-border accent-cova-primary" />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// Demo Activity Log Page
export function DemoActivityPage({ activity }: { activity: DemoActivity[] }) {
  const typeIcons: Record<DemoActivityType, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { credentials: Key, notes: StickyNote, tasks: ListChecks, wallet: Wallet, savings: PiggyBank };
  const typeColors: Record<DemoActivityType, string> = { credentials: '#EF4444', notes: '#22C55E', tasks: '#F97316', wallet: '#22C55E', savings: '#7C3AED' };

  const sorted = [...activity].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-cova-text flex items-center gap-2">
          <Activity className="w-5 h-5 text-cova-primary" aria-hidden="true" /> Activity Log
          <span className="ml-2 px-2 py-0.5 rounded-full bg-cova-surface border border-cova-border text-xs font-medium text-cova-muted">{activity.length}</span>
        </h1>
        <p className="text-sm text-cova-muted mt-1">Recent actions across your vault</p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-card border border-cova-border bg-cova-surface p-8 shadow-card">
          <div className="text-center">
            <Activity className="w-16 h-16 text-cova-faint mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-cova-text">No activity yet</h3>
            <p className="mt-2 text-sm text-cova-muted">Your actions will appear here as you use the app.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-card border border-cova-border bg-cova-surface shadow-card overflow-hidden">
          <div className="divide-y divide-cova-border">
            {sorted.map((a) => {
              const Icon = typeIcons[a.type] || Key;
              const color = typeColors[a.type] || '#7C3AED';
              return (
                <div key={a.id} className="px-5 py-4 flex items-start gap-3 hover:bg-cova-elevated transition-colors">
                  <div className="w-8 h-8 rounded-btn flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: color + '20' }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-cova-text">{a.text}</p>
                    <p className="text-xs text-cova-faint mt-0.5">{a.type}</p>
                  </div>
                  <span className="text-xs text-cova-faint whitespace-nowrap flex-shrink-0">{a.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
// Demo Settings Page
export function DemoSettingsPage() {
  const [activeSection, setActiveSection] = React.useState<'account' | 'appearance' | 'language' | 'security' | 'data' | 'diagnostics'>('account');
  const sections = [
    { id: 'account' as const, title: 'Account', subtitle: 'Update your profile, avatar, and master password.', icon: Shield },
    { id: 'appearance' as const, title: 'Appearance', subtitle: 'Customize the look and feel of Cova.', icon: Settings },
    { id: 'language' as const, title: 'Language', subtitle: 'Set your preferred language and region.', icon: Globe },
    { id: 'security' as const, title: 'Security & 2FA', subtitle: 'Protect your vault with two-factor authentication.', icon: Lock },
    { id: 'data' as const, title: 'Backup & Export', subtitle: 'Manage your encrypted backups and exports.', icon: HardDrive },
    { id: 'diagnostics' as const, title: 'Diagnostics', subtitle: 'Persistence probe, build identity, and native storage inspection.', icon: Thermometer },
  ];

  const active = sections.find(s => s.id === activeSection);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-cova-text">{active?.title}</h1>
          <p className="text-sm text-cova-muted mt-1">{active?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-card border transition-colors text-left ${activeSection === s.id ? 'border-cova-primary bg-cova-primary/10 text-cova-primary' : 'border-cova-border bg-cova-surface text-cova-text hover:border-cova-primary/50'}`}
            >
              <s.icon className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-cova-faint truncate">{s.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
          <p className="text-sm text-cova-muted">
            This is a demo — settings are not persisted and do not affect your real vault.
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo Lock Page
export function DemoLockPage({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    onUnlock();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-cova-primary/15 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-cova-primary" />
          </div>
          <h1 className="text-2xl font-bold text-cova-text">Cova Vault</h1>
          <p className="text-sm text-cova-muted mt-1">Enter your master password to unlock</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card space-y-4">
          <div>
            <label className="label">Master Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cova-muted hover:text-cova-text transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="mt-1 text-xs text-cova-danger">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-btn text-white bg-cova-primary hover:bg-cova-primaryHover transition"
          >
            <Lock className="w-4 h-4" /> Unlock Vault
          </button>

          <div className="text-center">
            <p className="text-xs text-cova-faint">
              Demo mode: any non-empty password unlocks this preview. No real authentication is performed.
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-cova-faint">AES-256 · Local-only · No cloud sync</p>
        </div>
      </div>
    </div>
  );
}
// Demo About Page
export function DemoAboutPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-cova-primary/15 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-10 h-10 text-cova-primary" />
        </div>
        <h1 className="text-2xl font-bold text-cova-text">Cova Vault</h1>
        <p className="text-sm text-cova-muted mt-1">Your secure digital vault</p>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card mb-4">
        <h2 className="text-sm font-semibold text-cova-text mb-3">About</h2>
        <p className="text-sm text-cova-muted leading-relaxed">
          Cova Vault is a privacy-focused password manager and digital vault for Android.
          All data is encrypted locally on your device using AES-256 encryption.
          No cloud sync, no tracking, no data collection.
        </p>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card mb-4">
        <h2 className="text-sm font-semibold text-cova-text mb-3">Features</h2>
        <ul className="space-y-2 text-sm text-cova-muted">
          <li className="flex items-center gap-2"><Key className="w-4 h-4 text-cova-primary" /> Credential management</li>
          <li className="flex items-center gap-2"><Wallet className="w-4 h-4 text-cova-primary" /> Wallet & expense tracking</li>
          <li className="flex items-center gap-2"><StickyNote className="w-4 h-4 text-cova-primary" /> Secure notes</li>
          <li className="flex items-center gap-2"><ListChecks className="w-4 h-4 text-cova-primary" /> Task management</li>
          <li className="flex items-center gap-2"><PiggyBank className="w-4 h-4 text-cova-primary" /> Savings goals</li>
          <li className="flex items-center gap-2"><KeyRound className="w-4 h-4 text-cova-primary" /> Password generator</li>
        </ul>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card mb-4">
        <h2 className="text-sm font-semibold text-cova-text mb-3">Security</h2>
        <p className="text-sm text-cova-muted leading-relaxed">
          All data is stored locally on your device and encrypted with AES-256.
          The master password never leaves your device. No accounts, no cloud, no tracking.
        </p>
      </div>

      <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
        <h2 className="text-sm font-semibold text-cova-text mb-3">Open Source</h2>
        <p className="text-sm text-cova-muted leading-relaxed">
          Cova Vault is open source. View the source code and contribute on GitHub.
        </p>
        <div className="mt-3">
          <a href="https://github.com/Shimizu019/cova-vault" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-cova-border bg-cova-bg text-cova-text text-sm font-medium hover:border-cova-primary/50 transition">
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-cova-faint">
        This is an interactive demo. All data is fictional and resets on refresh.
      </p>
    </div>
  );
}

// Simple GitHub icon component
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
