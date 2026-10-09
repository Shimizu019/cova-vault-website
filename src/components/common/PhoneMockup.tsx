import {
  ArrowDownRight,
  BatteryFull,
  CalendarDays,
  Home,
  KeyRound,
  PiggyBank,
  Receipt,
  Settings,
  ShieldCheck,
  Signal,
  StickyNote,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import lockLogo from '../../assets/images/lockLogo.png';

/**
 * Illustrative Cova Vault dashboard preview for the Android app, built with
 * CSS/SVG plus the official lock logo asset in the app header. The device is
 * a generic Android phone (punch-hole camera, gesture navigation) — never an
 * iPhone. Every amount mirrors the example values already used in WalletPanel
 * and every count is placeholder data: it is never a real screenshot and
 * never real user data.
 */

const credentials = [
  { name: 'example.com', mark: 'E', tint: 'bg-sky-500/20 text-sky-300' },
  { name: 'mail.example.com', mark: 'M', tint: 'bg-violet-500/20 text-violet-300' },
  { name: 'shop.example.com', mark: 'S', tint: 'bg-amber-500/20 text-amber-300' },
];

/** Quick-access tiles for the app's real dashboard modules (illustrative counts). */
const modules = [
  { label: 'Credentials', value: '12', icon: KeyRound, tint: 'text-[#6fb4ff]' },
  { label: 'Notes', value: '8', icon: StickyNote, tint: 'text-[#8b5cf6]' },
  { label: 'Tasks', value: '3', icon: CalendarDays, tint: 'text-[#7ee0ad]' },
  { label: 'Savings', value: '62%', icon: PiggyBank, tint: 'text-[#f5b942]' },
];

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'Credentials', icon: KeyRound, active: false },
  { label: 'Notes', icon: StickyNote, active: false },
  { label: 'PeraLog', icon: Receipt, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

function PhoneMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-[300px]" aria-label="Illustrative preview of the Cova Vault dashboard">
      {/* Android phone frame */}
      <div className="float-anim">
        <div className="relative">
          {/* Physical side buttons (volume rocker + power) on the right edge */}
          <span
            aria-hidden="true"
            className="absolute -right-[3px] top-[92px] h-14 w-[3px] rounded-r-full bg-gradient-to-b from-[#2a3f58] to-[#152536]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-[3px] top-[164px] h-8 w-[3px] rounded-r-full bg-gradient-to-b from-[#2a3f58] to-[#152536]"
          />

          {/* Frame: dark metal gradient with the brand gradient hairline and an inner highlight */}
          <div className="gradient-border rounded-[2.6rem] bg-gradient-to-b from-[#16273b] via-[#0e1c2e] to-[#0a1524] p-[3px] shadow-float">
            <div className="rounded-[2.35rem] bg-[#050b13] p-[7px]">
              {/* Screen */}
              <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1524]">
                {/* Punch-hole front camera — Android, not a notch or Dynamic Island */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[9px] z-20 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#04080f] ring-1 ring-white/10"
                />

                {/* Status bar (Android layout: clock left, indicators right) */}
                <div className="relative flex items-center justify-between px-5 pb-1 pt-[9px] text-[10px] font-semibold text-[#8fa6bf]">
                  <span className="tabular-nums">9:41</span>
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <Signal className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <BatteryFull className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* App header: identity + vault security status */}
                <div className="flex items-center justify-between px-4 pb-3 pt-1.5">
                  <span className="flex items-center gap-2">
                    <img src={lockLogo} alt="" width={510} height={489} className="h-6 w-6 object-contain" />
                    <span className="flex flex-col">
                      <span className="text-[13px] font-bold leading-tight tracking-tight text-[#eaf2fb]">Cova Vault</span>
                      <span className="text-[9px] font-medium leading-tight text-[#8fa6bf]">Personal vault</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1 rounded-badge bg-[#35d07f]/10 px-2 py-1 text-[9px] font-semibold text-[#7ee0ad]">
                    <ShieldCheck className="h-3 w-3" />
                    Unlocked
                  </span>
                </div>

                {/* Dashboard content */}
                <div className="space-y-2.5 px-4 pb-3">
                  {/* Wallet balance card */}
                  <div className="gradient-border rounded-2xl bg-gradient-to-br from-[#16304c] to-[#12263a] p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-[#93a9c2]">My Wallet (October)</span>
                      <span className="rounded-badge bg-[#2f80ff]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#6fb4ff]">
                        Balance
                      </span>
                    </div>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[#f2f7fd]">₱2,050</p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[#0d1b2a]/80 px-2.5 py-1.5">
                        <p className="flex items-center gap-1 text-[9px] text-[#8fa6bf]">
                          <TrendingUp className="h-2.5 w-2.5" />
                          Income
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold text-[#7ee0ad]">₱2,500</p>
                      </div>
                      <div className="rounded-lg bg-[#0d1b2a]/80 px-2.5 py-1.5">
                        <p className="flex items-center gap-1 text-[9px] text-[#8fa6bf]">
                          <ArrowDownRight className="h-2.5 w-2.5" />
                          Expenses
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold text-[#ff8b9b]">₱1,450</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick-access module tiles */}
                  <div className="grid grid-cols-4 gap-2">
                    {modules.map((module) => (
                      <div
                        key={module.label}
                        className="rounded-xl border border-white/5 bg-[#12263a] px-2 py-2"
                      >
                        <module.icon className={`h-3.5 w-3.5 ${module.tint}`} />
                        <p className="mt-1.5 text-[11px] font-bold leading-none text-[#eaf2fb]">{module.value}</p>
                        <p className="mt-1 truncate text-[8px] font-medium leading-none text-[#8fa6bf]">
                          {module.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Credentials list */}
                  <div className="rounded-2xl border border-white/5 bg-[#12263a] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#eaf2fb]">Credentials</span>
                      <span className="text-[9px] text-[#8fa6bf]">3 saved</span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {credentials.map((entry) => (
                        <li key={entry.name} className="flex items-center gap-2.5 rounded-lg bg-[#0d1b2a] px-2.5 py-1.5">
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md text-[9px] font-bold ${entry.tint}`}
                          >
                            {entry.mark}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-[#dbe7f4]">{entry.name}</span>
                          <span className="text-[10px] tracking-[0.15em] text-[#7d93ab]" aria-hidden="true">
                            ••••••••
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom navigation (Material-style: active pill behind the icon) */}
                <div
                  className="flex items-center justify-around border-t border-white/5 bg-[#0d1b2a]/95 px-2 pb-1 pt-2"
                  aria-hidden="true"
                >
                  {navItems.map((item) => (
                    <span key={item.label} className="flex flex-col items-center gap-1">
                      <span
                        className={`grid h-6 w-11 place-items-center rounded-full transition-colors ${
                          item.active ? 'bg-[#2f80ff]/15 text-[#6fb4ff]' : 'text-[#5f748c]'
                        }`}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`text-[8px] font-medium ${item.active ? 'text-[#6fb4ff]' : 'text-[#5f748c]'}`}
                      >
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Android gesture navigation indicator */}
                <div className="flex justify-center bg-[#0d1b2a]/95 pb-2" aria-hidden="true">
                  <span className="h-[3px] w-24 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping PeraLog budget card — hangs off the bottom-left corner so it never orphans text rows */}
      <div className="float-anim-slow absolute -left-4 bottom-3 w-40 rounded-card border border-white/10 bg-[#0f2035] p-4 shadow-float sm:-left-10 sm:bottom-4 sm:w-44">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold text-[#93a9c2]">PeraLog · Budget</span>
          <span className="text-[9px] text-[#7d93ab]">Food</span>
        </div>
        <p className="mt-1.5 text-xs font-semibold text-[#eaf2fb]">₱800 of ₱1,000 spent</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0a1524]">
          <div className="progress-fill h-full w-4/5 rounded-full bg-gradient-to-r from-[#2f80ff] to-[#8b5cf6]" />
        </div>
      </div>

      <figcaption className="mt-5 text-center text-xs leading-relaxed text-cova-faint">
        Illustrative UI preview — not a real screenshot.
      </figcaption>
    </figure>
  );
}

export default PhoneMockup;
