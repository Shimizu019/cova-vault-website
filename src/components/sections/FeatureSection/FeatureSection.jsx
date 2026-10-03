import features from '../../../data/features/features.json';

function FeatureSection() {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">What Can Cova Vault Do?</h2>
        <p className="section-subtitle">
          A comprehensive overview of Cova Vault's capabilities and features.
        </p>
      </div>

      <div className="grid grid-cols-2">
        {features.map((feature) => (
          <div key={feature.key} className="card p-lg">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
            <div className="feature-bullets">
              {feature.benefits.map((benefit) => (
                <span key={benefit}>{benefit}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;