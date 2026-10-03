import { Link } from 'react-router-dom';

// Navigation items
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Security', path: '/security' },
  { name: 'Download', path: '/download' },
  { name: 'Changelog', path: '/changelog' },
  { name: 'Documentation', path: '/documentation' },
  { name: 'About', path: '/about' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Cova Vault</span>
        </Link>

        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.name} className="navbar-nav-item">
              <Link to={link.path} className="navbar-nav-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link to="/download" className="btn btn-primary btn-sm">
            Get App
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;