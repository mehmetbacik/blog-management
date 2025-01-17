interface StatCardProps {
  value: number;
  label: string;
}

export const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className="admin__stat-card">
      <span className="admin__stat-value">{value}</span>
      <span className="admin__stat-label">{label}</span>
    </div>
  );
}; 