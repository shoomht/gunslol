"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Github, Twitter, Instagram, Youtube, MessageCircle,
  Volume2, VolumeX, Eye, Twitch, BadgeCheck, Crown
} from "lucide-react";

// ---- Edit di sini buat jadiin ini punya kamu ----
const PROFILE = {
  username: "zsanz",
  uid: "74,071",
  displayName: "zsanz",
  bio: "full-stack dev / pixel pusher / night owl",
  avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=zsanz",
  verified: true,
  premium: true,
  views: 128493,
  status: "online", // online | idle | offline
  audioSrc: "", // taruh path mp3 kamu di sini, misal "/song.mp3" (taruh file di folder /public)
  audioTitle: "now playing — untitled",
  socials: [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Twitch, label: "Twitch", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
  ],
};

const STATUS_COLOR = { online: "#3ddc84", idle: "#f5a623", offline: "#5b5b66" };

function useTypewriter(text, speed = 45, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

function AuroraBackground({ mouse }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#07070b" }}>
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background:
            "radial-gradient(40% 40% at 20% 20%, rgba(139,92,246,0.35), transparent 60%)," +
            "radial-gradient(35% 35% at 80% 30%, rgba(34,211,238,0.22), transparent 60%)," +
            "radial-gradient(45% 45% at 50% 85%, rgba(236,72,153,0.18), transparent 60%)",
          filter: "blur(40px)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.12), transparent 40%)`,
          transition: "background 0.15s ease-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-2%, 3%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

function EnterGate({ onEnter }) {
  return (
    <div
      onClick={onEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onEnter()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        background: "#07070b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#e9e7f5",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(139,92,246,0.28), transparent 65%)",
          filter: "blur(60px)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      <p style={{ fontSize: "12px", letterSpacing: "0.15em", color: "#7a7690", marginBottom: "10px", zIndex: 1 }}>
        guns.lol/{PROFILE.username}
      </p>
      <h1 style={{ fontSize: "15px", letterSpacing: "0.3em", zIndex: 1, animation: "fadeBlink 2s ease-in-out infinite" }}>
        CLICK TO ENTER
      </h1>
      <style>{`
        @keyframes fadeBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
      `}</style>
    </div>
  );
}

export default function ProfileCard() {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const typed = useTypewriter(PROFILE.bio, 45, entered);
  const audioRef = useRef(null);

  useEffect(() => {
    const handler = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current && PROFILE.audioSrc) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !audioRef.current.muted;
    setMuted((m) => !m);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        color: "#e9e7f5",
        padding: "24px",
      }}
    >
      {!entered && <EnterGate onEnter={handleEnter} />}
      <AuroraBackground mouse={mouse} />

      {PROFILE.audioSrc && (
        <audio ref={audioRef} src={PROFILE.audioSrc} loop preload="auto" />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "380px",
          borderRadius: "20px",
          background: "rgba(15,15,22,0.55)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 0 1px rgba(139,92,246,0.06), 0 20px 60px rgba(0,0,0,0.55), 0 0 80px rgba(139,92,246,0.08)",
          overflow: "hidden",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "#8a879c",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Eye size={13} /> {PROFILE.views.toLocaleString("id-ID")}
          </span>
          <span style={{ color: "#5b5768" }}>UID {PROFILE.uid}</span>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            style={{
              background: "transparent",
              border: "none",
              color: "#8a879c",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        <div style={{ padding: "32px 28px 28px" }}>
          <div style={{ position: "relative", width: "88px", height: "88px", margin: "0 auto 18px" }}>
            <div
              style={{
                position: "absolute",
                inset: "-6px",
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #8b5cf6, #22d3ee, #ec4899, #8b5cf6)",
                filter: "blur(8px)",
                opacity: 0.7,
                animation: "spin 6s linear infinite",
              }}
            />
            <img
              src={PROFILE.avatar}
              alt={PROFILE.displayName}
              style={{
                position: "relative",
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                border: "3px solid #0f0f16",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              title={PROFILE.status}
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: STATUS_COLOR[PROFILE.status],
                border: "3px solid #0f0f16",
                boxShadow: `0 0 10px ${STATUS_COLOR[PROFILE.status]}`,
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                margin: 0,
                background: "linear-gradient(90deg, #fff, #c9c3f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {PROFILE.displayName}
            </h1>
            {PROFILE.verified && <BadgeCheck size={18} color="#22d3ee" />}
            {PROFILE.premium && <Crown size={16} color="#f5c518" />}
          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#a8a4bf", marginTop: "8px", minHeight: "18px" }}>
            {typed}
            {entered && (
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "13px",
                  background: "#8b5cf6",
                  marginLeft: "2px",
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "-2px",
                }}
              />
            )}
          </p>

          {PROFILE.audioSrc && (
            <p style={{ textAlign: "center", fontSize: "10px", color: "#5b5768", marginTop: "6px", letterSpacing: "0.04em" }}>
              ♪ {PROFILE.audioTitle}
            </p>
          )}

          <div
            style={{
              height: "1px",
              margin: "22px 0",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {PROFILE.socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 6px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#c9c6da",
                  textDecoration: "none",
                  fontSize: "10px",
                  letterSpacing: "0.03em",
                  transition: "transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = "rgba(139,92,246,0.12)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#c9c6da";
                }}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: "10px", color: "#565265", marginTop: "24px", letterSpacing: "0.08em" }}>
            guns.lol/{PROFILE.username}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
