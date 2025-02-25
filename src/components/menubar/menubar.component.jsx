import { Link, Outlet } from 'react-router-dom';
import { FaLock, FaUser, FaKey, FaShieldAlt, FaList, FaPlus, FaInfoCircle } from 'react-icons/fa';
import './menubar.styles.scss';

const Menubar = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="logo">
          <FaLock className="logo-icon" />
          <h1>SecurePass</h1>
        </div>
        
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">
            <FaShieldAlt /> Dashboard
          </Link>
          <Link to="/dashboard/all-passwords" className="nav-item">
            <FaList /> All Passwords
          </Link>
          <Link to="/dashboard/generate-passwords" className="nav-item">
            <FaKey /> Generate Password
          </Link>
          <Link to="/dashboard/add-passwords" className="nav-item">
            <FaPlus /> Add Password
          </Link>
          <Link to="/dashboard/password-health" className="nav-item">
            <FaShieldAlt /> Password Health
          </Link>
          <Link to="/dashboard/user" className="nav-item">
            <FaUser /> Profile
          </Link>
          <Link to="/dashboard/info-docs" className="nav-item">
            <FaInfoCircle /> Info & Docs
          </Link>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Menubar;