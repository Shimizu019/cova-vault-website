import type { ReactNode } from 'react';

interface ScreenshotFrameProps {
  /** Visible label for the frame */
  label?: string;
  /** Short honest note about placeholder status */
  note?: string;
  /** Optional path to a real screenshot under public/assets/images/screenshots/ */
  src?: string;
  /** Alt text for a real screenshot (ignored for placeholders) */
  alt?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Neutral structural frame for product previews.
 *
 * When a real screenshot is provided (via `src`, served from
 * public/assets/images/screenshots/), it is rendered with meaningful alt text.
 * When no `src` is given, an honest placeholder is shown — it never pretends
 * to be an actual application screenshot.
 *
 * To add real screenshots later:
 *   1. Place an image in public/assets/images/screenshots/
 *   2. Pass src="assets/images/screenshots/<file>" and alt="…"
 */
function ScreenshotFrame({
  label = 'Product preview',
  note = 'Structural placeholder — real app screenshots will be added in a later phase.',
  src,
  alt,
  children,
  className = '',
}: ScreenshotFrameProps) {
  const isReal = !!src;
  return (
    <figure className={`overflow-hidden rounded-panel border border-cova-border bg-cova-surface shadow-shot ${className}`}>
      {/* Window chrome — generic, not an imitation of the app UI */}
      <div className="flex items-center gap-2 border-b border-cova-border bg-cova-elevated px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-cova-faint/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-cova-faint/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-cova-faint/50" />
        <span className="ml-2 truncate text-xs text-cova-faint">{label}</span>
      </div>
      <div className="p-5 sm:p-6">
        {isReal ? (
          <img src={src} alt={alt || label} className="block w-full" loading="lazy" />
        ) : (
          children
        )}
      </div>
      <figcaption className="border-t border-cova-border px-4 py-3 text-xs leading-relaxed text-cova-faint sm:px-6">
        {isReal ? note || 'Real screenshot from the Cova Vault Android app.' : note}
      </figcaption>
    </figure>
  );
}

export default ScreenshotFrame;
