import React, { useState, useEffect, useCallback } from "react";

interface HeartProps {
  id: number;
  x: number;
  onComplete: (id: number) => void;
}

function Heart({ id, x, onComplete }: HeartProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(id), 1000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  const colors = ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 20 + 30;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${x}px`,
        bottom: "100px",
        animation: `floatUp 1s ease-out forwards`,
      }}
    >
      <span
        style={{
          fontSize: `${size}px`,
          color: randomColor,
          opacity: 0.9,
        }}
      >
            💙
      </span>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(0.5) rotate(${Math.random() * 60 - 30}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function LikeButton() {
  const [count, setCount] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("eue-heart-count");
    if (saved) setCount(parseInt(saved, 10));
  }, []);

  const handleLike = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;

    setCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("eue-heart-count", newCount.toString());
      return newCount;
    });

    const newHeart = { id: Date.now(), x };
    setHearts((prev) => [...prev, newHeart]);
  }, []);

  const handleHeartComplete = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <>
      <div className="flex justify-center w-full">
        <button
          onClick={handleLike}
          className="relative z-100 group flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          style={{ position: "relative", zIndex: 100 }}
        >
          <span
            className={`text-3xl ${hearts.length > 0 ? "animate-bounce" : ""}`}
            style={{ animationDuration: "0.3s" }}
          >
        DALE LIKE 
        <span style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))" }}>💙</span>
          </span>
          <span className="text-2xl font-bold">{count.toLocaleString()}</span>
        </button>
      </div>

      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} onComplete={handleHeartComplete} />
      ))}
    </>
  );
}
