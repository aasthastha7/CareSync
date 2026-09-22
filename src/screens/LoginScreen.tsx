import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ThreeDButton from "../components/ui/ThreeDButton";
import InputField from "../components/ui/InputField";

export default function LoginScreen() {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "" && consent;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    login();
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow"
      >
        <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">
          CareSync
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Caregiver-First Operating System
        </p>

        {/* Email */}
        <div className="mb-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Consent */}
        <label className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            I consent to the CareSync data policy
          </span>
        </label>

        {/* Submit */}
        <ThreeDButton
          type="submit"
          label="Log In"
          disabled={!canSubmit}
        />
      </form>
    </div>
  );
}
