import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const base = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline-none';
const variants: Record<string, string> = {
  primary: 'bg-cova-primary px-5 py-3 text-sm text-white hover:bg-cova-accent',
  secondary: 'border border-cova-border bg-cova-surface px-5 py-3 text-sm text-cova-text hover:border-cova-accent',
  outline: 'border-2 border-cova-primary bg-transparent px-5 py-2.5 text-sm text-cova-accent hover:bg-cova-primary hover:text-white',
};
const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

function Button({ to, href, children, variant = 'primary', size = 'md', className = '', disabled = false }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;
  if (to && !disabled) return <Link to={to} className={classes}>{children}</Link>;
  if (href && !disabled) return <a href={href} className={classes}>{children}</a>;
  return <span aria-disabled={disabled} className={classes}>{children}</span>;
}

export default Button;
