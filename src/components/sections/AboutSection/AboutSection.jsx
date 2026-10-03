function AboutSection() {
  const version = import.meta.env.VITE_APP_VERSION || '0.1.0';
  return (
    <section className="about-section">
      <div className="about-content">
        <h3>About Cova Vault</h3>
        <p>
          Cova Vault is a privacy-focused password manager designed for Android
          devices. Our mission is to provide secure, user-friendly cryptography
          to everyone, without compromises on privacy or security.
        </p>
        <p>
          All data is encrypted locally on your device. We never see your master
          password, your data, or any of your stored credentials. The application
          is open source, allowing anyone to audit the code and verify our
          security claims.
        </p>
        <div className="about-footer">
          <span>Version: {version}</span>
          <span>Built with ❤️ for the community</span>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;