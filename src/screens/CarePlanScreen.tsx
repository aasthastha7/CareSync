import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import FormSection from "../components/ui/FormSection";
import IconButton from "../components/ui/IconButton";
import InputField from "../components/ui/InputField";

export default function CarePlanScreen() {
  const { tasks, toggleTask, vitals, setVitals, notes, setNotes, setSyncSource } =
    useAppContext();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Eleanor's Care Plan</h1>

      {/* Task checklist */}
      <FormSection title="Tasks">
        {tasks.map((task) => (
          <label key={task.id} className="flex items-start gap-2 py-1">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            <div>
              <span className={task.done ? "line-through text-gray-400" : ""}>
                {task.label}
              </span>
              {task.label === "Administer Morning Meds" && (
                <p className="text-xs text-gray-500">
                  Lisinopril 10mg, Aspirin 81mg
                </p>
              )}
            </div>
          </label>
        ))}

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>
              {tasks.filter((t) => t.done).length} of {tasks.length} tasks
              complete
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  tasks.length > 0
                    ? (tasks.filter((t) => t.done).length / tasks.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </FormSection>

      {/* Vitals */}
      <FormSection title="Vitals">
        <div className="grid grid-cols-3 gap-3">
          <InputField
            label="Temp (°F)"
            type="number"
            value={vitals.temp}
            onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
            placeholder="98.6"
          />
          <InputField
            label="Pulse (bpm)"
            type="number"
            value={vitals.pulse}
            onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
            placeholder="72"
          />
          <InputField
            label="BP (mmHg)"
            value={vitals.bp}
            onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
            placeholder="120/80"
          />
        </div>
      </FormSection>

      {/* Notes */}
      <FormSection title="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
          rows={3}
          placeholder="Any observations or notes…"
        />
      </FormSection>

      {/* Quick-action buttons */}
      {/* <div className="mb-6 flex gap-3">
        <button className="flex-1 rounded bg-amber-500 py-2 text-white hover:bg-amber-600">
          ⚠️ Flag Concern
        </button>
        <button className="flex-1 rounded bg-sky-500 py-2 text-white hover:bg-sky-600">
          📦 Request Supplies
        </button>
      </div> */}

      {/* Demo toggle */}
      {/*{<label className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={simulateFailure}
          onChange={(e) => setSimulateFailure(e.target.checked)}
          className="mt-0.5"
        />
       Simulate sync failure (demo) 
      </label>*/}

      <IconButton
        label="Complete Shift & Log Data"
        onClick={() => {
          setSyncSource("shift");
          navigate("/sync");
        }}
      />
    </div>
  );
}
