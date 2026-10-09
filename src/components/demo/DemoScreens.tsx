import { Check, Eye, EyeOff, KeyRound, StickyNote, ListChecks, Wallet, Activity, PiggyBank, Star } from 'lucide-react';
import {
  DEMO_WALLET_SUMMARY,
  formatPeso,
  type DemoActivity,
  type DemoCredential,
  type DemoNote,
  type DemoSavingGoal,
  type DemoTask,
  type DemoWalletRecord,
} from '../../data/demoData';

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

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof KeyRound;
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

export const TINT_BLUE = 'text-sky-400 light:text-sky-600 bg-sky-500/10 ring-1 ring-inset ring-sky-500/30';
export const TINT_TEAL = 'text-teal-400 light:text-teal-600 bg-teal-500/10 ring-1 ring-inset ring-teal-500/30';
export const TINT_GREEN = 'text-emerald-400 light:text-emerald-600 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/30';
export const TINT_INDIGO = 'text-indigo-400 light:text-indigo-600 bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/30';
export const TINT_FUCHSIA = 'text-fuchsia-400 light:text-fuchsia-600 bg-fuchsia-500/10 ring-1 ring-inset ring-fuchsia-500/30';
export const TINT_ROSE = 'text-rose-400 light:text-rose-600 bg-rose-500/10 ring-1 ring-inset ring-rose-500/30';
export const TINT_AMBER = 'text-amber-400 light:text-amber-600 bg-amber-500/10 ring-1 ring-inset ring-amber-500/30';

