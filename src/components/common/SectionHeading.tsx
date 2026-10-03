interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignment}`}>
      <h2 className="text-3xl font-bold tracking-tight text-cova-text sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-relaxed text-cova-muted">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeading;
