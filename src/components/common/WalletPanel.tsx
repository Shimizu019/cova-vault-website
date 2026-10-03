/**
 * Neutral visual representation of My Wallet as implemented by the Android app.
 *
 * Verified against the Android project: the wallet store keeps a
 * `startingBalance`, income/expense records and per-category budgets, and the
 * Dashboard shows a "My Wallet (month)" card with the resulting balance.
 * Amounts below are illustrative structure only — not real user data.
 */
function WalletPanel() {
  return (
    <div className="gradient-border rounded-card bg-cova-elevated p-5 shadow-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cova-text">My Wallet (October)</h3>
        <span className="text-xs text-cova-faint">Concept layout</span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-btn border border-cova-border bg-cova-surface px-4 py-3">
          <p className="text-xs text-cova-faint">Starting balance</p>
          <p className="mt-1 text-lg font-semibold text-cova-text">₱1,000</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-btn border border-cova-border bg-cova-surface px-4 py-3">
            <p className="text-xs text-cova-faint">Income this month</p>
            <p className="mt-1 text-lg font-semibold text-cova-text">₱2,500</p>
          </div>
          <div className="rounded-btn border border-cova-border bg-cova-surface px-4 py-3">
            <p className="text-xs text-cova-faint">Expenses this month</p>
            <p className="mt-1 text-lg font-semibold text-cova-text">₱1,450</p>
          </div>
        </div>

        <div className="rounded-btn border border-cova-border bg-cova-surface px-4 py-3">
          <p className="text-xs text-cova-faint">Budget · Food</p>
          <p className="mt-1 text-sm font-medium text-cova-text">₱800 of ₱1,000 spent</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cova-surface">
            <div className="progress-fill h-full w-4/5 rounded-full bg-gradient-to-r from-cova-primary to-cova-violet" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-btn border border-cova-primary/30 bg-cova-primary/10 px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-cova-accent">
            Wallet balance
          </span>
          <span className="text-lg font-semibold text-cova-text">₱2,050</span>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-cova-faint">
        Illustrative structure only. Amounts are examples, not real data. In the app, the balance
        comes from your starting balance plus income and expense records.
      </p>
    </div>
  );
}

export default WalletPanel;