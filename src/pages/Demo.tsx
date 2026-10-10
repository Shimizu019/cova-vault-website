import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Key, Wallet, PiggyBank, StickyNote, ListChecks,
  Folder, Star, Calendar, Clock, KeyRound, Activity, Settings, Lock, Info,
  Menu, X, ChevronDown, Search, User, LogOut, RotateCcw,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import DemoBanner from '../components/demo/DemoBanner';
import {
  DemoDashboardPage,
  DemoCredentialsPage,
  DemoWalletPage,
  DemoSavingsPage,
  DemoNotesPage,
  DemoTasksPage,
  DemoFoldersPage,
  DemoFavoritesPage,
  DemoCalendarPage,
  DemoSchedulePage,
  DemoGeneratorPage,
  DemoActivityPage,
  DemoSettingsPage,
  DemoLockPage,
  DemoAboutPage,
} from '../components/demo/DemoScreens';
import {
  createInitialDemoState,
  type DemoState,
  type DemoCredential,
  type DemoNote,
  type DemoTask,
  type DemoWallet,
  type DemoSavingGoal,
  type DemoFolder,
  type DemoActivity,
  type DemoWalletRecord,
} from '../data/demoData';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'credentials', label: 'Credentials', icon: Key },
  { id: 'wallet', label: 'My Wallet', icon: Wallet },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
] as const;

const SAMPLE_ITEMS = [
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'tasks', label: 'Tasks', icon: ListChecks },
  { id: 'folders', label: 'Folder', icon: Folder },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'generator', label: 'Password Generator', icon: KeyRound },
] as const;

const SECURITY_ITEMS = [
  { id: 'activity', label: 'Activity Log', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'lock', label: 'Lock Vault', icon: Lock },
  { id: 'about', label: 'About', icon: Info },
] as const;

type DemoNavId =
  | typeof NAV_ITEMS[number]['id']
  | typeof SAMPLE_ITEMS[number]['id']
  | typeof SECURITY_ITEMS[number]['id'];

