interface BadgeProps {
  children: string;
}

function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-cova-border bg-cova-elevated px-3 py-1 text-xs font-medium text-cova-muted">
      {children}
    </span>
  );
}

export default Badge;
