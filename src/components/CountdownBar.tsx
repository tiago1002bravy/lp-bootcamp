"use client";

import { useEffect, useMemo, useState } from "react";

function getNextMondayAt19(now: Date): Date {
  const day = now.getDay(); // 0 Sun, 1 Mon, ...
  let addDays = (1 - day + 7) % 7; // days until next Monday
  const candidate = new Date(now);
  candidate.setHours(19, 0, 0, 0);
  if (addDays === 0) {
    // Today is Monday. If past 19:00, go to next week
    if (now.getTime() >= candidate.getTime()) addDays = 7;
  }
  candidate.setDate(candidate.getDate() + addDays);
  return candidate;
}

function useCountdown(target: Date) {
  const [diffMs, setDiffMs] = useState<number>(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setDiffMs(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return { days, hours, minutes, seconds, finished: diffMs <= 0 } as const;
}

export default function CountdownBar() {
  const target = useMemo(() => getNextMondayAt19(new Date()), []);
  const { days, hours, minutes, seconds, finished } = useCountdown(target);

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#4b51ff] via-[#3b6dff] to-[#2bb8ff] shadow-[0_1px_0_rgba(255,255,255,0.15)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-3 py-1.5 md:flex-row">
        <h3 className="text-[11px] font-semibold tracking-wide text-white md:text-base">O EVENTO COMEÇA EM</h3>
        <div className="flex items-end gap-3 text-white">
          <TimeBox value={days} label="Dias" />
          <Sep />
          <TimeBox value={hours} label="Horas" />
          <Sep />
          <TimeBox value={minutes} label="Minutos" />
          <Sep />
          <TimeBox value={seconds} label="Segundos" />
        </div>
        <a href="#checkout" className="btn-gradient rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {finished ? "Garanta sua vaga" : "Comprar meu ingresso agora"}
        </a>
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="min-w-[44px] text-center">
      <div className="text-2xl font-bold md:text-4xl" suppressHydrationWarning>{display}</div>
      <div className="text-[10px] text-white/90 md:text-sm">{label}</div>
    </div>
  );
}

function Sep() {
  return <div className="pb-3 text-2xl text-white/80 md:text-3xl">:</div>;
} 