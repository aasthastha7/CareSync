import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import FormSection from "../components/ui/FormSection";
import ThreeDButton from "../components/ui/ThreeDButton";
import IconButton from "../components/ui/IconButton";

// Fictional shift data displayed on the card
const SHIFT = {
  patient: "Eleanor Smith",
  time: "7:00 AM – 3:00 PM",
  address: "142 Maple Drive",
  task: "Personal Care",
  duration: "2 hrs",
  priority: "High",
};

export default function DashboardScreen() {
  const { checkedInAt, checkInViaGPS } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Good Morning, Peter</h1>

      {/* Shift card */}
      <FormSection title="Current Shift">
        <p className="text-sm text-gray-600">
          <strong>Patient:</strong> {SHIFT.patient}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Time:</strong> {SHIFT.time}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {SHIFT.address}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Task:</strong> {SHIFT.task}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Duration:</strong> {SHIFT.duration}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Priority:</strong>{" "}
          <span className="font-semibold text-red-600">{SHIFT.priority}</span>
        </p>
      </FormSection>

      {/* GPS check-in */}
      <div className="mb-6 rounded-lg bg-white p-5 shadow text-center">
        <ThreeDButton
          label="Check in via GPS"
          onClick={checkInViaGPS}
          disabled={checkedInAt !== null}
        />
        {checkedInAt && (
          <p className="mt-3 text-sm text-green-700">
            ✅ Checked in at {checkedInAt}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Location is used only at check-in
        </p>
      </div>

      {/* Caregiver Support */}
      <FormSection title="Caregiver Support" subtitle="Need to request time off or swap a shift? We're here to help.">
        <ThreeDButton
          label="Open Wellbeing Support"
          variant="secondary"
          onClick={() => navigate("/wellbeing")}
        />
      </FormSection>

      {/* Navigation links */}
      <div className="flex flex-col gap-3">
        <IconButton
          label="Go to Care Plan"
          onClick={() => navigate("/care-plan")}
        />
      </div>
    </div>
  );
}
