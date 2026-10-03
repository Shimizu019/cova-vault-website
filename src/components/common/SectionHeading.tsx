interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  eyebrow?: string;
}

function SectionHeading({ title, subtitle, align = 'center', eyebrow }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cova-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-section-title font-bold text-cova-text">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-cova-muted">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeading;
