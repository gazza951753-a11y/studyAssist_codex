'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock3 } from 'lucide-react';

const badges = [
  { icon: Sparkles, text: '1000+ учебных консультаций' },
  { icon: ShieldCheck, text: 'Гарантия уникальности от 80%' },
  { icon: Clock3, text: 'Расчёт стоимости за 30 минут' }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(108,62,244,0.45),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.35),transparent_35%)]" />
      <div className="container-main relative grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Помогаем студентам разобраться в любой учебной теме</h1>
          <p className="mt-5 text-lg text-textSecondary">Консультации, репетиторство, разбор заданий, подбор источников и методических материалов. Индивидуальный формат, понятные сроки и прозрачные условия.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order" className="rounded-xl bg-brand-gradient px-6 py-3 font-semibold shadow-glow">Получить консультацию</a>
            <a href="#prices" className="rounded-xl border border-white/20 px-6 py-3 font-medium">Узнать стоимость</a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {badges.map((badge) => (
              <div key={badge.text} className="glass rounded-xl p-3 text-xs text-textSecondary">
                <badge.icon size={16} className="mb-2 text-accent" />
                {badge.text}
              </div>
            ))}
          </div>
        </div>
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 0.7, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass rounded-3xl p-8">
          <svg viewBox="0 0 420 280" className="w-full">
            <rect x="95" y="130" width="230" height="120" rx="16" fill="#1A1A2E" stroke="#60A5FA" strokeWidth="2" />
            <rect x="120" y="160" width="180" height="18" rx="6" fill="#334155" />
            <rect x="120" y="188" width="140" height="12" rx="6" fill="#475569" />
            <rect x="120" y="208" width="105" height="10" rx="5" fill="#64748B" />
            <rect x="20" y="170" width="64" height="88" rx="8" fill="#6C3EF4" opacity="0.9" />
            <rect x="28" y="182" width="48" height="8" rx="4" fill="#ddd6fe" />
            <rect x="336" y="154" width="64" height="104" rx="8" fill="#3B82F6" opacity="0.9" />
            <polygon points="210,24 305,66 210,108 115,66" fill="#F59E0B" />
            <rect x="202" y="104" width="16" height="24" fill="#F59E0B" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
