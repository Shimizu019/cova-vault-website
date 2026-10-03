function WhySection() {
  const reasons = [
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data stays on your device. No cloud sync, no accounts, no tracking.'
    },
    {
      icon: '🛡️',
      title: 'Security by Design',
      description: 'Built with modern encryption standards. AES-256, Argon2, and zero-knowledge architecture.'
    },
    {
      icon: '📱',
      title: 'Native Android',
      description: 'Designed specifically for Android with Material Design and native performance.'
    },
    {
      icon: '🔄',
      title: 'Open Source',
      description: 'Transparent development. Community-audited code you can trust and verify.'
    },
    {
      icon: '💾',
      title: 'Complete Ownership',
      description: 'Export, backup, and migrate your data anytime. No vendor lock-in.'
    },
    {
      icon: '🎯',
      title: 'All-in-One',
      description: 'Credentials, notes, tasks, finances, and calendar - one app for everything.'
    }
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Why Choose Cova Vault?</h2>
        <p className="section-subtitle">
          Built for people who value privacy, security, and complete control over their digital life.
        </p>
      </div>

      <div className="grid grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title} className="card p-lg">
            <div className="why-icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhySection;