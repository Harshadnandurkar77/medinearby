import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Plus,
  User,
} from "lucide-react";

export default function Signup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const next = {};

    if (!name.trim()) {
      next.name = "Enter your full name.";
    }

    if (!email.trim()) {
      next.email = "Enter your email.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      next.email =
        "Enter a valid email address.";
    }

    if (!password) {
      next.password =
        "Enter your password.";
    } else if (password.length < 6) {
      next.password =
        "Password must be at least 6 characters.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitError("");

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (password === "fail") {
        setSubmitError(
          "Something went wrong. Try again."
        );
      }
    }, 1100);
  };

  return (
    <div
      className="w-full max-w-sm rounded-3xl p-7 sm:p-8"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(14px)",
        border:
          "1px solid rgba(255,255,255,0.8)",
        boxShadow:
          "0 20px 50px rgba(37,99,235,0.12)",
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-700 flex items-center justify-center">
          <Plus
            size={18}
            className="text-white"
          />
        </div>

        <span className="text-lg font-semibold text-slate-800">
          MediNearby
        </span>
      </div>

      <h1 className="text-xl font-semibold text-slate-800">
        Create your account
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Get real-time medicine stock at pharmacies near you.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Full name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
              className={`w-full rounded-xl border bg-white/70 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600/40 ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
              placeholder="Your full name"
            />
          </div>

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              className={`w-full rounded-xl border bg-white/70 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600/40 ${
                errors.email
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
              placeholder="you@example.com"
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="signup-password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              className={`w-full rounded-xl border bg-white/70 pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600/40 ${
                errors.password
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() =>
                setShowPw((v) => !v)
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPw ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {submitError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="font-medium text-blue-700 hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}
