import React, { useState, useEffect } from "react";
import { Eye, EyeOff, MapPin, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

const INTRO_DURATION_MS = 1950;

export default function MediNearbyAuth() {
  const [stage, setStage] = useState("intro"); // 'intro' | 'auth'
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    if (stage !== "intro") return;
    setIntroReady(false);
    const t = setTimeout(() => setIntroReady(true), INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [stage, animKey]);

  const replay = () => setAnimKey((k) => k + 1);
  const goToAuth = () => setStage("auth");
  const backToIntro = () => {
    setStage("intro");
    setDone(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1100);
  };

  const switchMode = (m) => {
    setMode(m);
    setDone(false);
    setShowPass(false);
  };

  return (
    <div className="mn-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .mn-root {
          --ink: #1C2A20;
          --paper: #EFE9D8;
          --amber: #C97A2B;
          --amber-soft: #E3A15C;
          --moss: #4C7358;
          --moss-deep: #35533F;
          --cream: #F4EFE0;
          font-family: 'Inter', sans-serif;
          width: 100%;
          min-height: 100vh;
          display: flex;
          color: var(--ink);
        }

        @keyframes mn-fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        /* ---------- intro stage ---------- */
        .mn-intro {
          width: 100%;
          min-height: 100vh;
          background: var(--ink);
          color: var(--cream);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          text-align: center;
          animation: mn-fadein 0.4s ease-out;
          position: relative;
        }
        .mn-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 600;
          position: absolute;
          top: 32px;
          left: 40px;
        }
        .mn-logo svg { color: var(--amber-soft); }

        .mn-illustration { width: 100%; max-width: 300px; }
        .mn-illustration svg { width: 100%; height: auto; }

        .mn-copy { margin-top: 6px; }
        .mn-copy h1 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(26px, 4vw, 36px);
          line-height: 1.16;
          margin: 0 auto 12px auto;
          max-width: 16ch;
        }
        .mn-copy p {
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(244,239,224,0.7);
          max-width: 40ch;
          margin: 0 auto 26px auto;
        }

        .mn-intro-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          height: 44px;
        }
        .mn-continue {
          background: var(--amber-soft);
          color: var(--ink);
          border: none;
          border-radius: 999px;
          padding: 12px 26px;
          font-size: 14.5px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          opacity: 0;
          animation: mn-fadein 0.4s ease-out forwards;
          transition: background 0.2s ease;
        }
        .mn-continue:hover { background: #f0b578; }
        .mn-replay {
          background: none;
          border: none;
          color: rgba(244,239,224,0.55);
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          opacity: 0;
          animation: mn-fadein 0.4s ease-out forwards;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ---------- auth stage ---------- */
        .mn-authpage {
          width: 100%;
          min-height: 100vh;
          background: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          animation: mn-fadein 0.35s ease-out;
          position: relative;
        }
        .mn-back {
          position: absolute;
          top: 28px;
          left: 28px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: rgba(28,42,32,0.55);
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
        }
        .mn-back:hover { color: var(--ink); }

        .mn-card {
          width: 100%;
          max-width: 400px;
          background: var(--cream);
          border: 1px solid rgba(28,42,32,0.1);
          border-radius: 16px;
          padding: 40px 36px;
        }
        .mn-card-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 26px;
        }
        .mn-card-logo svg { color: var(--amber); }

        .mn-tabs {
          position: relative;
          display: flex;
          gap: 28px;
          border-bottom: 1px solid rgba(28,42,32,0.14);
          margin-bottom: 28px;
        }
        .mn-tab {
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 0 0 14px 0;
          cursor: pointer;
          color: rgba(28,42,32,0.42);
          transition: color 0.2s ease;
        }
        .mn-tab.active { color: var(--ink); }
        .mn-tab-indicator {
          position: absolute;
          bottom: -1px;
          height: 2px;
          background: var(--amber);
          width: 60px;
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
        }

        .mn-field { margin-bottom: 20px; }
        .mn-field label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(28,42,32,0.6);
          margin-bottom: 7px;
        }
        .mn-input-wrap { position: relative; }
        .mn-field input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid rgba(28,42,32,0.22);
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 15.5px;
          color: var(--ink);
          padding: 6px 30px 9px 2px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .mn-field input:focus { border-color: var(--amber); }
        .mn-eye {
          position: absolute;
          right: 0;
          top: 3px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(28,42,32,0.45);
          padding: 4px;
        }

        .mn-forgot {
          display: block;
          text-align: right;
          font-size: 13px;
          color: var(--moss-deep);
          text-decoration: none;
          margin: -8px 0 22px 0;
        }
        .mn-forgot:hover { text-decoration: underline; }

        .mn-submit {
          width: 100%;
          background: var(--ink);
          color: var(--cream);
          border: none;
          border-radius: 8px;
          padding: 14px 0;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease;
        }
        .mn-submit:hover { background: var(--moss-deep); }
        .mn-submit:disabled { opacity: 0.75; cursor: default; }

        .mn-switchline {
          text-align: center;
          font-size: 13.5px;
          color: rgba(28,42,32,0.6);
          margin-top: 22px;
        }
        .mn-switchline button {
          background: none;
          border: none;
          color: var(--moss-deep);
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          font-size: 13.5px;
        }

        .mn-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          padding: 10px 0 4px 0;
        }
        .mn-success svg { color: var(--moss-deep); }
        .mn-success h3 { font-family: 'Fraunces', serif; font-size: 22px; margin: 0; }
        .mn-success p { font-size: 14.5px; color: rgba(28,42,32,0.65); margin: 0; }
        .mn-success button {
          margin-top: 6px;
          background: none;
          border: 1px solid rgba(28,42,32,0.25);
          padding: 9px 16px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ---------- hero animation timeline (fast) ---------- */
        .mn-bottle {
          transform-box: fill-box;
          transform-origin: 140px 42px;
          animation: mn-tilt 0.5s ease-out forwards, mn-untilt 0.35s ease-in forwards 1.15s;
        }
        @keyframes mn-tilt { from { transform: rotate(0deg); } to { transform: rotate(25deg); } }
        @keyframes mn-untilt { from { transform: rotate(25deg); } to { transform: rotate(0deg); } }

        .mn-stream {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          opacity: 0;
          animation: mn-appear 0.01s forwards 0.42s, mn-draw 0.58s ease-in forwards 0.42s, mn-fadeout 0.14s ease-in forwards 1.1s;
        }
        @keyframes mn-appear { to { opacity: 1; } }
        @keyframes mn-draw { to { stroke-dashoffset: 0; } }
        @keyframes mn-fadeout { to { opacity: 0; } }

        .mn-drip { opacity: 0; animation: mn-drip-move 0.5s ease-in forwards; }
        .mn-drip1 { animation-delay: 0.5s; }
        .mn-drip2 { animation-delay: 0.68s; }
        @keyframes mn-drip-move {
          0% { opacity: 0; transform: translateY(0); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateY(70px); }
        }

        .mn-fillgroup {
          transform-box: fill-box;
          transform-origin: bottom;
          transform: scaleY(0);
          animation: mn-fill 0.58s ease-out forwards 0.44s, mn-pulse 0.22s ease-in-out forwards 1.02s, mn-fillout 0.12s ease-in forwards 1.15s;
        }
        @keyframes mn-fill { to { transform: scaleY(1); } }
        @keyframes mn-pulse { 0% { transform: scaleY(1) scale(1); } 50% { transform: scaleY(1) scale(1.07); } 100% { transform: scaleY(1) scale(1); } }
        @keyframes mn-fillout { to { opacity: 0; } }

        .mn-half { transform-box: fill-box; opacity: 0; }
        .mn-half-left {
          transform-origin: right center;
          animation: mn-half-in 0.01s forwards 1.18s, mn-split-left 0.45s cubic-bezier(.3,.8,.4,1) forwards 1.2s;
        }
        .mn-half-right {
          transform-origin: left center;
          animation: mn-half-in 0.01s forwards 1.18s, mn-split-right 0.45s cubic-bezier(.3,.8,.4,1) forwards 1.2s;
        }
        @keyframes mn-half-in { to { opacity: 1; } }
        @keyframes mn-split-left { 0% { transform: translate(0,0) rotate(0deg); } 100% { transform: translate(-34px,4px) rotate(-16deg); } }
        @keyframes mn-split-right { 0% { transform: translate(0,0) rotate(0deg); } 100% { transform: translate(34px,4px) rotate(16deg); } }

        .mn-pin {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.4);
          animation: mn-pin-in 0.32s cubic-bezier(.3,.8,.4,1.4) forwards 1.5s, mn-pin-bob 2.2s ease-in-out infinite 1.9s;
        }
        @keyframes mn-pin-in { to { opacity: 1; transform: scale(1); } }
        @keyframes mn-pin-bob { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-5px) scale(1); } }
      `}</style>

      {stage === "intro" && (
        <div className="mn-intro">
          <div className="mn-logo">
            <MapPin size={18} strokeWidth={2.4} />
            MediNearby
          </div>

          <div className="mn-illustration">
            <svg key={animKey} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="mn-pill-clip">
                  <path d="M160,270 H240 A30,30 0 0 1 240,330 H160 A30,30 0 0 1 160,270 Z" />
                </clipPath>
              </defs>

              <path
                d="M160,270 H240 A30,30 0 0 1 240,330 H160 A30,30 0 0 1 160,270 Z"
                fill="none"
                stroke="rgba(244,239,224,0.28)"
                strokeWidth="2"
              />

              <g clipPath="url(#mn-pill-clip)" className="mn-fillgroup">
                <rect x="130" y="270" width="140" height="60" fill="#C97A2B" />
              </g>

              <path className="mn-half mn-half-left" d="M200,270 H160 A30,30 0 0 0 160,330 H200 Z" fill="#C97A2B" />
              <path className="mn-half mn-half-right" d="M200,270 H240 A30,30 0 0 1 240,330 H200 Z" fill="#4C7358" />

              <g className="mn-pin">
                <path
                  d="M200,318 C189,301 184,295 184,284 A16,16 0 1 1 216,284 C216,295 211,301 200,318 Z"
                  fill="#F4EFE0"
                />
                <circle cx="200" cy="284" r="6" fill="#1C2A20" />
              </g>

              <path
                className="mn-stream"
                d="M140,42 Q118,160 200,268"
                fill="none"
                stroke="#C97A2B"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle className="mn-drip mn-drip1" cx="150" cy="120" r="4" fill="#E3A15C" />
              <circle className="mn-drip mn-drip2" cx="175" cy="190" r="4" fill="#E3A15C" />

              <g className="mn-bottle">
                <rect x="100" y="60" width="80" height="90" rx="14" fill="rgba(201,122,43,0.25)" stroke="#E3A15C" strokeWidth="2" />
                <rect x="128" y="40" width="24" height="22" fill="rgba(201,122,43,0.25)" stroke="#E3A15C" strokeWidth="2" />
                <rect x="122" y="26" width="36" height="16" rx="4" fill="#4C7358" />
                <rect x="107" y="96" width="66" height="26" rx="2" fill="#F4EFE0" opacity="0.9" />
                <line x1="115" y1="105" x2="163" y2="105" stroke="#1C2A20" strokeWidth="1.5" opacity="0.35" />
                <line x1="115" y1="112" x2="150" y2="112" stroke="#1C2A20" strokeWidth="1.5" opacity="0.35" />
              </g>
            </svg>
          </div>

          <div className="mn-copy">
            <h1>Find medicine at the pharmacy nearest you</h1>
            <p>Real-time stock from pharmacies around you, so you stop calling around and start walking in.</p>
          </div>

          <div className="mn-intro-actions">
            {introReady && (
              <>
                <button className="mn-continue" onClick={goToAuth}>Continue</button>
                <button className="mn-replay" onClick={replay}>Watch again</button>
              </>
            )}
          </div>
        </div>
      )}

      {stage === "auth" && (
        <div className="mn-authpage">
          <button className="mn-back" onClick={backToIntro}>
            <ArrowLeft size={15} /> Back
          </button>

          <div className="mn-card">
            <div className="mn-card-logo">
              <MapPin size={18} strokeWidth={2.4} />
              MediNearby
            </div>

            <div className="mn-tabs">
              <button className={`mn-tab ${mode === "login" ? "active" : ""}`} onClick={() => switchMode("login")} type="button">
                Log in
              </button>
              <button className={`mn-tab ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")} type="button">
                Sign up
              </button>
              <span
                className="mn-tab-indicator"
                style={{ transform: mode === "login" ? "translateX(0px)" : "translateX(88px)" }}
              />
            </div>

            {done ? (
              <div className="mn-success">
                <CheckCircle2 size={30} strokeWidth={2} />
                <h3>{mode === "login" ? "Welcome back" : "You're in"}</h3>
                <p>
                  {mode === "login"
                    ? "You're logged in. Nearby pharmacy stock is loading now."
                    : "Your account is ready. Start searching medicine near you."}
                </p>
                <button onClick={() => setDone(false)}>Back to form</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="mn-field">
                    <label htmlFor="mn-name">Full name</label>
                    <input id="mn-name" type="text" placeholder="Your name" required />
                  </div>
                )}

                <div className="mn-field">
                  <label htmlFor="mn-email">Email</label>
                  <input id="mn-email" type="email" placeholder="you@example.com" required />
                </div>

                {mode === "signup" && (
                  <div className="mn-field">
                    <label htmlFor="mn-phone">Phone number</label>
                    <input id="mn-phone" type="tel" placeholder="For stock alerts" required />
                  </div>
                )}

                <div className="mn-field">
                  <label htmlFor="mn-pass">Password</label>
                  <div className="mn-input-wrap">
                    <input
                      id="mn-pass"
                      type={showPass ? "text" : "password"}
                      placeholder="At least 8 characters"
                      minLength={8}
                      required
                    />
                    <button type="button" className="mn-eye" onClick={() => setShowPass((s) => !s)}>
                      {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {mode === "login" && <a className="mn-forgot" href="#">Forgot password?</a>}

                <button className="mn-submit" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={17} style={{ animation: "spin 0.8s linear infinite" }} />
                      {mode === "login" ? "Logging in..." : "Creating account..."}
                    </>
                  ) : mode === "login" ? (
                    "Log in"
                  ) : (
                    "Create account"
                  )}
                </button>

                <p className="mn-switchline">
                  {mode === "login" ? (
                    <>New to MediNearby? <button type="button" onClick={() => switchMode("signup")}>Sign up</button></>
                  ) : (
                    <>Already have an account? <button type="button" onClick={() => switchMode("login")}>Log in</button></>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
