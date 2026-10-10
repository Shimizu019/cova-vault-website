import * as React from 'react';
import { Check, X, Eye, EyeOff, KeyRound, StickyNote, ListChecks, Wallet, Activity, PiggyBank, Star, LayoutDashboard, Folder, Calendar, Clock, Key, ExternalLink, Shield, Settings, LogOut, Lock, Info, Book, Mail, Plus, Trash2, Pencil, Search, CloudDownload, RefreshCw, FolderOpen, ArrowLeftRight, Landmark, Smartphone, Bell, Sliders, Globe, HardDrive, Thermometer, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import {
  formatPeso,
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

/**
 * In-memory toast feedback for the demo.
 *
 * Mirrors the real app's `addToast` helper so save/error messages are actually
 * visible to the visitor instead of being written to the developer console.
 * Nothing is persisted — the queue lives in module scope for the lifetime of
 * the page and clears itself on every `Reset Demo` / refresh.
 */
type DemoToast = { id: number; message: string; type: 'success' | 'error' | 'info' };

type DemoToastListener = (toast: DemoToast) => void;

let toastListeners: DemoToastListener[] = [];
let toastSeq = 0;

function addToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const toast: DemoToast = { id: ++toastSeq, message, type };
  toastListeners.forEach(listener => listener(toast));
}

/** Stack of transient toast messages, rendered once by the demo shell. */
export function DemoToasts() {
  const [toasts, setToasts] = React.useState<DemoToast[]>([]);

  React.useEffect(() => {
    const listener: DemoToastListener = toast => {
      setToasts(prev => [...prev, toast]);
      window.setTimeout(() => {
        setToasts(prev => prev.filter(entry => entry.id !== toast.id));
      }, 3200);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(entry => entry !== listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  const styles: Record<DemoToast['type'], string> = {
    success: 'border-cova-success/50 text-cova-success',
    error: 'border-cova-danger/50 text-cova-danger',
    info: 'border-cova-primary/50 text-cova-primary',
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-3 bottom-3 z-[70] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end"
      role="status"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-card border bg-cova-surface px-4 py-3 text-sm font-medium shadow-dialog animate-fade-up ${styles[toast.type]}`}
        >
          <span className="mt-0.5" aria-hidden="true">
            {toast.type === 'success' ? <Check className="h-4 w-4" /> :
              toast.type === 'error' ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          </span>
          <span className="min-w-0 flex-1 text-cova-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
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

// Shared text field used by every demo form.
function Input({ value, onChange, placeholder, type, min, step, maxLength, autoFocus, className, id, invalid, autoComplete, inputMode }: {
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
  invalid?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'url';
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
      inputMode={inputMode}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      aria-invalid={invalid ? 'true' : undefined}
      className={`input w-full ${className || ''}`}
    />
  );
}

export function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-card border border-cova-border bg-cova-surface shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cova-border px-5 py-3.5">
        <h3 className="text-sm font-semibold text-cova-text">{title}</h3>
        {hint ? <p className="text-xs text-cova-faint">{hint}</p> : null}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

/**
 * Page heading shared by every module screen so titles, supporting text and
 * actions stay aligned no matter which screen is open.
 */
export function PageHeader({ icon: Icon, title, subtitle, count, actions }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  count?: number;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2.5 text-xl font-bold text-cova-text">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-btn border border-cova-border bg-cova-elevated text-cova-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate">{title}</span>
          {typeof count === 'number' ? (
            <span className="rounded-badge border border-cova-border bg-cova-elevated px-2 py-0.5 text-xs font-medium text-cova-muted">
              {count}
            </span>
          ) : null}
        </h1>
        {subtitle ? <p className="mt-1.5 text-sm text-cova-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/** Label + control + inline validation message. */
export function Field({ label, htmlFor, required, hint, error, children }: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label" htmlFor={htmlFor}>
        <span>{label}</span>
        {required ? <span className="req" aria-hidden="true">*</span> : null}
        {!required && hint ? <span className="font-normal text-cova-faint">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field-error" role="alert">
          <X className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

/**
 * Consistent inline "add new" form used across the module screens.
 *
 * Handles the awkward parts once, in one place: Escape to dismiss, focus moved
 * into the form on open and restored to the triggering control on close, a
 * single form-level validation message, and a predictable Save / Cancel pair.
 */
export function FormCard({ title, description, submitLabel = 'Save', onClose, onSubmit, error, children }: {
  title: string;
  description?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
  error?: string | null;
  children: React.ReactNode;
}) {
  const rootRef = React.useRef<HTMLFormElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    rootRef.current?.querySelector<HTMLElement>('input, textarea, select')?.focus();
    const returnFocus = openerRef.current;
    return () => {
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    };
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <form
      ref={rootRef}
      className="form-card mb-6"
      noValidate
      onSubmit={(event) => { event.preventDefault(); onSubmit(); }}
    >
      <div className="flex items-start justify-between gap-3 border-b border-cova-border pb-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-cova-text">{title}</h3>
          {description ? <p className="mt-0.5 text-xs text-cova-muted">{description}</p> : null}
        </div>
        <button type="button" onClick={onClose} className="icon-btn -mr-1.5 -mt-1 shrink-0" aria-label="Close form">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 space-y-4">{children}</div>

      <div className="form-actions">
        <p className="mr-auto text-xs text-cova-faint">
          Fields marked <span className="font-bold text-cova-danger">*</span> are required.
        </p>
        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>

      {error ? (
        <p className="field-error mt-3" role="alert">
          <X className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </form>
  );
}

/** Uniform empty / no-results treatment for every list screen. */
export function EmptyState({ icon: Icon, title, description, action }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface shadow-card">
      <div className="empty-state">
        <span className="empty-state-icon">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="empty-state-title">{title}</p>
        <p className="empty-state-description">{description}</p>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
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
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-btn ${tint}`} aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold uppercase tracking-wider text-cova-faint">{label}</p>
        <p className="mt-1 truncate text-lg font-bold text-cova-text" title={value}>{value}</p>
      </div>
    </div>
  );
}

const ACTIVITY_TINTS: Record<DemoActivityType, string> = {
  credentials: TINT_BLUE,
  notes: TINT_TEAL,
  tasks: TINT_AMBER,
  wallet: TINT_GREEN,
  savings: TINT_INDIGO,
};

const ACTIVITY_ICONS: Record<DemoActivityType, React.ComponentType<{ className?: string }>> = {
  credentials: Key,
  notes: StickyNote,
  tasks: ListChecks,
  wallet: Wallet,
  savings: PiggyBank,
};

/**
 * Dashboard mirrors the real app's landing screen: greeting, purple backup
 * reminder, four metric cards, and a recent-activity feed. Every number is
 * derived from the shared demo state so it stays in sync after sample data
 * changes.
 */
export function DemoDashboardPage({ credentials, notes, tasks, openTasks, wallets, activity }: {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  openTasks: number;
  wallets: DemoWallet[];
  activity: DemoActivity[];
}) {
  const walletBalance = wallets.reduce((sum, wallet) => sum + wallet.startingBalance, 0);
  const recent = [...activity].reverse().slice(0, 6);

  return (
    <div className="space-y-5 p-4 sm:p-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-cova-text">Good to see you, Demo.</h1>
        <p className="mt-1 text-sm text-cova-muted">Here's everything across your Safe Vault.</p>
      </div>

      {/* Backup reminder — a demo illustration only, nothing is ever uploaded. */}
      <div
        className="flex flex-col gap-4 rounded-panel border border-cova-primary/30 p-5 sm:flex-row sm:items-center sm:gap-4"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)' }}
        role="note"
        aria-label="Backup reminder"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
          <CloudDownload className="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-white">No Backup yet</h2>
          <p className="mt-0.5 text-sm leading-relaxed text-white/80">
            Your Safe Vault only lives on this device. This reminder is a demo illustration —
            nothing here is saved or uploaded anywhere.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addToast('Backup is a demo illustration — nothing was saved or sent.', 'info')}
          className="btn shrink-0 bg-white text-[#5B21B6] hover:bg-white/90 sm:w-auto"
        >
          Backup Now!
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Key} label="Credentials" value={String(credentials.length)} tint={TINT_BLUE} />
        <StatCard icon={StickyNote} label="Notes" value={String(notes.length)} tint={TINT_TEAL} />
        <StatCard icon={ListChecks} label="Open Tasks" value={String(openTasks)} tint={TINT_GREEN} />
        <StatCard icon={Wallet} label="My Wallet" value={formatPeso(walletBalance)} tint={TINT_INDIGO} />
      </div>

      {/* Recent activity */}
      <Panel title="Recent Activities" hint={`${activity.length} total`}>
        {recent.length === 0 ? (
          <div className="empty-state py-8">
            <span className="empty-state-icon">
              <Activity className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="empty-state-title">No activity yet</p>
            <p className="empty-state-description">Complete a task or add a record to see it here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-cova-border">
            {recent.map((entry) => {
              const Icon = ACTIVITY_ICONS[entry.type] ?? Activity;
              return (
                <li key={entry.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-btn ${ACTIVITY_TINTS[entry.type] ?? TINT_ROSE}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words text-sm text-cova-text">{entry.text}</span>
                    <span className="mt-0.5 block text-xs capitalize text-cova-faint">
                      {entry.type} · {entry.timestamp}
                    </span>
                  </span>
                </li>
              );
            })}
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
  const [formError, setFormError] = React.useState<string | null>(null);

  const filtered = credentials.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase()) ||
    c.website.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormName('');
    setFormUsername('');
    setFormPassword('');
    setFormWebsite('');
    setFormError(null);
  };

  const handleAdd = () => {
    const missing = [
      !formName.trim() ? 'name' : null,
      !formUsername.trim() ? 'username' : null,
      !formPassword.trim() ? 'password' : null,
    ].filter((field): field is string => field !== null);

    if (missing.length > 0) {
      const message = `Please fill in the required ${missing.length > 1 ? 'fields' : 'field'}: ${missing.join(', ')}.`;
      setFormError(message);
      addToast(message, 'error');
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
    addToast(`Credential "${newCred.name}" added`, 'success');
    setShowAdd(false);
    resetForm();
  };

  const handleCancel = () => {
    setShowAdd(false);
    resetForm();
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <PageHeader
        icon={Key}
        title="Credentials"
        subtitle="Manage your stored passwords securely"
        count={filtered.length}
        actions={
          <>
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cova-faint"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search credentials..."
                className="input h-10 w-full pl-9 pr-3"
                aria-label="Search credentials"
              />
            </div>
            <button type="button" onClick={() => setShowAdd(true)} className="btn btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" /> New
            </button>
          </>
        }
      />

      {showAdd && (
        <FormCard
          title="Add Credential"
          description="Saved to this browser session only — never sent anywhere."
          onClose={handleCancel}
          onSubmit={handleAdd}
          error={formError}
        >
          <Field label="Name" htmlFor="cred-name" required>
            <Input id="cred-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Example Mail" invalid={!formName.trim()} />
          </Field>
          <Field label="Username" htmlFor="cred-username" required>
            <Input id="cred-username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} placeholder="demo.user@example.com" autoComplete="off" invalid={!formUsername.trim()} />
          </Field>
          <Field label="Password" htmlFor="cred-password" required>
            <Input id="cred-password" type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder="DemoPass!2024" invalid={!formPassword.trim()} />
          </Field>
          <Field label="Website" htmlFor="cred-website" hint="optional">
            <Input id="cred-website" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} placeholder="https://example.com" />
          </Field>
          <p className="rounded-btn border border-cova-warning/30 bg-cova-warning/10 px-3 py-2 text-xs leading-relaxed text-cova-muted">
            This is a fictional demo — never enter real passwords here.
          </p>
        </FormCard>
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
                    <tr key={cred.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary">
                            <Key className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div className="min-w-0 max-w-[16rem]">
                            <div className="flex items-center gap-1.5 font-medium text-cova-text">
                              <Star
                                className={`h-3.5 w-3.5 shrink-0 ${cred.favorite ? 'fill-cova-warning text-cova-warning' : 'text-cova-faint'}`}
                                aria-label={cred.favorite ? 'Favorite' : undefined}
                              />
                              <span className="truncate" title={cred.name}>{cred.name}</span>
                            </div>
                            <div className="truncate text-xs text-cova-faint" title={getDomainFromUrl(cred.website)}>
                              {getDomainFromUrl(cred.website) || '—'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="block max-w-[13rem] truncate text-sm text-cova-muted" title={cred.username}>
                          {cred.username}
                        </span>
                      </td>
                      <td>
                        <span className="block max-w-[13rem] truncate font-mono text-sm text-cova-text" title={isVisible ? cred.password : undefined}>
                          {isVisible ? cred.password : maskPassword(cred.password)}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(cred.password);
                              addToast('Password copied to clipboard', 'success');
                            }}
                            className="icon-btn"
                            aria-label={`Copy password for ${cred.name}`}
                          >
                            <Copy className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onTogglePassword(cred.id)}
                            className="icon-btn"
                            aria-label={isVisible ? `Hide password for ${cred.name}` : `Show password for ${cred.name}`}
                            aria-pressed={isVisible}
                          >
                            {isVisible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(cred.id)}
                            className={`icon-btn hover:text-cova-warning ${cred.favorite ? 'text-cova-warning' : ''}`}
                            aria-label={cred.favorite ? `Remove ${cred.name} from favorites` : `Add ${cred.name} to favorites`}
                            aria-pressed={cred.favorite}
                          >
                            <Star className={`h-4 w-4 ${cred.favorite ? 'fill-cova-warning text-cova-warning' : ''}`} aria-hidden="true" />
                          </button>
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
        <EmptyState
          icon={Key}
          title={search ? 'No credentials found' : 'No credentials yet'}
          description={search
            ? `Nothing matches “${search}”. Try a different search term.`
            : 'Add a sample credential to see how the vault stores logins, usernames and passwords.'}
          action={
            search ? (
              <button type="button" onClick={() => setSearch('')} className="btn btn-secondary">Clear search</button>
            ) : (
              <button type="button" onClick={() => setShowAdd(true)} className="btn btn-primary">
                <Plus className="h-4 w-4" aria-hidden="true" /> Add credential
              </button>
            )
          }
        />
      )}
    </div>
  );
}
export function DemoWalletPage({ wallets, records, onAddWallet, onReset }: {
  wallets: DemoWallet[];
  records: DemoWalletRecord[];
  onAddWallet: (wallet: DemoWallet) => void;
  onReset: () => void;
}) {
  const [showAdd, setShowAdd] = React.useState(false);
  const [walletName, setWalletName] = React.useState('');
  const [walletType, setWalletType] = React.useState<DemoWallet['type']>('cash');
  const [walletAmount, setWalletAmount] = React.useState('0');
  const [formError, setFormError] = React.useState<string | null>(null);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.startingBalance, 0);
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);

  const handleAdd = () => {
    if (!walletName.trim()) {
      const message = 'Wallet name is required.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    const newWallet: DemoWallet = {
      id: `wallet-${Date.now()}`,
      name: walletName.trim(),
      type: walletType,
      startingBalance: parseFloat(walletAmount) || 0,
    };
    onAddWallet(newWallet);
    addToast(`Wallet "${newWallet.name}" added`, 'success');
    setShowAdd(false);
    setWalletName('');
    setWalletType('cash');
    setWalletAmount('0');
    setFormError(null);
  };

  const handleCancel = () => {
    setShowAdd(false);
    setWalletName('');
    setWalletType('cash');
    setWalletAmount('0');
    setFormError(null);
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        icon={Wallet}
        title="My Wallet (PeraLog)"
        subtitle="Manage your wallet balances and transactions"
        count={wallets.length}
        actions={
          <button type="button" onClick={() => setShowAdd(true)} className="btn btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" /> Add Wallet
          </button>
        }
      />

      {showAdd && (
        <FormCard
          title="Add Wallet"
          description="Sample wallets stay in memory for this preview only."
          onClose={handleCancel}
          onSubmit={handleAdd}
          error={formError}
        >
          <Field label="Wallet Name" htmlFor="wallet-name" required>
            <Input
              id="wallet-name"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="e.g. GCash, Maya, Cash"
              maxLength={40}
              invalid={!walletName.trim()}
            />
          </Field>
          <Field label="Type" htmlFor="wallet-type">
            <select
              id="wallet-type"
              value={walletType}
              onChange={(e) => setWalletType(e.target.value as DemoWallet['type'])}
              className="input w-full"
            >
              <option value="cash">Cash</option>
              <option value="digital">Digital Wallet</option>
              <option value="bank">Bank</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Starting Amount (₱)" htmlFor="wallet-amount" hint="optional">
            <Input
              id="wallet-amount"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={walletAmount}
              onChange={(e) => setWalletAmount(e.target.value)}
              placeholder="0.00"
            />
          </Field>
        </FormCard>
      )}

      {/* Financial summary — three equal cards so no single balance dominates. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-cova-primary/40 bg-cova-surface p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Total Balance</p>
          <p className="mt-1.5 truncate text-xl font-bold text-cova-text" title={formatPeso(totalBalance)}>
            {formatPeso(totalBalance)}
          </p>
          <p className="mt-1 text-xs text-cova-muted">{wallets.length} wallet{wallets.length === 1 ? '' : 's'}</p>
        </div>
        <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Income</p>
          <p className="mt-1.5 truncate text-xl font-bold text-cova-success" title={formatPeso(totalIncome)}>
            {formatPeso(totalIncome)}
          </p>
          <p className="mt-1 text-xs text-cova-muted">This period</p>
        </div>
        <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Expenses</p>
          <p className="mt-1.5 truncate text-xl font-bold text-cova-danger" title={formatPeso(totalExpenses)}>
            {formatPeso(totalExpenses)}
          </p>
          <p className="mt-1 text-xs text-cova-muted">This period</p>
        </div>
      </div>

      {/* Wallets */}
      <div className="mt-6">
        <Panel title="Wallets" hint={`${wallets.length} total`}>
          {wallets.length === 0 ? (
            <div className="empty-state py-8">
              <span className="empty-state-icon">
                <Wallet className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="empty-state-title">No wallets yet</p>
              <p className="empty-state-description">Add a wallet to start tracking balances.</p>
            </div>
          ) : (
            <ul className="divide-y divide-cova-border">
              {wallets.map(wallet => (
                <li key={wallet.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary">
                    <Landmark className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-cova-text" title={wallet.name}>{wallet.name}</p>
                    <p className="text-xs capitalize text-cova-faint">{wallet.type}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-cova-text">
                    {formatPeso(wallet.startingBalance)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* Transactions */}
      <div className="mt-6">
        <Panel title="Transaction history" hint={`${records.length} record${records.length === 1 ? '' : 's'}`}>
          {records.length === 0 ? (
            <div className="empty-state py-8">
              <span className="empty-state-icon">
                <ArrowLeftRight className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="empty-state-title">No transactions yet</p>
              <p className="empty-state-description">Sample income and expenses will appear here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-cova-border">
              {records.map(record => {
                const isIncome = record.type === 'income';
                return (
                  <li key={record.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-btn ${isIncome ? TINT_GREEN : TINT_ROSE}`}
                      aria-hidden="true"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-cova-text" title={record.description}>
                        {record.description}
                      </p>
                      <p className="truncate text-xs text-cova-faint">
                        {record.category} · {record.date}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-semibold ${isIncome ? 'text-cova-success' : 'text-cova-danger'}`}>
                        {isIncome ? '+' : '−'}{formatPeso(record.amount)}
                      </p>
                      <p className="text-[11px] capitalize text-cova-faint">{record.type}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
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
  const [formError, setFormError] = React.useState<string | null>(null);

  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  const handleSave = () => {
    const target = parseFloat(draftTarget);
    if (!draftName.trim()) {
      const message = 'Please enter a goal name.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    if (isNaN(target) || target <= 0) {
      const message = 'Target amount must be greater than ₱0.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    const newGoal: DemoSavingGoal = {
      id: `goal-${Date.now()}`,
      name: draftName.trim(),
      current: 0,
      target,
    };
    onCreateGoal(newGoal);
    addToast(`Savings goal "${newGoal.name}" created`, 'success');
    setShowNew(false);
    setDraftName('');
    setDraftTarget('');
    setFormError(null);
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftName('');
    setDraftTarget('');
    setFormError(null);
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        icon={PiggyBank}
        title="Savings"
        subtitle="Track your savings goals and progress"
        count={goals.length}
        actions={
          <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" /> New Goal
          </button>
        }
      />

      {showNew && (
        <FormCard
          title="New Savings Goal"
          description="Sample goals are held in memory for this preview only."
          submitLabel="Create"
          onClose={handleCancel}
          onSubmit={handleSave}
          error={formError}
        >
          <Field label="Goal Name" htmlFor="goal-name" required>
            <Input id="goal-name" value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="e.g. Emergency fund" invalid={!draftName.trim()} />
          </Field>
          <Field label="Target Amount (₱)" htmlFor="goal-target" required>
            <Input id="goal-target" type="number" min="1" inputMode="decimal" value={draftTarget} onChange={(e) => setDraftTarget(e.target.value)} placeholder="50000" invalid={!!draftTarget && (isNaN(parseFloat(draftTarget)) || parseFloat(draftTarget) <= 0)} />
          </Field>
        </FormCard>
      )}

      {goals.length > 0 && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Total Saved</p>
            <p className="mt-1 truncate text-2xl font-bold text-cova-text" title={formatPeso(totalCurrent)}>{formatPeso(totalCurrent)}</p>
            <p className="mt-1 text-xs text-cova-muted">of {formatPeso(totalTarget)} targeted</p>
          </div>
          <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Total Target</p>
            <p className="mt-1 truncate text-2xl font-bold text-cova-text" title={formatPeso(totalTarget)}>{formatPeso(totalTarget)}</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cova-border" role="progressbar"
              aria-valuenow={totalTarget ? Math.min(Math.round((totalCurrent / totalTarget) * 100), 100) : 0}
              aria-valuemin={0} aria-valuemax={100} aria-label="Overall savings progress">
              <div
                className="h-full rounded-full bg-cova-primary transition-all duration-500"
                style={{ width: `${totalTarget ? Math.min(Math.round((totalCurrent / totalTarget) * 100), 100) : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {goals.length === 0 ? (
        <EmptyState
          icon={PiggyBank}
          title="No savings goals yet"
          description="Set a goal and track your progress over time."
          action={
            <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" /> New Goal
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => {
            const pct = Math.max(0, Math.min(Math.round((g.current / g.target) * 100), 100));
            const color = pct >= 100 ? 'rgb(var(--cova-success-rgb))' : pct >= 50 ? 'rgb(var(--cova-warning-rgb))' : 'rgb(var(--cova-primary-rgb))';
            return (
              <div key={g.id} className="flex flex-col gap-3 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary">
                      <PiggyBank className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-cova-text" title={g.name}>{g.name}</p>
                      <p className="text-xs text-cova-faint">
                        {formatPeso(g.current)} of {formatPeso(g.target)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteGoal(g.id)}
                    className="icon-btn -mr-1.5 -mt-1 shrink-0 hover:text-cova-danger"
                    aria-label={`Delete goal ${g.name}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-cova-border"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${g.name} progress`}
                  >
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                  <p className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-cova-faint">Remaining {formatPeso(Math.max(g.target - g.current, 0))}</span>
                    <span className="font-semibold" style={{ color }}>{pct}%</span>
                  </p>
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
  const [formError, setFormError] = React.useState<string | null>(null);

  const filtered = notes.filter(n =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!draftTitle.trim()) {
      const message = 'Please enter a note title.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    const newNote: DemoNote = {
      id: `note-${Date.now()}`,
      title: draftTitle.trim(),
      body: draftBody,
      updated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    onCreateNote(newNote);
    addToast(`Note "${newNote.title}" created`, 'success');
    setShowNew(false);
    setDraftTitle('');
    setDraftBody('');
    setFormError(null);
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftTitle('');
    setDraftBody('');
    setFormError(null);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <PageHeader
        icon={StickyNote}
        title="Notes"
        subtitle="Keep your important notes secure"
        count={filtered.length}
        actions={
          <>
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cova-faint"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="input h-10 w-full pl-9 pr-3"
                aria-label="Search notes"
              />
            </div>
            <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" /> New
            </button>
          </>
        }
      />

      {showNew && (
        <FormCard
          title="New Note"
          description="Notes stay in memory for this preview only."
          submitLabel="Create"
          onClose={handleCancel}
          onSubmit={handleSave}
          error={formError}
        >
          <Field label="Title" htmlFor="note-title" required>
            <Input id="note-title" value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="e.g. Weekend trip ideas" invalid={!draftTitle.trim()} />
          </Field>
          <Field label="Content" htmlFor="note-body" hint="optional">
            <textarea
              id="note-body"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              placeholder="Write your note here..."
              className="input min-h-[120px] w-full resize-y font-sans"
            />
          </Field>
        </FormCard>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title={search ? 'No notes found' : 'No notes yet'}
          description={search
            ? `Nothing matches “${search}”. Try a different search term.`
            : 'Create a note to keep something important close at hand.'}
          action={
            search ? (
              <button type="button" onClick={() => setSearch('')} className="btn btn-secondary">Clear search</button>
            ) : (
              <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
                <Plus className="h-4 w-4" aria-hidden="true" /> New note
              </button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((n) => (
            <article
              key={n.id}
              className="group flex flex-col gap-4 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/40 hover:shadow-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary transition duration-200 group-hover:bg-cova-primary/25">
                    <StickyNote className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="min-w-0 truncate font-semibold text-cova-text" title={n.title}>{n.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteNote(n.id)}
                  className="rounded-btn border border-cova-border bg-cova-elevated p-2 text-cova-muted transition duration-200 hover:border-cova-danger/40 hover:text-cova-danger focus-visible:ring-2 focus-visible:ring-cova-danger/40 focus-visible:outline-none"
                  aria-label={`Delete note ${n.title}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-cova-muted">
                {n.body || <span className="italic text-cova-faint">Add a note body to capture your thoughts.</span>}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-cova-border pt-3">
                <span className="inline-flex items-center gap-1.5 rounded-badge bg-cova-elevated px-2.5 py-1 text-xs font-medium text-cova-muted">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  Updated {n.updated}
                </span>
                <p className="text-xs text-cova-faint">
                  {n.body ? 'Stored in browser memory; not synced or backed up.' : 'No body yet — add one below.'}
                </p>
              </div>
            </article>
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
  const [formError, setFormError] = React.useState<string | null>(null);

  const filtered = tasks.filter(t => {
    const matchQ = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchS = statusFilter === 'all' || t.status === statusFilter;
    return matchQ && matchS;
  });

  const handleSave = () => {
    if (!draftTitle.trim()) {
      const message = 'Please enter a task title.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    const newTask: DemoTask = {
      id: `task-${Date.now()}`,
      title: draftTitle.trim(),
      status: 'todo',
      priority: draftPriority,
    };
    onCreateTask(newTask);
    addToast(`Task "${newTask.title}" created`, 'success');
    setShowNew(false);
    setDraftTitle('');
    setDraftPriority('medium');
    setFormError(null);
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftTitle('');
    setDraftPriority('medium');
    setFormError(null);
  };

  const statusColors = { todo: 'bg-cova-faint/15 text-cova-muted', in_progress: 'bg-cova-warning/15 text-cova-warning', done: 'bg-cova-success/15 text-cova-success' };
  const statusLabels = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
  const priorityColors = { low: 'bg-cova-success/15 text-cova-success', medium: 'bg-cova-warning/15 text-cova-warning', high: 'bg-cova-danger/15 text-cova-danger' };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <PageHeader
        icon={ListChecks}
        title="Tasks"
        subtitle="Manage your tasks and to-dos"
        count={filtered.length}
        actions={
          <>
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cova-faint"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="input h-10 w-full pl-9 pr-3"
                aria-label="Search tasks"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="input h-10 w-auto"
              aria-label="Filter by status"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" /> New
            </button>
          </>
        }
      />

      {showNew && (
        <FormCard
          title="New Task"
          description="Sample tasks are held in memory for this preview only."
          submitLabel="Create"
          onClose={handleCancel}
          onSubmit={handleSave}
          error={formError}
        >
          <Field label="Title" htmlFor="task-title" required>
            <Input id="task-title" value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="What needs to be done?" invalid={!draftTitle.trim()} />
          </Field>
          <Field label="Priority" htmlFor="task-priority">
            <div className="flex gap-2" role="radiogroup" aria-label="Priority">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  id={p === 'low' ? 'task-priority' : undefined}
                  type="button"
                  role="radio"
                  aria-checked={draftPriority === p}
                  onClick={() => setDraftPriority(p)}
                  className={`flex-1 rounded-btn border py-2.5 text-sm font-medium capitalize transition-colors ${
                    draftPriority === p
                      ? 'border-cova-primary bg-cova-primary/15 text-cova-primary'
                      : 'border-cova-border bg-cova-bg text-cova-muted hover:border-cova-faint/60 hover:text-cova-text'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>
        </FormCard>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title={search || statusFilter !== 'all' ? 'No tasks found' : 'No tasks yet'}
          description={
            search || statusFilter !== 'all'
              ? 'No task matches the current search and status filter.'
              : 'Create a task to start tracking what needs doing.'
          }
          action={
            search || statusFilter !== 'all' ? (
              <button
                type="button"
                onClick={() => { setSearch(''); setStatusFilter('all'); }}
                className="btn btn-secondary"
              >
                Clear filters
              </button>
            ) : (
              <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
                <Plus className="h-4 w-4" aria-hidden="true" /> New task
              </button>
            )
          }
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-4 rounded-card border border-cova-border bg-cova-surface p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/40 hover:shadow-hover"
            >
              <button
                type="button"
                onClick={() => onToggleTask(t.id)}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  t.status === 'done'
                    ? 'border-cova-success bg-cova-success text-cova-success hover:bg-cova-success/85'
                    : 'border-cova-border text-cova-faint hover:border-cova-success hover:text-cova-success'
                }`}
                aria-label={t.status === 'done' ? `Mark “${t.title}” incomplete` : `Mark “${t.title}” complete`}
                aria-pressed={t.status === 'done'}
              >
                {t.status === 'done' && <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />}
              </button>
              <div className="min-w-0 flex-1">
                <h3 className={`break-words font-semibold text-cova-text ${t.status === 'done' ? 'text-cova-faint line-through' : ''}`}>
                  {t.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-badge px-2.5 py-1 text-xs font-medium ${statusColors[t.status]}`}>{statusLabels[t.status]}</span>
                  <span className={`inline-flex items-center rounded-badge px-2.5 py-1 text-xs font-medium capitalize ${priorityColors[t.priority]}`}>{t.priority}</span>
                  {t.dueDate ? <span className="inline-flex items-center gap-1 text-xs text-cova-faint"><Calendar className="h-3 w-3" aria-hidden="true" /> Due {t.dueDate}</span> : null}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDeleteTask(t.id)}
                className="rounded-btn border border-cova-border bg-cova-elevated p-2 text-cova-muted transition duration-200 hover:border-cova-danger/40 hover:text-cova-danger focus-visible:ring-2 focus-visible:ring-cova-danger/40 focus-visible:outline-none"
                aria-label={`Delete task ${t.title}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
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
  const [formError, setFormError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'credentials' | 'notes' | 'tasks'>('credentials');

  const handleCreate = () => {
    if (!draftName.trim()) {
      const message = 'Please enter a folder name.';
      setFormError(message);
      addToast(message, 'error');
      return;
    }
    onCreateFolder(draftName.trim());
    addToast(`Folder "${draftName.trim()}" created`, 'success');
    setShowNew(false);
    setDraftName('');
    setFormError(null);
  };

  const handleCancel = () => {
    setShowNew(false);
    setDraftName('');
    setFormError(null);
  };

  const countIn = (folderId: string, kind: 'credentials' | 'notes' | 'tasks') => {
    if (kind === 'credentials') return credentials.filter(c => c.folderId === folderId).length;
    if (kind === 'notes') return notes.filter(n => n.folderId === folderId).length;
    return tasks.filter(t => t.folderId === folderId).length;
  };

  if (openFolder) {
    const items: { id: string; icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string }[] =
      activeTab === 'credentials'
        ? credentials.filter(c => c.folderId === openFolder.id).map(c => ({ id: c.id, icon: Key, title: c.name, subtitle: c.username }))
        : activeTab === 'notes'
          ? notes.filter(n => n.folderId === openFolder.id).map(n => ({ id: n.id, icon: StickyNote, title: n.title, subtitle: n.body || 'Empty note' }))
          : tasks.filter(t => t.folderId === openFolder.id).map(t => ({ id: t.id, icon: ListChecks, title: t.title, subtitle: t.status.replace('_', ' ') }));

    return (
      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost btn-sm -ml-3 mb-4 justify-start"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to Folders
        </button>
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn border border-cova-border bg-cova-elevated text-cova-primary">
            <FolderOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-cova-text">{openFolder.name}</h1>
            <p className="text-sm text-cova-muted">
              {countIn(openFolder.id, 'credentials')} credentials · {countIn(openFolder.id, 'notes')} notes · {countIn(openFolder.id, 'tasks')} tasks
            </p>
          </div>
        </div>
        <div className="mb-4 flex gap-1 border-b border-cova-border" role="tablist" aria-label="Folder contents">
          {(['credentials', 'notes', 'tasks'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-cova-primary text-cova-primary'
                  : 'border-transparent text-cova-muted hover:text-cova-text'
              }`}
            >
              {tab}
              <span className="ml-1.5 rounded-badge bg-cova-elevated px-1.5 py-0.5 text-[11px] text-cova-faint">
                {countIn(openFolder.id, tab)}
              </span>
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="rounded-card border border-cova-border bg-cova-surface px-6 py-10 text-center">
            <p className="text-sm font-medium text-cova-text">No {activeTab} in this folder</p>
            <p className="mt-1 text-sm text-cova-muted">Items you assign to this folder will show up here.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-3 rounded-card border border-cova-border bg-cova-surface px-5 py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-btn bg-cova-primary/10 text-cova-primary">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-cova-text" title={item.title}>{item.title}</p>
                  <p className="truncate text-xs capitalize text-cova-faint" title={item.subtitle}>{item.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <PageHeader
        icon={Folder}
        title="Folders"
        subtitle="Organize your credentials, notes, and tasks"
        count={folders.length}
        actions={
          <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
            <Plus className="h-4 w-4" aria-hidden="true" /> New Folder
          </button>
        }
      />

      {showNew && (
        <FormCard
          title="New Folder"
          description="Folders group sample items together in this preview."
          submitLabel="Create"
          onClose={handleCancel}
          onSubmit={handleCreate}
          error={formError}
        >
          <Field label="Folder Name" htmlFor="folder-name" required>
            <Input id="folder-name" value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="e.g. Work accounts" invalid={!draftName.trim()} />
          </Field>
        </FormCard>
      )}

      {folders.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No folders yet"
          description="Create folders to organize your items."
          action={
            <button type="button" onClick={() => setShowNew(true)} className="btn btn-primary">
              <Plus className="h-4 w-4" aria-hidden="true" /> New Folder
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((f) => {
            const total = countIn(f.id, 'credentials') + countIn(f.id, 'notes') + countIn(f.id, 'tasks');
            return (
              <div
                key={f.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenFolder(f)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenFolder(f);
                  }
                }}
                className="group flex cursor-pointer items-center gap-3 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card transition-colors hover:border-cova-primary/50 hover:bg-cova-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cova-accent"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary">
                  <FolderOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-cova-text" title={f.name}>{f.name}</p>
                  <p className="text-xs text-cova-faint">
                    {total} item{total === 1 ? '' : 's'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); onDeleteFolder(f.id); }}
                  className="icon-btn shrink-0 opacity-0 transition-opacity hover:text-cova-danger focus-visible:opacity-100 group-hover:opacity-100"
                  aria-label={`Delete folder ${f.name}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
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
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <PageHeader
        icon={Star}
        title="Favorites"
        subtitle="Your starred credentials"
        count={favs.length}
        actions={
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cova-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search favorites..."
              className="input h-10 w-full pl-9 pr-3"
              aria-label="Search favorites"
            />
          </div>
        }
      />

      {shown.length === 0 ? (
        <EmptyState
          icon={Star}
          title={favs.length === 0 ? 'No favorites yet' : 'No favorites found'}
          description={favs.length === 0
            ? 'Star any credential on the Credentials screen and it will appear here.'
            : `Nothing matches “${search}”. Try a different search term.`}
          action={
            favs.length === 0 ? null : (
              <button type="button" onClick={() => setSearch('')} className="btn btn-secondary">Clear search</button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {shown.map((c) => (
            <article
              key={c.id}
              className="flex flex-col gap-4 rounded-card border border-cova-border bg-cova-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/40 hover:shadow-hover sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="flex min-w-0 items-center gap-3 sm:w-1/3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-cova-primary/15 text-cova-primary transition duration-200 group-hover:bg-cova-primary/25">
                  <Key className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-cova-text" title={c.name}>{c.name}</h3>
                  <p className="text-xs text-cova-faint">{getDomainFromUrl(c.website) || '—'}</p>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 border-t border-cova-border pt-3 sm:w-1/3">
                <p className="truncate text-sm font-medium text-cova-text" title={c.username}>{c.username}</p>
                <p className="font-mono text-sm text-cova-muted">{maskPassword(c.password)}</p>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2 sm:flex-col sm:items-start sm:justify-center">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(c.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-btn border px-4 py-2 text-sm font-medium transition duration-200 ${
                    c.favorite
                      ? 'border-cova-warning/30 bg-cova-warning/10 text-cova-warning'
                      : 'border-cova-border bg-cova-elevated text-cova-muted hover:border-cova-warning/40 hover:text-cova-warning'
                  }`}
                  aria-label={c.favorite ? `Remove ${c.name} from favorites` : `Add ${c.name} to favorites`}
                  aria-pressed={c.favorite}
                >
                  <Star className={`h-4 w-4 ${c.favorite ? 'fill-cova-warning text-cova-warning' : ''}`} aria-hidden="true" />
                  {c.favorite ? 'Favorite' : 'Add to favorites'}
                </button>
                <span className="text-xs text-cova-faint">Starred items stay visible across the account.</span>
              </div>
            </article>
          ))}
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
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <PageHeader
        icon={Calendar}
        title="Calendar"
        subtitle="Tasks by due date"
        actions={
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={prev} className="icon-btn border border-cova-border" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-[9.5rem] text-center text-sm font-medium text-cova-text" aria-live="polite">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={next} className="icon-btn border border-cova-border" aria-label="Next month">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        }
      />

      <div className="overflow-hidden rounded-card border border-cova-border bg-cova-surface shadow-card">
        <div className="grid grid-cols-7">
          {DAYS.map(d => (
            <div key={d} className="border-b border-cova-border bg-cova-elevated px-1 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-cova-faint sm:text-xs sm:py-2.5">
              {d}
            </div>
          ))}
          {calDays.map((day, i) => {
            if (!day) return <div key={'e' + i} className="min-h-[72px] border-b border-r border-cova-border/50 bg-cova-bg/40 sm:min-h-[112px]" />;
            const key = day.toISOString().split('T')[0];
            const dayTasks = tasksByDate[key] || [];
            return (
              <div
                key={key}
                className={`min-h-[72px] border-b border-r border-cova-border/50 p-1.5 transition-colors sm:min-h-[112px] sm:p-2 ${
                  isToday(day) ? 'bg-cova-primary/10' : 'hover:bg-cova-elevated/40'
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium sm:h-7 sm:w-7 ${
                    isToday(day) ? 'bg-cova-primary text-white' : 'text-cova-muted'
                  }`}
                >
                  {day.getDate()}
                </span>
                <div className="mt-1 hidden space-y-1 sm:block">
                  {dayTasks.slice(0, 3).map(t => (
                    <div
                      key={t.id}
                      className={`truncate rounded px-1.5 py-0.5 text-[11px] font-medium leading-tight text-white ${priorityBars[t.priority]}`}
                      title={t.title}
                    >
                      {t.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && <div className="px-1.5 text-[11px] text-cova-faint">+{dayTasks.length - 3} more</div>}
                </div>
                {dayTasks.length > 0 && (
                  <div className="mt-1 flex justify-center gap-1 sm:hidden" aria-label={`${dayTasks.length} task(s)`}>
                    {dayTasks.slice(0, 3).map(t => (
                      <span key={t.id} className={`h-1.5 w-1.5 rounded-full ${priorityBars[t.priority]}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-cova-muted">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cova-success" aria-hidden="true" /> Low priority</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cova-warning" aria-hidden="true" /> Medium priority</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cova-danger" aria-hidden="true" /> High priority</span>
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
