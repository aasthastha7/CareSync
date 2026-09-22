import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STAFF } from "../data/staff";

export default function SearchScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? STAFF.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      {/* Back arrow */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      {/* Search field */}
      <div className="mb-6 flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow">
        <span className="text-gray-400">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search colleagues"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {/* Results */}
      {!query.trim() ? (
        <p className="text-center text-sm text-gray-400">Type a name to search</p>
      ) : filtered.length > 0 ? (
        <ul className="divide-y divide-gray-100 rounded-lg bg-white shadow">
          {filtered.map((s) => (
            <li key={s.id}>
              <Link
                to={`/staff/${s.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.role}</p>
                </div>
                <span className="text-gray-400">›</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-gray-400">No colleagues found</p>
      )}
    </div>
  );
}
