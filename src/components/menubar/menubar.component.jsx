import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaLock, FaUser, FaKey, FaShieldAlt, FaList, FaPlus, FaInfoCircle } from 'react-icons/fa';
import './menubar.styles.scss';

const Menubar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaShieldAlt />, label: 'Dashboard' },
    { path: '/dashboard/all-passwords', icon: <FaList />, label: 'Passwords' },
    { path: '/dashboard/generate-passwords', icon: <FaKey />, label: 'Generate' },
    { path: '/dashboard/add-passwords', icon: <FaPlus />, label: 'Add' },
    { path: '/dashboard/password-health', icon: <FaShieldAlt />, label: 'Health' },
    { path: '/dashboard/info-docs', icon: <FaInfoCircle />, label: 'Info' },
  ];

  return (
    <div className="container">
      <div className="menubar-div">
        <Link to="/dashboard" className="m-logo">
          <FaLock />
          <span>SecurePass</span>
        </Link>
        
        <div className="navs">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        
        <Link to="/dashboard/user" className="user-pic">
          <FaUser />
        </Link>
      </div>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Menubar;