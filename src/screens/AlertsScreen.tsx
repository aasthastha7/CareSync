const ALERTS = [
  {
    id: 1,
    icon: "📅",
    title: "Schedule updated",
    body: "Eleanor's visit starts at 8:00 AM instead of 9:00 AM tomorrow.",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: "💊",
    title: "Medication reminder",
    body: "Administer Lisinopril 10mg at the morning visit.",
    time: "1 hr ago",
  },
  {
    id: 3,
    icon: "📦",
    title: "Supplies restocked",
    body: "Gloves and wipes have been restocked at Eleanor's address.",
    time: "Yesterday",
  },
];

export default function AlertsScreen() {
  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Alerts</h1>

      <div className="flex flex-col gap-3">
        {ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="rounded-lg bg-white p-4 shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{alert.icon}</span>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-700">
                  {alert.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{alert.body}</p>
                <p className="mt-2 text-xs text-gray-400">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
