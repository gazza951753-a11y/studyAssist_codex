import { ClipboardList, MessageSquare, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Оставьте заявку',
    description:
      'Заполните короткую форму: выберите тип работы, укажите предмет, дедлайн и требования. Прикрепите методичку или задание.'
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Согласуем детали',
    description:
      'Наш менеджер свяжется с вами в течение 30 минут. Обсудим объём, уточним детали и назовём итоговую стоимость.'
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Получите результат',
    description:
      'После оплаты приступаем к работе. Сдаём вовремя с гарантией уникальности. Бесплатные правки в течение 3 дней.'
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="section-pad bg-white">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag">Простой процесс</span>
          <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.5rem]">
            Как это&nbsp;<span className="text-[#E07A2F]">работает</span>
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
            Три шага — от заявки до готовой работы. Всё просто и прозрачно.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3 relative">

          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-[38px] left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-[2px] bg-gradient-to-r from-[#E8E4DC] via-[#E07A2F]/30 to-[#E8E4DC]" aria-hidden="true" />

          {steps.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col items-center text-center md:items-start md:text-left">

              {/* Number circle + icon */}
              <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-[#F5F0E8] border-2 border-[#E8E4DC] shadow-[0_4px_16px_rgba(28,28,30,0.06)]">
                <span className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#E07A2F] text-white text-[10px] font-extrabold shadow-[0_2px_8px_rgba(224,122,47,0.4)]">
                  {idx + 1}
                </span>
                <step.icon size={32} className="text-[#E07A2F]" />
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold tracking-widest uppercase text-[#E07A2F] mb-1">
                  Шаг {step.number}
                </p>
                <h3 className="text-xl font-bold text-[#1C1C1E]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <a href="#order" className="btn-primary px-8 py-3.5 text-base">
            Начать прямо сейчас
          </a>
        </div>
      </div>
    </section>
  );
}
