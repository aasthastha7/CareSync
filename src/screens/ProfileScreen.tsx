import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ThreeDButton from "../components/ui/ThreeDButton";

export default function ProfileScreen() {
  const { clearAndLogout } = useAppContext();
  const navigate = useNavigate();

  function handleLogout() {
    clearAndLogout();
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Profile</h1>

      {/* Caregiver card */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
            👤
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Peter Okonkwo</h2>
            <p className="text-sm text-gray-500">Home Care Assistant</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
          <p className="text-gray-600">
            <strong>Email:</strong> peter.okonkwo@caresync.io
          </p>
          <p className="text-gray-600">
            <strong>Employee ID:</strong> CS-1042
          </p>
          <p className="text-gray-600">
            <strong>Region:</strong> North District
          </p>
        </div>
      </div>

      {/* Privacy & data */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          Privacy &amp; data
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• All data is kept in memory only and is not persisted.</li>
          <li>• Location is used only at check-in.</li>
          <li>• No biometric data is collected.</li>
          <li>• No reason is collected for wellbeing requests.</li>
        </ul>
      </div>

      {/* Logout */}
      <ThreeDButton
        label="Clear my data and log out"
        onClick={handleLogout}
      />
    </div>
  );
}
