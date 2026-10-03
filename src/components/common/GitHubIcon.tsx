interface GitHubIconProps {
  className?: string;
}

/**
 * GitHub mark as an inline SVG (lucide dropped brand glyphs).
 * Decorative by default — pair it with a visible text label.
 */
function GitHubIcon({ className = 'h-4 w-4' }: GitHubIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.98 3.22 9.2 7.69 10.69.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.15a10.7 10.7 0 0 1 5.66 0c2.16-1.45 3.11-1.15 3.11-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54 4.46-1.49 7.68-5.71 7.68-10.69C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export default GitHubIcon;
