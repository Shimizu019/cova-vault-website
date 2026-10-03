import Container from '../common/Container';
import Button from '../buttons/Button';
import WalletPanel from '../common/WalletPanel';

function MoneySection() {
  return (
    <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cova-accent">PeraLog · My Wallet</p>
          <h2 className="mt-3 text-section-title font-bold text-cova-text">Money, kept alongside everything else</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cova-muted">
            PeraLog tracks income and expenses with a monthly summary, category breakdown, budgets, and a
            balance card. My Wallet carries those records into a single current-month balance on the
            Dashboard, starting from the balance you set up.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-cova-muted">
            <li>· Income and expense records with categories</li>
            <li>· Monthly summary, category breakdown, and budgets</li>
            <li>· Cash payments with an optional change calculation</li>
            <li>· Current-month wallet balance on the Dashboard</li>
          </ul>
          <div className="mt-7">
            <Button to="/features" variant="secondary">
              See all features
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <WalletPanel />
        </div>
      </Container>
    </section>
  );
}

export default MoneySection;