export function DemoDashboardPage(props: {
  credentials: DemoCredential[];
  notes: DemoNote[];
  tasks: DemoTask[];
  openTasks: number;
  activity: DemoActivity[];
}) {
  const favoriteCount = props.credentials.filter((credential) => credential.favorite).length;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={KeyRound} label="Credentials" value={String(props.credentials.length)} tint={TINT_BLUE} />
        <StatCard icon={StickyNote} label="Notes" value={String(props.notes.length)} tint={TINT_TEAL} />
        <StatCard icon={ListChecks} label="Open tasks" value={String(props.openTasks)} tint={TINT_GREEN} />
        <StatCard icon={Wallet} label="Wallet balance" value={formatPeso(DEMO_WALLET_SUMMARY.balance)} tint={TINT_INDIGO} />
      </div>
      <Panel title="Recent activity" hint="Sample feed">
        {props.activity.length === 0 ? (
          <p className="text-sm text-cova-faint">No activity yet — try completing a task.</p>
        ) : (
          <ul className="space-y-2.5">
            {props.activity.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 rounded-btn bg-cova-elevated px-4 py-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-btn ${TINT_ROSE}`} aria-hidden="true">
                  <Activity className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-cova-text">{entry.text}</span>
                  <span className="mt-0.5 block text-xs text-cova-faint">{entry.time}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs text-cova-faint">
          {favoriteCount} of {props.credentials.length} sample credentials are starred.
        </p>
      </Panel>
    </div>
  );
}

export function DemoCredentialsPage(props: {
  credentials: DemoCredential[];
  revealed: string[];
  onTogglePassword: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">Credentials</h3>
        <p className="text-xs text-cova-faint">{`${props.credentials.length} fictional entries`}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {props.credentials.map((credential) => {
          const shown = props.revealed.includes(credential.id);
          return (
            <li key={credential.id} className="rounded-card border border-cova-border bg-cova-elevated p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-cova-text">{credential.name}</p>
                <button
                  type="button"
                  onClick={() => props.onToggleFavorite(credential.id)}
                  aria-pressed={credential.favorite}
                  aria-label={credential.favorite ? `Unstar ${credential.name}` : `Star ${credential.name}`}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-btn transition ${
                    credential.favorite ? 'text-amber-400' : 'text-cova-faint hover:text-cova-text'
                  }`}
                >
                  <Star className="h-4 w-4" fill={credential.favorite ? 'currentColor' : 'none'} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-1 truncate font-mono text-xs text-cova-muted">{credential.username}</p>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-btn bg-cova-bg px-3 py-2">
                <code className="min-w-0 flex-1 truncate font-mono text-xs text-cova-text" aria-live="polite">
                  {shown ? credential.password : '••••••••••••'}
                </code>
                <button
                  type="button"
                  onClick={() => props.onTogglePassword(credential.id)}
                  aria-pressed={shown}
                  aria-label={shown ? `Hide password for ${credential.name}` : `Show password for ${credential.name}`}
                  className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-btn text-cova-muted transition hover:bg-cova-elevated hover:text-cova-text"
                >
                  {shown ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              <p className="mt-2 truncate text-xs text-cova-faint">{credential.website}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DemoTasksPage({ tasks, onToggle }: { tasks: DemoTask[]; onToggle: (id: string) => void }) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">Tasks</h3>
        <p className="text-xs text-cova-faint">Tap a row to toggle it</p>
      </div>
      <ul className="mt-4 space-y-2.5">
        {tasks.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              aria-pressed={task.done}
              className="flex w-full items-center gap-3 rounded-btn bg-cova-elevated px-4 py-3 text-left transition hover:bg-cova-elevated/70"
            >
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
                  task.done ? 'border-cova-success bg-cova-success text-white' : 'border-cova-border'
                }`}
              >
                {task.done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
              </span>
              <span className={`flex-1 text-sm ${task.done ? 'text-cova-faint line-through' : 'text-cova-text'}`}>
                {task.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DemoNotesPage({ notes }: { notes: DemoNote[] }) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">Notes</h3>
        <p className="text-xs text-cova-faint">{`${notes.length} fictional notes`}</p>
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <li key={note.id} className="rounded-card border border-cova-border bg-cova-elevated p-4">
            <p className="text-sm font-semibold text-cova-text">{note.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-cova-muted">{note.body}</p>
            <p className="mt-3 text-xs text-cova-faint">Updated {note.updated}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DemoWalletPage({ records }: { records: DemoWalletRecord[] }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
          <p className="text-xs text-cova-faint">Balance</p>
          <p className="mt-1 text-lg font-bold text-cova-text">{formatPeso(DEMO_WALLET_SUMMARY.balance)}</p>
        </div>
        <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
          <p className="text-xs text-cova-faint">Income</p>
          <p className="mt-1 text-lg font-bold text-cova-success">{formatPeso(DEMO_WALLET_SUMMARY.income)}</p>
        </div>
        <div className="rounded-card border border-cova-border bg-cova-surface p-4 shadow-card">
          <p className="text-xs text-cova-faint">Expenses</p>
          <p className="mt-1 text-lg font-bold text-cova-danger">{formatPeso(DEMO_WALLET_SUMMARY.expenses)}</p>
        </div>
      </div>
      <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold text-cova-text">PeraLog records</h3>
          <p className="text-xs text-cova-faint">Fictional entries</p>
        </div>
        <ul className="mt-4 space-y-2.5">
          {records.map((record) => (
            <li key={record.id} className="flex items-center gap-3 rounded-btn bg-cova-elevated px-4 py-3">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-btn ${record.type === 'income' ? TINT_GREEN : TINT_AMBER}`}
                aria-hidden="true"
              >
                <Wallet className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-cova-text">{record.description}</span>
                <span className="mt-0.5 block text-xs text-cova-faint">
                  {record.category} · {record.date}
                </span>
              </span>
              <span className={`shrink-0 font-mono text-sm font-semibold ${record.type === 'income' ? 'text-cova-success' : 'text-cova-danger'}`}>
                {record.type === 'income' ? '+' : '−'}{formatPeso(record.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DemoSavingsPage({ goals }: { goals: DemoSavingGoal[] }) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">Savings goals</h3>
        <p className="text-xs text-cova-faint">Illustrative progress</p>
      </div>
      <ul className="mt-4 space-y-4">
        {goals.map((goal) => {
          const progress = goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
          return (
            <li key={goal.id} className="rounded-card border border-cova-border bg-cova-elevated p-4">
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-btn ${TINT_FUCHSIA}`} aria-hidden="true">
                  <PiggyBank className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-cova-text">{goal.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-cova-muted">
                    {formatPeso(goal.current)} of {formatPeso(goal.target)} · {progress}%
                  </p>
                </div>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-cova-bg"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${goal.name} progress`}
              >
                <div className="h-full rounded-full bg-gradient-to-r from-cova-primary to-cova-violet" style={{ width: `${progress}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DemoActivityPage({ activity }: { activity: DemoActivity[] }) {
  return (
    <div className="rounded-card border border-cova-border bg-cova-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-cova-text">Activity</h3>
        <p className="text-xs text-cova-faint">Sample feed</p>
      </div>
      <ol className="relative mt-4 space-y-0 border-l border-cova-border pl-6">
        {activity.map((entry) => (
          <li key={entry.id} className="relative pb-5 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cova-bg bg-cova-border" />
            <p className="text-sm text-cova-text">{entry.text}</p>
            <p className="mt-0.5 text-xs text-cova-faint">{entry.time}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
