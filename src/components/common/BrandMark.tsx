interface BrandMarkProps {
  className?: string;
}

/**
 * Cova Vault brand mark — the real lock glyph from the Cova Vault Android app,
 * placed on a Cova brand tile. This component IS the single source of truth for
 * the lock path. To replace it with a different asset, replace the path in here.
 * The reference asset is also available at public/assets/brand/cova-mark.svg.
 */
function BrandMark({ className = 'h-7 w-7' }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#863bff" />
      <g transform="translate(14.4, 13.8) scale(0.8)">
        <path
          fill="#fff"
          d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.832L25.947 44.94z"
        />
      </g>
    </svg>
  );
}

export default BrandMark;
