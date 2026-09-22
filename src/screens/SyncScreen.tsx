import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import FormSection from "../components/ui/FormSection";
import ThreeDButton from "../components/ui/ThreeDButton";

export default function SyncScreen() {
  const { syncStatus, triggerSync, resetSync, wellbeingType, simulateFailure, setSimulateFailure, syncedAt, checkedInAt, tasks, syncSource } =
    useAppContext();
  const navigate = useNavigate();

  // auto-trigger sync when the screen loads (if idle)
  useEffect(() => {
    if (syncStatus === "idle") {
      triggerSync();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Source-aware syncing label
  const syncingLabel =
    syncSource === "wellbeing"
      ? wellbeingType === "mental-health"
        ? "Mental Health Day request"
        : "Shift Swap request"
      : "shift data";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Syncing spinner */}
      {syncStatus === "syncing" && (
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="text-gray-600">Syncing your {syncingLabel}…</p>
        </div>
      )}

      {/* Success — Shift */}
      {syncStatus === "success" && syncSource === "shift" && (
        <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow">
          <p className="mb-2 text-4xl">✅</p>
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            Shift Completed
          </h1>
          <span className="mb-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Shift Logged Successfully
          </span>
          <p className="mb-6 text-sm text-gray-600">
            Eleanor Smith's care plan was successfully executed.
          </p>

          {/* Shift Summary card */}
          <FormSection title="Shift Summary" className="mb-6 border border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Shift Summary</span>
              <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                Synced
              </span>
            </div>

            {checkedInAt && (
              <div className="flex justify-between border-t border-gray-200 py-2">
                <span className="text-xs text-gray-500">Location</span>
                <span className="text-xs text-gray-700">Verified via GPS</span>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 py-2">
              <span className="text-xs text-gray-500">Clinical Tasks</span>
              <span className="text-xs text-gray-700">
                {tasks.filter((t) => t.done).length} / {tasks.length} Completed
              </span>
            </div>

            <div className="flex justify-between border-t border-gray-200 py-2">
              <span className="text-xs text-gray-500">EHR Sync</span>
              <span className="text-xs text-gray-700">
                Successful at {syncedAt}
              </span>
            </div>
          </FormSection>

          <ThreeDButton
            label="Return to Daily Schedule"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      )}

      {/* Success — Wellbeing */}
      {syncStatus === "success" && syncSource === "wellbeing" && (
        <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow">
          <p className="mb-2 text-4xl">✅</p>
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            {wellbeingType === "mental-health"
              ? "Mental Health Day Requested"
              : "Shift Swap Requested"}
          </h1>
          <span className="mb-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Request Submitted
          </span>
          <p className="mb-6 text-sm text-gray-600">
            {wellbeingType === "mental-health"
              ? "Your request has been sent to the coordinator. No reason is needed. You will be notified once it is confirmed."
              : "Your request has been sent to the coordinator. You will be notified once peer coverage is found."}
          </p>

          <ThreeDButton
            label="Back to Dashboard"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      )}

      {/* Failure */}
      {syncStatus === "failed" && (
        <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow">
          <p className="mb-2 text-4xl">❌</p>
          <h1 className="mb-2 text-xl font-bold text-red-700">
            {syncSource === "wellbeing" ? "Request Failed" : "Sync Failed"}
          </h1>
          <p className="mb-6 text-sm text-gray-600">
            {syncSource === "wellbeing"
              ? "Request failed. Please try again."
              : "Something went wrong. Please try again."}
          </p>
          <div className="flex flex-col gap-3">
            {/* Demo toggle */}
            <label className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="mt-0.5"
              />
              Simulate sync failure (demo)
            </label>

            <ThreeDButton
              label="Retry"
              onClick={() => {
                resetSync();
                // small delay so state resets before re-triggering
                setTimeout(triggerSync, 100);
              }}
            />
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-blue-600 hover:underline"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
