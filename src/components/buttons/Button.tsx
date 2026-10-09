import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
}

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn font-semibold transition';
const variants: Record<Variant, string> = {
  primary: 'bg-cova-primary text-white hover:bg-cova-hover',
  secondary:
    'border border-cova-border bg-cova-surface text-cova-text hover:border-cova-primary/50 hover:text-cova-accent',
  ghost: 'text-cova-muted hover:bg-cova-elevated hover:text-cova-text',
};
const sizes: Record<Size, string> = {
  sm: 'px-3.5 text-xs',
  md: 'px-5 text-sm',
  lg: 'px-6 text-base',
};

function Button({ to, href, children, variant = 'primary', size = 'md', className = '', disabled = false }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;
  if (to && !disabled) return <Link to={to} className={classes}>{children}</Link>;
  if (href && !disabled) return <a href={href} className={classes}>{children}</a>;
  return <span aria-disabled={disabled} className={classes}>{children}</span>;
}

export default Button;