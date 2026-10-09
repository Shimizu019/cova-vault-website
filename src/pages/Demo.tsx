import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, RotateCcw } from 'lucide-react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import DownloadCounter from '../components/common/DownloadCounter';
import DemoBanner from '../components/demo/DemoBanner';
import {
  DemoActivityPage,
  DemoCredentialsPage,
  DemoDashboardPage,
  DemoNotesPage,
  DemoSavingsPage,
  DemoTasksPage,
  DemoWalletPage,
} from '../components/demo/DemoScreens';
import { createInitialDemoState, type DemoState, type DemoTask } from '../data/demoData';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'credentials', label: 'Credentials' },
  { key: 'notes', label: 'Notes' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'wallet', label: 'Wallet' },
  { key: 'savings', label: 'Savings' },
  { key: 'activity', label: 'Activity' },
] as const;

type DemoNavKey = (typeof NAV_ITEMS)[number]['key'];

function Demo() {
  const [state, setState] = useState<DemoState>(() => createInitialDemoState());
  const [activeNav, setActiveNav] = useState<DemoNavKey>('dashboard');

  const resetDemo = () => setState(createInitialDemoState());

  const toggleTask = (id: string) => {
    setState((previous) => ({
      ...previous,
      tasks: previous.tasks.map((task): DemoTask =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    }));
  };

  const togglePassword = (id: string) => {
    setState((previous) => ({
      ...previous,
      revealedPasswords: previous.revealedPasswords.includes(id)
        ? previous.revealedPasswords.filter((entry) => entry !== id)
        : [...previous.revealedPasswords, id],
    }));
  };

  const toggleFavorite = (id: string) => {
    setState((previous) => ({
      ...previous,
      credentials: previous.credentials.map((credential) =>
        credential.id === id ? { ...credential, favorite: !credential.favorite } : credential,
      ),
    }));
  };

  const openTasks = useMemo(() => state.tasks.filter((task) => !task.done).length, [state.tasks]);

  const screenTitle = NAV_ITEMS.find((item) => item.key === activeNav)?.label ?? 'Dashboard';

  return (
    <>
      <SEO
        title="Try Demo"
        description="Explore an interactive preview of Cova Vault with fictional sample data — dashboard, credentials, notes, tasks, wallet, savings, and activity. Nothing is saved."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container>
          <DemoBanner />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Interactive preview" title="Try the Cova Vault demo" />
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-btn border border-cova-border bg-cova-surface px-4 text-sm font-semibold text-cova-text transition hover:border-cova-primary/50 hover:text-cova-accent"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset demo
            </button>
          </div>

          {/* DEMO-PART-2 */}
          <div className="mt-8">
            <label htmlFor="demo-screen" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cova-faint lg:hidden">
              Demo screen
            </label>
            <select
              id="demo-screen"
              value={activeNav}
              onChange={(event) => setActiveNav(event.target.value as DemoNavKey)}
              className="min-h-[44px] w-full rounded-card border border-cova-border bg-cova-surface px-4 text-sm font-semibold text-cova-text lg:hidden"
            >
              {NAV_ITEMS.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
              <nav aria-label="Demo screens" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
                <ul className="space-y-0.5 border-l border-cova-border">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => setActiveNav(item.key)}
                        aria-current={activeNav === item.key ? 'true' : undefined}
                        className={`-ml-px flex min-h-[40px] w-full items-center border-l-2 px-3 text-left text-sm font-medium transition ${
                          activeNav === item.key
                            ? 'border-cova-primary text-cova-accent'
                            : 'border-transparent text-cova-muted hover:border-cova-border hover:text-cova-text'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 px-3 text-xs leading-relaxed text-cova-faint">
                  All data on this page is fictional and resets on refresh.
                </p>
              </nav>

              <div className="min-w-0">
                <h2 className="sr-only">{screenTitle} preview</h2>
                {activeNav === 'dashboard' ? (
                  <DemoDashboardPage
                    credentials={state.credentials}
                    notes={state.notes}
                    tasks={state.tasks}
                    openTasks={openTasks}
                    activity={state.activity}
                  />
                ) : null}
                {activeNav === 'credentials' ? (
                  <DemoCredentialsPage
                    credentials={state.credentials}
                    revealed={state.revealedPasswords}
                    onTogglePassword={togglePassword}
                    onToggleFavorite={toggleFavorite}
                  />
                ) : null}
                {activeNav === 'notes' ? <DemoNotesPage notes={state.notes} /> : null}
                {activeNav === 'tasks' ? <DemoTasksPage tasks={state.tasks} onToggle={toggleTask} /> : null}
                {activeNav === 'wallet' ? <DemoWalletPage records={state.walletRecords} /> : null}
                {activeNav === 'savings' ? <DemoSavingsPage goals={state.goals} /> : null}
                {activeNav === 'activity' ? <DemoActivityPage activity={state.activity} /> : null}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
              <h2 className="text-base font-semibold text-cova-text">Ready for the real vault?</h2>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">
                The demo never leaves this page — your real credentials stay encrypted on your own Android device.
              </p>
              <div className="mt-4">
                <Button to="/download" variant="primary">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Cova Vault
                </Button>
              </div>
            </div>
            <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
              <h2 className="text-base font-semibold text-cova-text">Back to the website</h2>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">
                Return to the homepage, guides, and official download instructions.
              </p>
              <div className="mt-4">
                <Button to="/" variant="secondary">
                  Back to home
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Demo;
