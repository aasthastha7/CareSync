import { useParams, useNavigate } from "react-router-dom";
import { STAFF } from "../data/staff";

export default function AttendanceScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const staff = STAFF.find((s) => s.id === id);

  if (!staff) {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <p className="text-gray-500">Staff member not found.</p>
        <button
          onClick={() => navigate("/alerts")}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          ← Back to Alerts
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <button
        onClick={() => navigate(`/staff/${staff.id}`)}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Attendance History
      </h1>

      <div className="rounded-lg bg-white shadow">
        {staff.attendanceHistory.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-gray-100 px-5 py-3 last:border-b-0"
          >
            <span className="text-sm text-gray-700">{day.date}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                day.status === "Present"
                  ? "bg-green-100 text-green-700"
                  : day.status === "Late"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {day.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
