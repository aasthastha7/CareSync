import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import FormSection from "../components/ui/FormSection";
import ThreeDButton from "../components/ui/ThreeDButton";
import IconButton from "../components/ui/IconButton";

const MOOD_OPTIONS = [
  { label: "Rough", emoji: "😞" },
  { label: "Okay", emoji: "😐" },
  { label: "Good", emoji: "🙂" },
  { label: "Great", emoji: "😊" },
];

const WELLNESS_TIPS = [
  {
    title: "Box Breathing (4-4-4-4)",
    body: "Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat three rounds to reset your nervous system between visits.",
  },
  {
    title: "The 2-Minute Gratitude Pause",
    body: "Before starting your car, think of one thing that went well on the last visit. Small reflections reduce cumulative stress.",
  },
  {
    title: "Peer Story: Sarah's Boundary Trick",
    body: "Sarah, a night-shift carer, keeps a 'done' list instead of a to-do list at the end of each shift. It helps her leave work at work.",
  },
];

export default function WellbeingScreen() {
  const { setWellbeingType, setSyncSource, moodToday, setMoodToday } =
    useAppContext();
  const navigate = useNavigate();

  const [crisisDismissed, setCrisisDismissed] = useState(false);
  const [crisisMessage, setCrisisMessage] = useState<string | null>(null);
  const [fatigueOpen, setFatigueOpen] = useState(false);
  const [fatigueType, setFatigueType] = useState<"Fatigue" | "Injury">("Fatigue");
  const [fatigueNote, setFatigueNote] = useState("");
  const [fatigueSubmitted, setFatigueSubmitted] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  function select(type: "mental-health" | "shift-swap") {
    setWellbeingType(type);
    setSyncSource("wellbeing");
    navigate("/sync");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      {/* 1. Header */}
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Caregiver Support
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Your wellbeing comes first. How can we help today?
      </p>

      {/* 2. Mood check-in */}
      <FormSection title="How are you feeling today?">
        <div className="flex gap-2">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.label}
              onClick={() => setMoodToday(option.label)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-sm font-medium transition ${
                moodToday === option.label
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">{option.emoji}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </FormSection>

      {/* 3. Crisis Support Line */}
      {!crisisDismissed && (
        <FormSection
          title="Crisis Support Line"
          subtitle="Free, confidential · Available 24/7"
          className="border-2 border-red-200 bg-red-50"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="mt-4">
                <ThreeDButton
                  label="Call Now"
                  onClick={() =>
                    setCrisisMessage(
                      "Demo only: a real app would connect you to your agency's crisis support line."
                    )
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setCrisisDismissed(true)}
              className="text-red-400 hover:text-red-600"
              aria-label="Dismiss crisis card"
            >
              ✕
            </button>
          </div>
          {crisisMessage && (
            <p className="mt-3 text-sm text-red-700">{crisisMessage}</p>
          )}
        </FormSection>
      )}

      {/* 4. Wellbeing Dashboard */}
      <FormSection title="Wellbeing Dashboard">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Rest Balance</span>
            <span className="text-gray-800">
              3 days{" "}
              <span className="text-xs text-gray-400">(Paid days available)</span>
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Shift Load</span>
            <span className="text-gray-800">
              Moderate{" "}
              <span className="text-xs text-gray-400">(3 of 5 shifts this week)</span>
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Hours This Week</span>
            <span className="text-gray-800">24h</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <span className="text-gray-500">Overtime</span>
            <span className="text-gray-800">0h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Next Day Off</span>
            <span className="text-gray-800">Fri</span>
          </div>
        </div>
      </FormSection>

      {/* 5. Quick Actions */}
      <h2 className="mb-3 text-lg font-semibold text-gray-700">
        Quick Actions
      </h2>

      {/* 5a. Request Mental Health Day */}
      <div className="mb-4">
        <IconButton
          label="Request Mental Health Day"
          variant="secondary"
          onClick={() => select("mental-health")}
        />
      </div>

      {/* 5b. Swap Upcoming Shift */}
      <div className="mb-4">
        <IconButton
          label="Swap Upcoming Shift"
          variant="secondary"
          onClick={() => select("shift-swap")}
        />
      </div>

      {/* 5c. Report Fatigue or Injury */}
      <FormSection
        title="Report Fatigue or Injury"
        subtitle="Notify your agency coordinator immediately."
      >
        <button
          onClick={() => {
            setFatigueOpen(!fatigueOpen);
            setFatigueSubmitted(false);
            setFatigueNote("");
            setFatigueType("Fatigue");
          }}
          className="w-full text-left"
        >
          <h3 className="text-lg font-semibold text-orange-700">
            Report Fatigue or Injury
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Notify your agency coordinator immediately.
          </p>
        </button>

        {fatigueOpen && !fatigueSubmitted && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="mb-3 flex gap-3">
              {(["Fatigue", "Injury"] as const).map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 cursor-pointer rounded-full py-2 text-center text-sm font-medium transition ${
                    fatigueType === opt
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="fatigue-type"
                    value={opt}
                    checked={fatigueType === opt}
                    onChange={() => setFatigueType(opt)}
                    className="hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <textarea
              value={fatigueNote}
              onChange={(e) => setFatigueNote(e.target.value)}
              placeholder="Optional note…"
              className="mb-3 w-full rounded border px-3 py-2 text-sm"
              rows={2}
            />
            <ThreeDButton
              label="Submit"
              onClick={() => setFatigueSubmitted(true)}
            />
          </div>
        )}

        {fatigueSubmitted && (
          <p className="mt-3 text-sm font-medium text-green-700">
            ✅ Your coordinator has been notified.
          </p>
        )}
      </FormSection>

      {/* 5d. Wellness Resources */}
      <FormSection
        title="Wellness Resources"
        subtitle="Guides, breathing exercises &amp; peer stories"
      >
        <button
          onClick={() => setResourcesOpen(!resourcesOpen)}
          className="w-full text-left"
        >
          <h3 className="text-lg font-semibold text-green-700">
            Wellness Resources
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Guides, breathing exercises &amp; peer stories
          </p>
        </button>

        {resourcesOpen && (
          <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
            {WELLNESS_TIPS.map((tip, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-gray-700">
                  {tip.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">{tip.body}</p>
              </div>
            ))}
          </div>
        )}
      </FormSection>

      <Link
        to="/dashboard"
        className="block text-center text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
