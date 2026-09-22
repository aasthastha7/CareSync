import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { STAFF } from "../data/staff";
import { useAppContext } from "../context/AppContext";
import ThreeDButton from "../components/ui/ThreeDButton";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-1.5">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-4 text-center shadow">
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function PercentRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function StaffProfileScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { staffEdits, updateStaffDetails } = useAppContext();

  const staff = STAFF.find((s) => s.id === id);

  const [editing, setEditing] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");
  const [phoneDraft, setPhoneDraft] = useState("");

  if (!staff) {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <p className="text-gray-500">Staff member not found.</p>
        <button onClick={() => navigate("/alerts")} className="mt-4 text-sm text-blue-600 hover:underline">← Back to Alerts</button>
      </div>
    );
  }

  const overrides = staffEdits[staff.id];
  const email = overrides?.email ?? staff.email;
  const phone = overrides?.phone ?? staff.phone;

  function startEdit() { setEmailDraft(email); setPhoneDraft(phone); setEditing(true); }
  function saveEdit() { if (staff) updateStaffDetails(staff.id, emailDraft, phoneDraft); setEditing(false); }

  const recentDays = staff.attendanceHistory.slice(0, 6);

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <button onClick={() => navigate("/alerts")} className="mb-4 text-sm text-blue-600 hover:underline">← Back</button>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{staff.name}</h1>
          <p className="text-sm text-gray-500">{staff.role}</p>
        </div>
        <ThreeDButton label="Send Message" onClick={() => navigate(`/chat/${staff.id}`)} />
      </div>

      {/* Personal details */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">Personal Details</h2>
          {!editing && <button onClick={startEdit} className="text-xs font-medium text-blue-600 hover:underline">Edit Details</button>}
        </div>
        {editing ? (
          <div className="space-y-3">
            <label className="block"><span className="text-xs text-gray-500">Email</span><input type="email" value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 text-sm" /></label>
            <label className="block"><span className="text-xs text-gray-500">Phone</span><input type="tel" value={phoneDraft} onChange={(e) => setPhoneDraft(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 text-sm" /></label>
            <div className="flex gap-2">
              <ThreeDButton label="Save" type="submit" onClick={saveEdit} />
              <ThreeDButton label="Cancel" variant="secondary" onClick={() => setEditing(false)} />
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <DetailRow label="Employee ID" value={staff.employeeId} />
            <DetailRow label="Email" value={email} />
            <DetailRow label="Phone" value={phone} />
            <DetailRow label="Date Joined" value={staff.dateJoined} />
            <DetailRow label="Employment Type" value={staff.employmentType} />
            <DetailRow label="Supervisor" value={staff.supervisor} />
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-700">Recent Activity</h2>
        <div className="space-y-2 text-sm">
          <DetailRow label="Last Activity" value={staff.lastActivity} />
          <DetailRow label="Last Login" value={staff.lastLogin} />
          <DetailRow label="Patients Attended" value={String(staff.patientsAttended)} />
          <DetailRow label="Current Status" value={staff.currentStatus} />
        </div>
      </div>

      {/* Stat boxes */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatBox label="Total Tasks" value={String(staff.totalTasks)} />
        <StatBox label="Average Time" value={staff.averageTime} />
        <StatBox label="Completion Rate" value={staff.completionRate} />
      </div>

      {/* Attendance Records */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Attendance Records</h2>

        <div className="mb-4 grid grid-cols-3 gap-3 text-center">
          <div><p className="text-2xl font-bold text-green-600">{staff.presentDays}</p><p className="text-xs text-gray-500">Present</p></div>
          <div><p className="text-2xl font-bold text-red-600">{staff.absentDays}</p><p className="text-xs text-gray-500">Absent</p></div>
          <div><p className="text-2xl font-bold text-yellow-600">{staff.lateDays}</p><p className="text-xs text-gray-500">Late</p></div>
        </div>

        <div className="mb-4 space-y-2">
          <PercentRow label="Present" value={staff.presentPercent} color="bg-green-500" />
          <PercentRow label="Punctuality" value={staff.punctualityPercent} color="bg-blue-500" />
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-gray-500">Last 6 days</p>
          <div className="flex flex-wrap gap-2">
            {recentDays.map((day, i) => (
              <span key={i} className={`rounded-full px-3 py-1 text-xs font-medium ${day.status === "Present" ? "bg-green-100 text-green-700" : day.status === "Late" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                {day.date.split(" ")[0]} {day.date.split(" ")[1]} — {day.status}
              </span>
            ))}
          </div>
        </div>

        <ThreeDButton label="View Attendance History" variant="secondary" onClick={() => navigate(`/staff/${staff.id}/attendance`)} />
      </div>
    </div>
  );
}