function Demo() {
  const [state, setState] = useState<DemoState>(() => createInitialDemoState());
  const [activeNav, setActiveNav] = useState<DemoNavId>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFolder, setOpenFolder] = useState<DemoFolder | null>(null);
  const [locked, setLocked] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const resetDemo = useCallback(() => {
    setState(createInitialDemoState());
    setOpenFolder(null);
    setActiveNav('dashboard');
    setLocked(false);
  }, []);

  const addActivity = useCallback((text: string, type: DemoActivity['type'] = 'credentials') => {
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setState(prev => ({
      ...prev,
      activity: [...prev.activity, { id: `act-${Date.now()}`, text, timestamp, type }],
    }));
  }, []);

  const togglePassword = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      revealedPasswords: prev.revealedPasswords.includes(id)
        ? prev.revealedPasswords.filter(entry => entry !== id)
        : [...prev.revealedPasswords, id],
    }));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      credentials: prev.credentials.map(c =>
        c.id === id ? { ...c, favorite: !c.favorite } : c
      ),
    }));
  }, []);

  const addCredential = useCallback((cred: DemoCredential) => {
    setState(prev => ({ ...prev, credentials: [...prev.credentials, cred] }));
    addActivity(`Added credential "${cred.name}"`, 'credentials');
  }, [addActivity]);

  const addNote = useCallback((note: DemoNote) => {
    setState(prev => ({ ...prev, notes: [...prev.notes, note] }));
    addActivity(`Added note "${note.title}"`, 'notes');
  }, [addActivity]);

  const deleteNote = useCallback((id: string) => {
    setState(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== id) }));
  }, []);

  const addTask = useCallback((task: DemoTask) => {
    setState(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
    addActivity(`Created task "${task.title}"`, 'tasks');
  }, [addActivity]);

  const toggleTask = useCallback((id: string) => {
    setState(prev => {
      const task = prev.tasks.find(t => t.id === id);
      const newStatus = task?.status === 'done' ? 'todo' : 'done';
      if (task && newStatus === 'done') {
        addActivity(`Marked "${task.title}" complete`, 'tasks');
      }
      return {
        ...prev,
        tasks: prev.tasks.map(t =>
          t.id === id ? { ...t, status: newStatus } : t
        ),
      };
    });
  }, [addActivity]);

  const deleteTask = useCallback((id: string) => {
    setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  }, []);

  const addWallet = useCallback((wallet: DemoWallet) => {
    setState(prev => ({ ...prev, wallets: [...prev.wallets, wallet] }));
    addActivity(`Added wallet "${wallet.name}"`, 'wallet');
  }, [addActivity]);

  const addGoal = useCallback((goal: DemoSavingGoal) => {
    setState(prev => ({ ...prev, goals: [...prev.goals, goal] }));
    addActivity(`Created savings goal "${goal.name}"`, 'savings');
  }, [addActivity]);

  const deleteGoal = useCallback((id: string) => {
    setState(prev => ({ ...prev, goals: prev.goals.filter(g => g.id !== id) }));
  }, []);

  const createFolder = useCallback((name: string) => {
    const folder: DemoFolder = { id: `folder-${Date.now()}`, name };
    setState(prev => ({ ...prev, folders: [...prev.folders, folder] }));
    addActivity(`Created folder "${name}"`, 'credentials');
  }, [addActivity]);

  const deleteFolder = useCallback((id: string) => {
    setState(prev => ({ ...prev, folders: prev.folders.filter(f => f.id !== id) }));
  }, []);

  const openTasks = useMemo(() => state.tasks.filter(t => t.status !== 'done').length, [state.tasks]);

  const handleNavClick = (id: DemoNavId) => {
    setActiveNav(id);
    setOpenFolder(null);
    setMobileNavOpen(false);
  };

  const screenTitle = useMemo(() => {
    const all = [...NAV_ITEMS, ...SAMPLE_ITEMS, ...SECURITY_ITEMS];
    return all.find(item => item.id === activeNav)?.label ?? 'Dashboard';
  }, [activeNav]);

  const renderSidebarNav = () => (
    <>
      <div className="mb-5">
        <h3 className="px-3 mb-1.5 text-xs font-semibold text-cova-faint uppercase tracking-wider">Module</h3>
        <nav className="space-y-0.5" aria-label="Module navigation">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-cova-primary/15 text-cova-primary'
                  : 'text-cova-muted hover:bg-cova-elevated hover:text-cova-text'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mb-5">
        <h3 className="px-3 mb-1.5 text-xs font-semibold text-cova-faint uppercase tracking-wider">Sample</h3>
        <nav className="space-y-0.5" aria-label="Sample navigation">
          {SAMPLE_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-cova-primary/15 text-cova-primary'
                  : 'text-cova-muted hover:bg-cova-elevated hover:text-cova-text'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mb-5">
        <h3 className="px-3 mb-1.5 text-xs font-semibold text-cova-faint uppercase tracking-wider">Security</h3>
        <nav className="space-y-0.5" aria-label="Security navigation">
          {SECURITY_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-cova-primary/15 text-cova-primary'
                  : 'text-cova-muted hover:bg-cova-elevated hover:text-cova-text'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );

  const renderScreen = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <DemoDashboardPage
            credentials={state.credentials}
            notes={state.notes}
            tasks={state.tasks}
            openTasks={openTasks}
            activity={state.activity}
          />
        );
      case 'credentials':
        return (
          <DemoCredentialsPage
            credentials={state.credentials}
            revealed={state.revealedPasswords}
            onTogglePassword={togglePassword}
            onToggleFavorite={toggleFavorite}
            onAddCredential={addCredential}
          />
        );
      case 'wallet':
        return (
          <DemoWalletPage
            records={state.walletRecords}
            onAddWallet={addWallet}
            onReset={resetDemo}
          />
        );
      case 'savings':
        return (
          <DemoSavingsPage
            goals={state.goals}
            onCreateGoal={addGoal}
            onDeleteGoal={deleteGoal}
          />
        );
      case 'notes':
        return (
          <DemoNotesPage
            notes={state.notes}
            onCreateNote={addNote}
            onDeleteNote={deleteNote}
          />
        );
      case 'tasks':
        return (
          <DemoTasksPage
            tasks={state.tasks}
            onCreateTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        );
      case 'folders':
        return (
          <DemoFoldersPage
            credentials={state.credentials}
            notes={state.notes}
            tasks={state.tasks}
            folders={state.folders}
            onCreateFolder={createFolder}
            onDeleteFolder={deleteFolder}
            onOpenFolder={setOpenFolder}
            openFolder={openFolder}
            onBack={() => setOpenFolder(null)}
          />
        );
      case 'favorites':
        return (
          <DemoFavoritesPage
            credentials={state.credentials}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'calendar':
        return <DemoCalendarPage tasks={state.tasks} />;
      case 'schedule':
        return <DemoSchedulePage tasks={state.tasks} />;
      case 'generator':
        return <DemoGeneratorPage />;
      case 'activity':
        return <DemoActivityPage activity={state.activity} />;
      case 'settings':
        return <DemoSettingsPage />;
      case 'lock':
        return <DemoLockPage onUnlock={() => setLocked(false)} />;
      case 'about':
        return <DemoAboutPage />;
      default:
        return null;
    }
  };

  if (locked) {
    return (
      <>
        <SEO title="Locked" description="Demo vault is locked" />
        <section className="border-b border-cova-border py-16 lg:py-20">
          <Container>
            <DemoBanner />
            <div className="mt-8">
              <DemoLockPage onUnlock={() => setLocked(false)} />
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Try Demo"
        description="Explore an interactive preview of Cova Vault with fictional sample data. All modules available. Nothing is saved."
      />

      <section className="border-b border-cova-border py-8 lg:py-12">
        <Container>
          <DemoBanner />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Interactive preview" title="Try the Cova Vault demo" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-btn border border-cova-border bg-cova-surface px-4 text-sm font-semibold text-cova-text transition hover:border-cova-primary/50 hover:text-cova-primary"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset demo
              </button>
              <button
                type="button"
                onClick={() => setLocked(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-btn border border-cova-border bg-cova-surface px-4 text-sm font-semibold text-cova-text transition hover:border-cova-primary/50 hover:text-cova-primary"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                Lock
              </button>
            </div>
          </div>

          {/* App-like shell */}
          <div className="mt-6 rounded-card border border-cova-border bg-cova-bg overflow-hidden shadow-card">
            <div className="flex min-h-[600px]">
              {/* Desktop sidebar */}
              <aside className="hidden md:flex md:flex-col w-64 flex-shrink-0 bg-cova-surface border-r border-cova-border overflow-y-auto">
                <div className="px-4 py-5 border-b border-cova-border">
                  <p className="text-sm font-bold text-cova-text">Cova Vault</p>
                  <p className="text-xs text-cova-faint">Demo mode</p>
                </div>
                <div className="px-3 py-4 flex-1">
                  {renderSidebarNav()}
                </div>
                <div className="mx-3 mb-4 p-4 rounded-card bg-cova-primary/10 border border-cova-primary/30">
                  <h4 className="text-sm font-semibold text-cova-text mb-1">Upgrade Pro</h4>
                  <p className="text-xs text-cova-muted mb-3">Unlock 2FA, backup and more.</p>
                  <button
                    type="button"
                    onClick={() => addActivity('Viewed upgrade prompt', 'credentials')}
                    className="w-full text-xs py-1.5 rounded-btn bg-cova-primary hover:bg-cova-primaryHover text-white font-medium transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </aside>

              {/* Mobile drawer overlay */}
              {mobileNavOpen && (
                <div
                  className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileNavOpen(false)}
                  aria-hidden="true"
                />
              )}

              {/* Mobile drawer */}
              <div
                className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-cova-surface border-r border-cova-border transform transition-transform duration-300 ease-out ${
                  mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Demo navigation"
              >
                <div className="px-4 py-5 border-b border-cova-border flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-cova-text">Cova Vault</p>
                    <p className="text-xs text-cova-faint">Demo mode</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="p-2 rounded text-cova-muted hover:text-cova-text"
                    aria-label="Close navigation"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-3 py-4 overflow-y-auto h-[calc(100%-80px)]">
                  {renderSidebarNav()}
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 flex flex-col min-w-0">
                <header className="flex items-center gap-3 px-4 py-3 border-b border-cova-border bg-cova-surface">
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(true)}
                    className="md:hidden p-2 rounded text-cova-muted hover:text-cova-text"
                    aria-label="Open navigation"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cova-faint pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="input pl-9 pr-3 w-full"
                      aria-label="Search demo"
                    />
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-full hover:bg-cova-elevated transition-colors"
                      aria-label="User menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-cova-primary/15 flex items-center justify-center">
                        <User className="w-4 h-4 text-cova-primary" />
                      </div>
                      <ChevronDown className="w-3 h-3 text-cova-faint hidden sm:block" />
                    </button>
                    {userDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-card border border-cova-border bg-cova-surface shadow-card py-1 z-10">
                        <button
                          type="button"
                          onClick={() => { setUserDropdownOpen(false); setLocked(true); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-cova-muted hover:bg-cova-elevated hover:text-cova-text transition-colors text-left"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Lock Vault</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setUserDropdownOpen(false); resetDemo(); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-cova-danger hover:bg-cova-danger/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Reset Demo</span>
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                <div className="flex-1 overflow-auto bg-cova-bg">
                  {renderScreen()}
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
              <h2 className="text-base font-semibold text-cova-text">Ready for the real vault?</h2>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">
                The demo never leaves this page — your real credentials stay encrypted on your own Android device.
              </p>
              <div className="mt-4">
                <Button to="/download" variant="primary">
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
