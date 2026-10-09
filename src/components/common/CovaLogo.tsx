import covaLogo from '../../assets/images/CovaLogo.png';

interface CovaLogoProps {
  /** Sizing classes; the intrinsic 866×288 aspect ratio is always preserved. */
  className?: string;
  /**
   * Alt text. Defaults to the product name because the wordmark communicates
   * the brand. Pass `alt=""` only where a nearby element already conveys the
   * same information, to avoid redundant screen-reader announcements.
   */
  alt?: string;
}

/**
 * The official Cova Vault wordmark (src/assets/images/CovaLogo.png), loaded
 * through a Vite asset import so it is fingerprinted and cached with the build.
 * `object-contain` plus height-driven sizing keep the logo's original
 * proportions — it is never stretched, cropped, or recolored.
 */
function CovaLogo({ className = 'h-7 w-auto', alt = 'Cova Vault' }: CovaLogoProps) {
  return (
    <img
      src={covaLogo}
      alt={alt}
      width={866}
      height={288}
      decoding="async"
      className={`block object-contain ${className}`}
    />
  );
}

export default CovaLogo;
