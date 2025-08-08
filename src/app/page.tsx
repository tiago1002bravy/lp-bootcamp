"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [planLabel, setPlanLabel] = useState<string>("");

  function openCheckout(url: string, label: string) {
    setCheckoutUrl(url);
    setPlanLabel(label);
    setIsModalOpen(true);
  }
  function closeCheckout() {
    setIsModalOpen(false);
  }
  return (
    <main className="min-h-screen w-full">
      <CheckoutModal isOpen={isModalOpen} onClose={closeCheckout} checkoutUrl={checkoutUrl} planLabel={planLabel} />
      {/* HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(255,75,209,.18),transparent_60%),radial-gradient(900px_480px_at_10%_20%,rgba(122,92,255,.22),transparent_60%),radial-gradient(900px_480px_at_90%_25%,rgba(43,217,255,.18),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">11 a 23 de Agosto</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Aulas ao vivo</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">IA em cada departamento</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Acabe com o caos da sua empresa nos próximos 15 dias usando processos, IA e automações.
          </h1>
          <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">De R$297 por apenas R$47</p>

          <p className="mt-5 max-w-2xl text-pretty text-lg text-white/80">
            Implemente a metodologia que organizou mais de 300 empresas e transforme sua operação em uma máquina previsível, produtiva e escalável.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#checkout" className="btn-gradient rounded-full px-6 py-3 font-medium text-white">
              Quero participar ao vivo
            </Link>
            <Link href="#cronograma" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10">
              Ver cronograma
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEMA + SOLUÇÃO (comparativo) */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/30">✕</span>
            <h2 className="text-2xl font-semibold md:text-3xl">99% do mercado organiza processos da forma errada</h2>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">✓</span>
            <h2 className="text-2xl font-semibold md:text-3xl">Apenas alunos do Bootcamp sabem a forma correta</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/10">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="divide-y divide-slate-200">
              <div className="px-6 py-4 text-center text-xs font-semibold tracking-wide text-slate-500">SEM METODOLOGIA</div>
              <ul className="divide-y divide-slate-200">
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Equipe perde horas em tarefas que IA faz em segundos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Usa ChatGPT isolado sem integração com processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Fazem a gestão dos clientes por meio de pastas</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Gerenciam tarefas em vez de processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Duplicidade e redundância nos processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Não há padronização nos processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Nomenclatura confusa e sem padronização</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Processos dispersos em múltiplas ferramentas</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-red-500">✕</span><span>Várias ferramentas para gerenciar o mesmo processo</span></li>
              </ul>
            </div>
            <div className="divide-y divide-slate-200">
              <div className="px-6 py-4 text-center text-xs font-semibold tracking-wide text-slate-500">SEGUINDO O MÉTODO BRAVY</div>
              <ul className="divide-y divide-slate-200">
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Automações com IA para tarefas operacionais</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>IA integrada ao processo sem interferencia humana</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Fazem a gestão dos clientes por meio de processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Gerenciam processos, projetos e atividades</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Eliminam duplicidade e redundância</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Padronizam seus processos</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Utilizam nomenclaturas claras e consistentes</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Centralizam os processos em uma única ferramenta</span></li>
                <li className="flex items-center gap-3 px-6 py-4"><span className="text-emerald-600">✓</span><span>Escolhem uma ferramenta certa para cada processo</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-2xl font-semibold md:text-3xl">O que você recebe</h2>
        <div className="mt-10 space-y-12">
          {/* Bloco 1 */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="card-glass rounded-2xl p-8">
              <h3 className="mb-4 text-2xl md:text-3xl font-semibold">Processos mapeados e implementados</h3>
              <p className="text-lg text-white/85">Estrutura completa: comercial, operacional, administrativo, projetos, marketing e financeiro.</p>
            </div>
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden rounded-2xl bg-white/5 p-2 sm:p-3 md:p-4">
              <Image src="/Processo%20ClickUp.png" alt="Estrutura de Processos no ClickUp" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
          {/* Bloco 2 */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="card-glass rounded-2xl p-8">
              <h3 className="mb-4 text-2xl md:text-3xl font-semibold">Automações com IA</h3>
              <p className="text-lg text-white/85">Automações com IA que tiram horas de trabalho de você e sua equipe</p>
            </div>
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden rounded-2xl bg-white/5 p-2 sm:p-3 md:p-4">
              <Image src="/Automação%20com%20IA.png" alt="Automação com IA via Make + ChatGPT" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
          {/* Bloco 3 */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="card-glass rounded-2xl p-8">
              <h3 className="mb-4 text-2xl md:text-3xl font-semibold">Dashboards Completos</h3>
              <p className="text-lg text-white/85">Relatórios com insights de IA e atualizações em tempo real.</p>
            </div>
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden rounded-2xl bg-white/5 p-2 sm:p-3 md:p-4">
              <Image src="/Dash%20Projetos.png" alt="Dashboard de Projetos com IA" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA */}
      <section id="cronograma do evento" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-2xl font-semibold md:text-3xl">Cronograma</h2>
        <p className="mt-2 text-white/70"> Do dia 11 ao dia 23 de Agosto ao vivo no Google Meet</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card-glass rounded-2xl p-6">
            <h3 className="mb-4 font-semibold">SEMANA 1</h3>
            <ul className="space-y-2 text-white/80">
              <li>11/08: Fundamentos Método Bravy</li>
              <li>12/08: Construindo Processos</li>
              <li>13/08: Automações do 0 com IA</li>
              <li>14/08: Gente & Cultura</li>
              <li>15/08: Comercial</li>
              <li>16/08: Gestão</li>
            </ul>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <h3 className="mb-4 font-semibold">SEMANA 2</h3>
            <ul className="space-y-2 text-white/80">
              <li>18/08: Onboarding automatizado</li>
              <li>19/08: Projetos</li>
              <li>20/08: Produto</li>
              <li>21/08: Marketing</li>
              <li>22/08: Performance</li>
              <li>23/08: Dashboards + Q&A</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="checkout" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-2xl font-semibold md:text-3xl">Escolha seu acesso</h2>
        <p className="mt-2 text-white/70">Garantia de 7 dias</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Básico */}
          <div id="checkout-basico" className="card-glass rounded-2xl p-6">
            <h3 className="mb-2 text-lg font-semibold">BÁSICO - R$ 47</h3>
            <ul className="mb-6 space-y-2 text-white/85">
              <li>✅ 12 aulas ao vivo com IA</li>
              <li>✅ Ver todas as construções práticas</li>
              <li>✅ Q&A em tempo real</li>
            </ul>
            <button onClick={() => openCheckout("https://payfast.greenn.com.br/38556/offer/N1MVbT", "Básico - R$ 47")} className="btn-gradient block rounded-xl px-6 py-3 text-center font-semibold text-white w-full">
              QUERO O BÁSICO - R$ 47
            </button>
            <p className="mt-2 text-sm text-white/60">Para: conhecer IA aplicada a processos</p>
          </div>
          {/* Completo */}
          <div className="card-glass rounded-2xl p-6 ring-2 ring-white/20">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">⭐ MAIS POPULAR</div>
            <h3 className="mb-2 text-lg font-semibold"> COMPLETO - R$ 197</h3>
            <ul className="mb-6 space-y-2 text-white/85">
              <li>✅ Tudo do Básico</li>
              <li>✅ Templates com IA integrada (6 departamentos)</li>
              <li>✅ Automações Make + ChatGPT prontas</li>
              <li>✅ Prompts otimizados para cada processo</li>
              <li>✅ Certificado de conclusão</li>
            </ul>
            <button onClick={() => openCheckout("https://payfast.greenn.com.br/38556/offer/NF9YBN", "Completo - R$ 197")} className="btn-gradient block rounded-xl px-6 py-3 text-center font-semibold text-white w-full">
              QUERO O COMPLETO - R$ 197
            </button>
            <p className="mt-2 text-sm text-white/60">Para: implementar IA na empresa hoje</p>
          </div>
          {/* VIP */}
          <div className="card-glass rounded-2xl p-6">
            <h3 className="mb-2 text-lg font-semibold"> VIP - R$ 297</h3>
            <ul className="mb-6 space-y-2 text-white/85">
              <li>✅ Tudo do Completo</li>
              <li>✅ Gravações por 1 ano</li>
              <li>✅ 2 encontros extras de tira-dúvida</li>
              <li>✅ Updates da metodologia</li>
              <li>✅ Grupo VIP permanente</li>
            </ul>
            <button onClick={() => openCheckout("https://payfast.greenn.com.br/38556/offer/U6uRAv", "VIP - R$ 297")} className="btn-gradient block rounded-xl px-6 py-3 text-center font-semibold text-white w-full">
              QUERO O VIP - R$ 297
            </button>
            <p className="mt-2 text-sm text-white/60">Para: suporte estendido para implementação</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-medium">Será um curso de ClickUp?</h3>
            <p className="text-white/80">Não! Vamos focar de forma prática na metodologia com processos, automações e IA.</p>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-medium">É complexo implementar?</h3>
            <p className="text-white/80">Sim, você precisa participar ativamente de todas as aulas, pois tem muita lógica envolvida.</p>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-medium">Funciona para minha empresa?</h3>
            <p className="text-white/80">Sim! Processos validados em agências, orgãos públicos, advogados, engenheiros e startups.</p>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-medium">E se eu perder uma aula?</h3>
            <p className="text-white/80">Plano VIP tem gravações. Outros acompanham pelo grupo.</p>
          </div>
        </div>
      </section>

      {/* Barra final */}
      <footer className="border-t border-white/10 bg-black/40 py-10 text-center text-sm text-white/70">
        <p>
          Desenvolvimento pela Init Tecnologia.
        </p>
      </footer>
    </main>
  );
}
