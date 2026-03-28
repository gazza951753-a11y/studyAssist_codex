import { Star, Users, Clock, ShieldCheck } from 'lucide-react';

const badges = [
  { icon: Users,       text: '1000+ студентов',         sub: 'уже получили помощь' },
  { icon: Star,        text: '4.9 / 5 рейтинг',         sub: 'средняя оценка клиентов' },
  { icon: Clock,       text: '30 минут',                 sub: 'среднее время ответа' },
  { icon: ShieldCheck, text: 'Гарантия уникальности',   sub: 'не менее 80% по Антиплагиат' }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] py-20 md:py-28">
      {/* Decorative orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, #E8E4DC 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.55
        }}
        aria-hidden="true"
      />

      <div className="container-main relative grid items-center gap-12 md:grid-cols-2">

        {/* Left: copy */}
        <div>
          <span className="section-tag">Учебная помощь онлайн</span>

          <h1 className="mt-2 text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-[#1C1C1E] md:text-[3.25rem]">
            Помогаем студентам&nbsp;
            <span className="text-[#E07A2F]">разобраться</span>
            &nbsp;в любой учебной теме
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[#6B7280] max-w-[520px]">
            Курсовые, дипломные, рефераты, лабораторные и онлайн-консультации.
            Индивидуальный подход, понятные сроки и прозрачные условия.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order" className="btn-primary px-7 py-3 text-base">
              Оставить заявку
            </a>
            <a href="#pricing" className="btn-outline px-7 py-3 text-base">
              Узнать стоимость
            </a>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((b) => (
              <div
                key={b.text}
                className="flex flex-col gap-1 rounded-2xl bg-white border border-[#E8E4DC] px-4 py-3 shadow-[0_2px_8px_rgba(28,28,30,0.05)]"
              >
                <b.icon size={18} className="text-[#E07A2F]" />
                <p className="text-sm font-bold text-[#1C1C1E] leading-tight mt-1">{b.text}</p>
                <p className="text-xs text-[#6B7280] leading-tight">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: illustration */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[460px] rounded-[28px] bg-white border border-[#E8E4DC] shadow-[0_8px_40px_rgba(28,28,30,0.09)] p-8 overflow-hidden">

            {/* Orange accent corner */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(224,122,47,0.18) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Mock document preview */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E8]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12h6M9 16h4M7 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" stroke="#E07A2F" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="9" y="2" width="6" height="4" rx="1" stroke="#E07A2F" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1C1C1E]">Курсовая работа</p>
                  <p className="text-xs text-[#6B7280]">Маркетинг — 45 страниц</p>
                </div>
                <span className="ml-auto rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">Готово</span>
              </div>

              <div className="h-px bg-[#E8E4DC]" />

              {/* Progress bars */}
              <div className="space-y-3">
                {[
                  { label: 'Уникальность текста', pct: 87, color: '#E07A2F' },
                  { label: 'Оформление по ГОСТу', pct: 100, color: '#22c55e' },
                  { label: 'Список литературы',   pct: 100, color: '#22c55e' }
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">{row.label}</span>
                      <span className="font-semibold text-[#1C1C1E]">{row.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#F5F0E8]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#E8E4DC]" />

              {/* Stars */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#6B7280]">Оценка студента</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E07A2F">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-extrabold text-[#E07A2F]">4.9</span>
              </div>
            </div>
          </div>

          {/* Floating notification card */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border border-[#E8E4DC] px-4 py-3 shadow-[0_4px_20px_rgba(28,28,30,0.10)] flex items-center gap-3 md:-left-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF4EC]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="#E07A2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1C1C1E]">Новая заявка принята</p>
              <p className="text-[11px] text-[#6B7280]">Ответим в течение 30 минут</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
