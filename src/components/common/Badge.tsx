interface BadgeProps {
  children: string;
  tone?: 'neutral' | 'success' | 'warning' | 'muted';
}

const tones: Record<string, string> = {
  neutral: 'border-cova-border bg-cova-elevated text-cova-muted',
  muted: 'border-transparent bg-cova-elevated text-cova-faint',
  success: 'border-cova-success/30 bg-cova-success/10 text-cova-success',
  warning: 'border-cova-warning/30 bg-cova-warning/10 text-cova-warning',
};

function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-badge border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default Badge;
