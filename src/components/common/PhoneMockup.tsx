import { Check, BatteryFull, Bell, Home, KeyRound, Receipt, Settings, Signal, StickyNote, Wifi } from 'lucide-react';
import BrandMark from './BrandMark';

/**
 * Illustrative Cova Vault dashboard preview, built entirely with CSS/SVG
 * (no external images). It is clearly labelled as a preview, and every amount
 * mirrors the example values already used in WalletPanel — it is never a real
 * screenshot and never real user data.
 */

const tasks = [
  { label: 'Review saved logins', done: true },
  { label: 'Plan the monthly budget', done: true },
  { label: 'Sort notes into folders', done: false },
];

const credentials = [
  { name: 'example.com', mark: 'E', tint: 'bg-sky-500/20 text-sky-300' },
  { name: 'mail.example.com', mark: 'M', tint: 'bg-violet-500/20 text-violet-300' },
  { name: 'shop.example.com', mark: 'S', tint: 'bg-amber-500/20 text-amber-300' },
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
      {/* Phone frame */}
      <div className="float-anim">
        <div className="gradient-border rounded-[2.75rem] bg-[#0b1a2d] p-2.5 shadow-float">
          <div className="overflow-hidden rounded-[2.2rem] bg-[#0a1524]">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pb-1 pt-3.5 text-[10px] font-semibold text-[#8fa6bf]">
              <span>9:41</span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <Signal className="h-3 w-3" />
                <Wifi className="h-3 w-3" />
                <BatteryFull className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* App bar */}
            <div className="flex items-center justify-between px-4 pb-3 pt-2">
              <span className="flex items-center gap-2">
                <BrandMark className="h-5 w-5" />
                <span className="text-[13px] font-bold tracking-tight text-[#eaf2fb]">Cova Vault</span>
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-[#8fa6bf]">
                <Bell className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Dashboard content */}
            <div className="space-y-2.5 px-4 pb-4">
              {/* Wallet balance card */}
              <div className="gradient-border rounded-2xl bg-[#12263a] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-[#93a9c2]">My Wallet (October)</span>
                  <span className="rounded-badge bg-[#2f80ff]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#6fb4ff]">
                    Balance
                  </span>
                </div>
                <p className="mt-1 text-2xl font-bold tracking-tight text-[#f2f7fd]">₱2,050</p>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[#0d1b2a] px-2.5 py-1.5">
                    <p className="text-[9px] text-[#8fa6bf]">Income</p>
                    <p className="text-[11px] font-semibold text-[#7ee0ad]">₱2,500</p>
                  </div>
                  <div className="rounded-lg bg-[#0d1b2a] px-2.5 py-1.5">
                    <p className="text-[9px] text-[#8fa6bf]">Expenses</p>
                    <p className="text-[11px] font-semibold text-[#ff8b9b]">₱1,450</p>
                  </div>
                </div>
              </div>

              {/* Task list */}
              <div className="rounded-2xl bg-[#12263a] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#eaf2fb]">Tasks</span>
                  <span className="text-[9px] text-[#8fa6bf]">2 of 3 done</span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {tasks.map((task) => (
                    <li key={task.label} className="flex items-center gap-2 rounded-lg bg-[#0d1b2a] px-2.5 py-1.5">
                      <span
                        className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border ${
                          task.done ? 'border-[#35d07f] bg-[#35d07f] text-[#06301d]' : 'border-[#3c5876]'
                        }`}
                      >
                        {task.done ? <Check className="h-2.5 w-2.5" strokeWidth={3.5} /> : null}
                      </span>
                      <span
                        className={`truncate text-[10px] ${
                          task.done ? 'text-[#7d93ab] line-through' : 'text-[#dbe7f4]'
                        }`}
                      >
                        {task.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Credentials list */}
              <div className="rounded-2xl bg-[#12263a] p-3.5">
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

            {/* Bottom navigation */}
            <div
              className="flex items-center justify-around border-t border-white/5 bg-[#0d1b2a] px-2 pb-4 pt-2.5"
              aria-hidden="true"
            >
              {navItems.map((item) => (
                <span
                  key={item.label}
                  className={`flex flex-col items-center gap-0.5 ${item.active ? 'text-[#4d9bff]' : 'text-[#5f748c]'}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-[8px] font-medium">{item.label}</span>
                </span>
              ))}
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
