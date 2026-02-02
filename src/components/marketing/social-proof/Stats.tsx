const stats = [
  {
    value: "₦500M+",
    label: "Trade value protected",
  },
  {
    value: "99.2%",
    label: "Successful transactions",
  },
  {
    value: "48h",
    label: "Average dispute resolution",
  },
  {
    value: "92%",
    label: "Average trust score",
  },
];

export function Stats() {
  return (
    <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border bg-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-primary">{stat.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
