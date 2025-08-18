"use client";

import { useEffect, useState } from "react";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  planLabel: string;
};

export default function CheckoutModal({ isOpen, onClose, checkoutUrl, planLabel }: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utms, setUtms] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const keys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "gclid",
        "fbclid",
      ];
      const collected: Record<string, string> = {};
      for (const key of keys) {
        const value = url.searchParams.get(key);
        if (value) collected[key] = value;
      }
      setUtms(collected);
    } catch (_) {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  function validate(): string | null {
    if (!fullName.trim()) return "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido";
    if (!/^[0-9()\s+\-]{8,}$/.test(phone)) return "Telefone inválido";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const planSlug = (() => {
        const base = (planLabel || "")
          .split(" - ")[0]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        if (!base) return "indefinido";
        if (base.includes("basico")) return "basico";
        if (base.includes("completo")) return "completo";
        if (base.includes("vip")) return "vip";
        return base.replace(/[^a-z0-9]+/g, "-");
      })();
      const from = `bootcamp-${planSlug}`;
      // Opcional: armazenar em localStorage para uso futuro
      const payload = { fullName, email, phone, planLabel, utms, from, ts: Date.now() };
      localStorage.setItem("lpBootcampLead", JSON.stringify(payload));
      // Dispara webhook server-side
      try {
        await fetch("/api/webhook", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ fullName, email, phone, planLabel, utms, from }),
          cache: "no-store",
        });
      } catch (_) {
        // silencioso
      }
    } catch (_) {
      // ignore
    }

    // Redireciona para o checkout anexando UTMs à URL
    try {
      let urlObj: URL;
      try {
        urlObj = new URL(checkoutUrl);
      } catch {
        urlObj = new URL(checkoutUrl, window.location.href);
      }
      for (const [key, value] of Object.entries(utms || {})) {
        if (value) urlObj.searchParams.set(key, value);
      }
      window.location.href = urlObj.toString();
    } catch {
      window.location.href = checkoutUrl;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b10] p-6 shadow-2xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Quase lá!</h3>
          <p className="text-white/70">Preencha para garantir o acesso ao plano <span className="font-medium">{planLabel}</span>.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/80" htmlFor="fullName">Nome</label>
            <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/30" placeholder="Seu nome completo" autoComplete="name" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80" htmlFor="email">E-mail</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/30" placeholder="voce@email.com" autoComplete="email" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80" htmlFor="phone">Telefone</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/30" placeholder="(11) 99999-9999" inputMode="tel" autoComplete="tel" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="mt-2 flex items-center gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/10 px-4 py-2 text-white/90 hover:bg-white/5">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="btn-gradient rounded-lg px-4 py-2 font-semibold text-white disabled:opacity-60">Ir para o checkout</button>
          </div>
        </form>
      </div>
    </div>
  );
} 