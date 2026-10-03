function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Cova Vault</h3>
          <p>Secure password management for everyone.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/features">Features</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="/download">Download</a></li>
            <li><a href="/documentation">Documentation</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="#github">GitHub</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#discord">Discord</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cova Vault. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;