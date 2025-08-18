"use client";

import { useEffect, useMemo, useState } from "react";

// Countdown diário para 19:00 (UTC-3). Entre 19:00 e 20:00 (UTC-3) exibe "AO VIVO".
// 19:00 em UTC-3 equivale a 22:00 em UTC (Brasil sem horário de verão).
const EVENT_UTC_HOUR = 22; // 22:00 UTC = 19:00 UTC-3
const LIVE_WINDOW_MS = 60 * 60 * 1000; // 1 hora

function getTodayEventUTC(now: Date): Date {
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      EVENT_UTC_HOUR,
      0,
      0,
      0
    )
  );
}

function getNextDailyEventTarget(now: Date): { target: Date; isLive: boolean } {
  const todayEventUTC = getTodayEventUTC(now);
  const nowMs = now.getTime();
  const todayEventMs = todayEventUTC.getTime();

  // Janela AO VIVO: [evento, evento + 1h)
  if (nowMs >= todayEventMs && nowMs < todayEventMs + LIVE_WINDOW_MS) {
    return { target: new Date(todayEventMs + 24 * 60 * 60 * 1000), isLive: true };
  }

  // Se ainda não chegou no horário de hoje, conta até ele; senão, até amanhã
  const targetMs = nowMs < todayEventMs ? todayEventMs : todayEventMs + 24 * 60 * 60 * 1000;
  return { target: new Date(targetMs), isLive: false };
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
  const { target, isLive } = useMemo(() => getNextDailyEventTarget(new Date()), []);
  const { days, hours, minutes, seconds, finished } = useCountdown(target);

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#4b51ff] via-[#3b6dff] to-[#2bb8ff] shadow-[0_1px_0_rgba(255,255,255,0.15)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-3 py-1.5 md:flex-row">
        <h3 className="text-[11px] font-semibold tracking-wide text-white md:text-base">O EVENTO COMEÇA EM</h3>
        {isLive ? (
          <div className="flex items-center gap-2 text-white">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="text-lg font-bold md:text-2xl">AO VIVO</span>
          </div>
        ) : (
          <div className="flex items-end gap-3 text-white">
            <TimeBox value={days} label="Dias" />
            <Sep />
            <TimeBox value={hours} label="Horas" />
            <Sep />
            <TimeBox value={minutes} label="Minutos" />
            <Sep />
            <TimeBox value={seconds} label="Segundos" />
          </div>
        )}
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