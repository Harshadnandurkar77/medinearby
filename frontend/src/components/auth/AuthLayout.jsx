import { useState, useEffect, useRef, useCallback } from "react";
import {
  Pill,
  MapPin,
  ShoppingBag,
  Plus,
} from "lucide-react";

const FLOATERS = [
  { Icon: Pill, top: "14%", left: "18%", size: 46, depth: 22, delay: "0s", rot: -18 },
  { Icon: MapPin, top: "58%", left: "10%", size: 40, depth: 34, delay: "0.6s", rot: 8 },
  { Icon: ShoppingBag, top: "70%", left: "52%", size: 50, depth: 16, delay: "1.1s", rot: -6 },
  { Icon: Plus, top: "24%", left: "62%", size: 34, depth: 40, delay: "0.3s", rot: 0 },
  { Icon: Pill, top: "42%", left: "72%", size: 30, depth: 28, delay: "1.5s", rot: 32 },
  { Icon: MapPin, top: "10%", left: "48%", size: 28, depth: 46, delay: "0.9s", rot: -12 },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReduced(mq.matches);

    const onChange = (e) => setReduced(e.matches);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function CapsuleIntro({ onDone }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    const t1 = setTimeout(() => {
      setPhase("split");
    }, 700);

    const t2 = setTimeout(() => {
      setPhase("exit");
    }, 1600);

    const t3 = setTimeout(() => {
      onDone();
    }, 2050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced, onDone]);

  if (reduced) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 42%, #E0F2FE 0%, #EFF6FF 55%, #ECFEFF 100%)",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.45s ease-in",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{ width: 208, height: 92 }}
      >
        {phase === "hold" && (
          <div
            className="absolute rounded-full medi-pulse"
            style={{
              inset: -14,
              border: "2px solid rgba(37,99,235,0.3)",
            }}
          />
        )}

        <div
          className={phase !== "hold" ? "medi-split-left" : ""}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(135deg, #0F766E, #0D9488)",
            borderTopLeftRadius: 46,
            borderBottomLeftRadius: 46,
            boxShadow:
              "0 16px 40px rgba(15,118,110,0.35)",
          }}
        />

        <div
          className={phase !== "hold" ? "medi-split-right" : ""}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(135deg, #2563EB, #1D4ED8)",
            borderTopRightRadius: 46,
            borderBottomRightRadius: 46,
            boxShadow:
              "0 16px 40px rgba(37,99,235,0.35)",
          }}
        />

        <div
          className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-white/80"
          style={{
            opacity: phase === "hold" ? 1 : 0,
            transition: "opacity 0.15s",
          }}
        />
      </div>
    </div>
  );
}

function Illustration({ compact }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const handleMove = useCallback(
    (e) => {
      if (reduced || !wrapRef.current) return;

      const rect =
        wrapRef.current.getBoundingClientRect();

      const px =
        (e.clientX - rect.left) / rect.width - 0.5;

      const py =
        (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        x: px,
        y: py,
      });
    },
    [reduced]
  );

  const handleLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative w-full ${
        compact ? "h-56" : "h-full"
      } overflow-hidden`}
      style={{
        background:
          "radial-gradient(120% 100% at 15% 10%, #E0F2FE 0%, #EFF6FF 45%, #ECFEFF 100%)",
        perspective: "1200px",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "-8%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0) 70%)",
          transform: `translate3d(${tilt.x * -12}px, ${
            tilt.y * -12
          }px, 0)`,
          transition: reduced
            ? "none"
            : "transform 0.2s ease-out",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: "-12%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(15,118,110,0.18) 0%, rgba(15,118,110,0) 70%)",
          transform: `translate3d(${tilt.x * -8}px, ${
            tilt.y * -8
          }px, 0)`,
          transition: reduced
            ? "none"
            : "transform 0.2s ease-out",
        }}
      />

      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: compact ? 150 : 260,
          height: compact ? 150 : 260,
          top: "50%",
          left: "50%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(224,242,254,0.35))",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow:
            "0 20px 60px rgba(15,118,110,0.18)",
          transform: `translate3d(-50%, -50%, 0)
            translate3d(${tilt.x * 10}px, ${
            tilt.y * 10
          }px, 0)
            rotateX(${tilt.y * -6}deg)
            rotateY(${tilt.x * 6}deg)`,
          transition: reduced
            ? "none"
            : "transform 0.2s ease-out",
        }}
      >
        <Pill
          size={compact ? 56 : 92}
          strokeWidth={1.4}
          className="text-teal-700"
          style={{
            transform: "rotate(-32deg)",
          }}
        />
      </div>

      {FLOATERS.map(
        (
          {
            Icon,
            top,
            left,
            size,
            depth,
            delay,
            rot,
          },
          i
        ) => (
          <div
            key={i}
            className={
              reduced ? "" : "medi-float"
            }
            style={{
              position: "absolute",
              top,
              left,
              animationDelay: delay,
              transform: `translate3d(${
                tilt.x * depth
              }px, ${
                tilt.y * depth
              }px, 0)`,
              transition: reduced
                ? "none"
                : "transform 0.25s ease-out",
            }}
          >
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                width: size + 22,
                height: size + 22,
                background:
                  "rgba(255,255,255,0.55)",
                backdropFilter: "blur(4px)",
                border:
                  "1px solid rgba(255,255,255,0.7)",
                boxShadow:
                  "0 10px 26px rgba(37,99,235,0.14)",
                transform: `rotate(${rot}deg)`,
              }}
            >
              <Icon
                size={size * 0.5}
                strokeWidth={1.6}
                className="text-blue-600"
                style={{
                  transform: `rotate(${-rot}deg)`,
                }}
              />
            </div>
          </div>
        )
      )}

      {!compact && (
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-2xl font-semibold text-slate-800 leading-snug">
            Find medicine at the pharmacy nearest you
          </h2>

          <p className="mt-2 text-sm text-slate-600 max-w-xs">
            Real-time stock from pharmacies around you,
            so you stop calling around and start walking in.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AuthLayout({ children }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div
      className="min-h-screen w-full bg-blue-50"
      style={{
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {!introDone && (
        <CapsuleIntro
          onDone={() => setIntroDone(true)}
        />
      )}

      <div
        className="lg:grid lg:grid-cols-2 min-h-screen"
        style={{
          opacity: introDone ? 1 : 0,
          transform: introDone
            ? "scale(1)"
            : "scale(0.97)",
          transition:
            "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div className="hidden lg:block">
          <Illustration compact={false} />
        </div>

        <div className="lg:hidden">
          <Illustration compact={true} />
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:py-14">
          {children}
        </div>
      </div>
    </div>
  );
}
