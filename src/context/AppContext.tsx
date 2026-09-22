import { createContext, useContext, useState, ReactNode } from "react";

// ---------- types ----------

export interface Task {
  id: number;
  label: string;
  done: boolean;
}

export interface Vitals {
  temp: string;
  pulse: string;
  bp: string;
}

export type WellbeingType = "mental-health" | "shift-swap" | null;
export type SyncStatus = "idle" | "syncing" | "success" | "failed";
export type SyncSource = "shift" | "wellbeing" | null;

export interface ChatMessage {
  id: string;
  sender: "caregiver" | "colleague";
  text: string;
  time: string;
}

interface AppState {
  // login
  isLoggedIn: boolean;
  login: () => void;
  clearAndLogout: () => void;

  // dashboard / gps
  checkedInAt: string | null;
  checkInViaGPS: () => void;

  // care plan
  tasks: Task[];
  toggleTask: (id: number) => void;
  vitals: Vitals;
  setVitals: (v: Vitals) => void;
  notes: string;
  setNotes: (n: string) => void;

  // wellbeing
  wellbeingType: WellbeingType;
  setWellbeingType: (t: WellbeingType) => void;
  moodToday: string | null;
  setMoodToday: (m: string | null) => void;

  // sync
  syncStatus: SyncStatus;
  triggerSync: () => void;
  resetSync: () => void;
  syncedAt: string | null;
  syncSource: SyncSource;
  setSyncSource: (s: SyncSource) => void;

  // staff edits
  staffEdits: Record<string, { email?: string; phone?: string }>;
  updateStaffDetails: (id: string, email: string, phone: string) => void;

  // chat
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (staffId: string, text: string) => void;

  // demo toggle
  simulateFailure: boolean;
  setSimulateFailure: (v: boolean) => void;
}

// ---------- context ----------

const AppContext = createContext<AppState | null>(null);

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}

// ---------- default data ----------

const DEFAULT_TASKS: Task[] = [
  { id: 1, label: "Check Blood Pressure", done: false },
  { id: 2, label: "Administer Morning Meds", done: false },
];

// ---------- provider ----------

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [vitals, setVitals] = useState<Vitals>({ temp: "", pulse: "", bp: "" });
  const [notes, setNotes] = useState("");
  const [wellbeingType, setWellbeingType] = useState<WellbeingType>(null);
  const [moodToday, setMoodToday] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [syncSource, setSyncSource] = useState<SyncSource>(null);

  const [staffEdits, setStaffEdits] = useState<Record<string, { email?: string; phone?: string }>>({});
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  function login() {
    setIsLoggedIn(true);
  }

  function updateStaffDetails(id: string, email: string, phone: string) {
    setStaffEdits((prev) => ({ ...prev, [id]: { email, phone } }));
  }

  function sendChatMessage(staffId: string, text: string) {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: "caregiver",
      text,
      time: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => ({
      ...prev,
      [staffId]: [...(prev[staffId] ?? []), msg],
    }));
  }

  function clearAndLogout() {
    setIsLoggedIn(false);
    setCheckedInAt(null);
    setTasks(DEFAULT_TASKS);
    setVitals({ temp: "", pulse: "", bp: "" });
    setNotes("");
    setWellbeingType(null);
    setSyncStatus("idle");
    setSimulateFailure(false);
    setSyncedAt(null);
    setSyncSource(null);
    setMoodToday(null);
    setStaffEdits({});
    setChatMessages({});
  }

  function checkInViaGPS() {
    const now = new Date();
    setCheckedInAt(now.toLocaleTimeString());
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function triggerSync() {
    setSyncStatus("syncing");
    // simulate a 2-second network call
    setTimeout(() => {
      // deterministic: fail only when demo toggle is on
      const ok = !simulateFailure;
      if (ok) setSyncedAt(new Date().toLocaleTimeString());
      setSyncStatus(ok ? "success" : "failed");
    }, 2000);
  }

  function resetSync() {
    setSyncStatus("idle");
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        clearAndLogout,
        checkedInAt,
        checkInViaGPS,
        tasks,
        toggleTask,
        vitals,
        setVitals,
        notes,
        setNotes,
        wellbeingType,
        setWellbeingType,
        moodToday,
        setMoodToday,
        syncStatus,
        triggerSync,
        resetSync,
        simulateFailure,
        setSimulateFailure,
        staffEdits,
        updateStaffDetails,
        chatMessages,
        sendChatMessage,
        syncedAt,
        syncSource,
        setSyncSource,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
