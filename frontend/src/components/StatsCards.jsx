export default function StatsCards({ stats }) {
  if (!stats) return null;
  const cards = [
    { label: 'Total Employees', value: stats.total, icon: '👥', cls: 'blue' },
    { label: 'Active', value: stats.active, icon: '✅', cls: 'green' },
    { label: 'On Leave', value: stats.onLeave, icon: '⏸️', cls: 'yellow' },
    { label: 'Inactive', value: stats.inactive, icon: '⛔', cls: 'red' },
  ];
  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card ${c.cls}`}>
          <span className="stat-icon">{c.icon}</span>
          <div>
            <h3>{c.value}</h3>
            <p>{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
