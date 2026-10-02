import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Plus,
} from "lucide-react";

function TextField({
  id,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  error,
  showToggle,
  onToggle,
  visible,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          name={id}
          type={
            showToggle
              ? visible
                ? "text"
                : "password"
              : type
          }
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : undefined
          }
          className={`w-full rounded-xl border bg-white/70 pl-10 ${
            showToggle ? "pr-10" : "pr-4"
          } py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 ${
            error
              ? "border-red-400"
              : "border-slate-200"
          }`}
          placeholder={
            type === "email"
              ? "you@example.com"
              : "••••••••"
          }
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={
              visible
                ? "Hide password"
                : "Show password"
            }
          >
            {visible ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function Login({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const next = {};

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
          "That email and password don't match."
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
        Welcome back
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Sign in to check medicine availability near you.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          error={errors.email}
          autoComplete="email"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          error={errors.password}
          showToggle
          visible={showPw}
          onToggle={() =>
            setShowPw((v) => !v)
          }
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs font-medium text-blue-700 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {submitError && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700"
          >
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
              Signing in…
            </>
          ) : (
            <>
              Log in
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New to MediNearby?{" "}
        <button
          type="button"
          onClick={onSignup}
          className="font-medium text-blue-700 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
