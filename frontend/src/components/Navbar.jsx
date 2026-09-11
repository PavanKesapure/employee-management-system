import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onAdd }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo">👥</span>
        <div>
          <h1>Employee Management System</h1>
          <p>MERN Stack • MongoDB • Express • React • Node</p>
        </div>
      </div>
      <div className="nav-actions">
        <button className="btn btn-primary" onClick={onAdd}>
          + Add Employee
        </button>
        <button className="btn btn-toggle" onClick={toggleTheme} title="Toggle day/night mode">
          {theme === 'light' ? '🌙 Night' : '☀️ Day'}
        </button>
      </div>
    </nav>
  );
}
