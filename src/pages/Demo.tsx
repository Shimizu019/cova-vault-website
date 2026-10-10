import { useMemo, useState, useCallback, useEffect, useRef, type ComponentType } from 'react';
import {
  LayoutDashboard, Key, Wallet, PiggyBank, StickyNote, ListChecks,
  Folder, Star, Calendar, Clock, KeyRound, Activity, Settings, Lock, Info,
  Menu, X, ChevronDown, Search, User, LogOut, RotateCcw,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import CovaLogo from '../components/common/CovaLogo';
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

/** Every navigation destination available in the interactive demo. */
type DemoNavId =
  | 'dashboard'
  | 'credentials'
  | 'wallet'
  | 'savings'
  | 'notes'
  | 'tasks'
  | 'folders'
  | 'favorites'
  | 'calendar'
  | 'schedule'
  | 'generator'
  | 'activity'
  | 'settings'
  | 'lock'
  | 'about';

interface DemoNavItem {
  id: DemoNavId;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

/** Grouping mirrors the real app's PrimarySidebar: Module / Sample / Security. */
const NAV_GROUPS: ReadonlyArray<{ title: string; items: readonly DemoNavItem[] }> = [
  {
    title: 'Module',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'credentials', label: 'Credentials', icon: Key },
      { id: 'wallet', label: 'My Wallet', icon: Wallet },
      { id: 'savings', label: 'Savings', icon: PiggyBank },
    ],
  },
  {
    title: 'Sample',
    items: [
      { id: 'notes', label: 'Notes', icon: StickyNote },
      { id: 'tasks', label: 'Tasks', icon: ListChecks },
      { id: 'folders', label: 'Folder', icon: Folder },
      { id: 'favorites', label: 'Favorites', icon: Star },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'schedule', label: 'Schedule', icon: Clock },
      { id: 'generator', label: 'Password Generator', icon: KeyRound },
    ],
  },
  {
    title: 'Security',
    items: [
      { id: 'activity', label: 'Activity Log', icon: Activity },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'lock', label: 'Lock', icon: Lock },
      { id: 'about', label: 'About', icon: Info },
    ],
  },
];

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

  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (id: DemoNavId) => {
    setActiveNav(id);
    setOpenFolder(null);
    setMobileNavOpen(false);
    setUserDropdownOpen(false);
    // On narrow screens focus returns to the app header once the drawer closes.
    menuButtonRef.current?.focus();
  };

  // Escape closes the drawer / user menu and restores focus to the trigger.
  useEffect(() => {
    if (!mobileNavOpen && !userDropdownOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (mobileNavOpen) {
        setMobileNavOpen(false);
        menuButtonRef.current?.focus();
      }
      setUserDropdownOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileNavOpen, userDropdownOpen]);

  // Prevent the page behind the slide-in drawer from scrolling.
  useEffect(() => {
    if (!mobileNavOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileNavOpen]);

  // Move focus into the drawer as soon as it opens.
  useEffect(() => {
    if (!mobileNavOpen) return;
    drawerRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [mobileNavOpen]);

  // Close the profile menu when clicking or tapping outside of it.
  useEffect(() => {
    if (!userDropdownOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) setUserDropdownOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [userDropdownOpen]);

  const screenTitle = useMemo(() => {
    for (const group of NAV_GROUPS) {
      const match = group.items.find(item => item.id === activeNav);
      if (match) return match.label;
    }
    return 'Dashboard';
  }, [activeNav]);

  const renderNavItem = (item: DemoNavItem) => {
    const isActive = activeNav === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavClick(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
      >
        <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  const renderSidebarNav = () => (
    <div className="space-y-5">
      {NAV_GROUPS.map(group => (
        <div key={group.title}>
          <h3 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-cova-faint">
            {group.title}
          </h3>
          <nav className="space-y-0.5" aria-label={`${group.title} navigation`}>
            {group.items.map(renderNavItem)}
          </nav>
        </div>
      ))}
    </div>
  );

  /** Brand block shared by the desktop sidebar and the mobile drawer. */
  const renderBrand = (onClose?: () => void) => (
    <div className="flex items-center justify-between gap-3 border-b border-cova-border px-4 py-4">
      <div className="min-w-0">
        <CovaLogo className="h-6 w-auto" alt="Cova Vault" />
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-cova-faint">
          Demo mode
        </p>
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="icon-btn -mr-1 shrink-0"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
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
            wallets={state.wallets}
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
            wallets={state.wallets}
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
          <div className="mt-6 overflow-hidden rounded-card border border-cova-border bg-cova-bg shadow-card">
            <div className="flex min-h-[600px]">
              {/* Desktop sidebar */}
              <aside
                className="scroll-thin hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-cova-border bg-cova-surface md:flex"
                aria-label="Application navigation"
              >
                {renderBrand()}
                <div className="flex-1 px-3 py-4">{renderSidebarNav()}</div>
                <div className="mx-3 mb-4 rounded-card border border-cova-primary/30 bg-gradient-to-br from-cova-primary/15 to-cova-violet/15 p-4">
                  <span className="mb-2 grid h-8 w-8 place-items-center rounded-btn bg-cova-primary/25 text-cova-primary">
                    <Star className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h4 className="text-sm font-semibold text-cova-text">Upgrade Pro</h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-cova-muted">
                    Unlock 2FA, backup and more.
                  </p>
                  <button
                    type="button"
                    onClick={() => addActivity('Viewed upgrade prompt', 'credentials')}
                    className="btn btn-sm btn-primary mt-3 w-full"
                  >
                    Upgrade
                  </button>
                </div>
              </aside>

              {/* Mobile drawer overlay */}
              {mobileNavOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
                  onClick={() => setMobileNavOpen(false)}
                  aria-hidden="true"
                />
              )}

              {/* Mobile drawer */}
              <div
                id="demo-drawer"
                ref={drawerRef}
                className={`fixed inset-y-0 left-0 z-50 flex w-[min(17rem,82vw)] flex-col border-r border-cova-border bg-cova-surface transition-[transform,visibility] duration-300 ease-out md:hidden ${
                  mobileNavOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
                }`}
                role="dialog"
                aria-modal={mobileNavOpen ? 'true' : undefined}
                aria-label="Demo navigation"
              >
                {renderBrand(() => setMobileNavOpen(false))}
                <div className="scroll-thin flex-1 overflow-y-auto px-3 py-4">{renderSidebarNav()}</div>
              </div>

              {/* Main content area */}
              <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-cova-border bg-cova-surface px-3 py-2 sm:gap-3 sm:px-4">
                  <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setMobileNavOpen(true)}
                    className="icon-btn shrink-0 md:hidden"
                    aria-label="Open navigation"
                    aria-expanded={mobileNavOpen}
                    aria-controls="demo-drawer"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <p
                    className="min-w-0 flex-1 truncate text-sm font-semibold text-cova-text sm:flex-none"
                    title={screenTitle}
                  >
                    {screenTitle}
                  </p>

                  <div className="relative ml-auto hidden w-full max-w-[15rem] sm:block lg:max-w-xs">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cova-faint"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="input h-9 w-full py-0 pl-9 pr-3"
                      aria-label="Search demo"
                    />
                  </div>

                  <div ref={userMenuRef} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(open => !open)}
                      className="flex items-center gap-1.5 rounded-badge p-1 transition-colors hover:bg-cova-elevated"
                      aria-label="Profile menu"
                      aria-haspopup="menu"
                      aria-expanded={userDropdownOpen}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-cova-primary/15">
                        <User className="h-4 w-4 text-cova-primary" aria-hidden="true" />
                      </span>
                      <ChevronDown
                        className={`hidden h-3.5 w-3.5 text-cova-faint transition-transform sm:block ${
                          userDropdownOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {userDropdownOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 top-full z-30 mt-1.5 w-48 overflow-hidden rounded-card border border-cova-border bg-cova-surface py-1 shadow-dialog"
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => { setUserDropdownOpen(false); setLocked(true); }}
                          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-cova-muted transition-colors hover:bg-cova-elevated hover:text-cova-text"
                        >
                          <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>Lock Vault</span>
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => { setUserDropdownOpen(false); resetDemo(); }}
                          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-cova-danger transition-colors hover:bg-cova-danger/10"
                        >
                          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>Reset Demo</span>
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                <div className="scroll-thin min-w-0 flex-1 overflow-auto bg-cova-bg">
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
