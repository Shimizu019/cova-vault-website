function SecuritySection() {
  const securityFeatures = [
    {
      icon: '🔐',
      title: 'Zero-Knowledge Architecture',
      description: 'Your data is encrypted before it leaves your device. Not even we can access your vault.'
    },
    {
      icon: '🔒',
      title: 'AES-256 Encryption',
      description: 'All stored data uses AES-256-GCM encryption. Keys derived with Argon2id.'
    },
    {
      icon: '🛡️',
      title: 'Biometric Unlock',
      description: 'Use fingerprint or face recognition to unlock your vault quickly and securely.'
    },
    {
      icon: '📱',
      title: 'Local-First Storage',
      description: 'No cloud accounts required. Your vault stays on your device, always private.'
    },
    {
      icon: '🔑',
      title: 'No Master Password Recovery',
      description: 'By design, there is no password reset. This ensures true zero-knowledge privacy.'
    },
    {
      icon: '🔍',
      title: 'Audited & Transparent',
      description: 'Open-source code that can be reviewed and verified by the community.'
    }
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Security & Privacy</h2>
        <p className="section-subtitle">
          Cova Vault is built with privacy and security at its core.
        </p>
      </div>

      <div className="grid grid-cols-3">
        {securityFeatures.map((feature) => (
          <div key={feature.title} className="card p-lg">
            <div className="security-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SecuritySection;