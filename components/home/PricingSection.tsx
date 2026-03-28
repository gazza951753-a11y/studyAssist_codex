import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Базовый',
    price: 'от 1 000 ₽',
    description: 'Для небольших работ и консультаций',
    features: [
      'Рефераты (10–20 стр.)',
      'Онлайн-консультация 1 час',
      'Разбор задач и примеров',
      'Уникальность от 75%',
      'Срок: от 1 дня',
      'Правки в течение 1 дня'
    ],
    cta: 'Выбрать тариф',
    featured: false
  },
  {
    name: 'Стандарт',
    price: 'от 3 500 ₽',
    description: 'Оптимально для курсовых работ',
    features: [
      'Курсовые работы (25–50 стр.)',
      'Лабораторные работы',
      'Консультации без ограничений',
      'Уникальность от 80%',
      'Срок: от 3 дней',
      'Бесплатные правки 3 дня',
      'Список литературы'
    ],
    cta: 'Самый популярный',
    featured: true
  },
  {
    name: 'Премиум',
    price: 'от 15 000 ₽',
    description: 'Полное сопровождение ВКР и диплома',
    features: [
      'Дипломные и магистерские работы',
      'Подготовка к защите',
      'Доклад и презентация',
      'Уникальность от 85%',
      'Срок: от 7 дней',
      'Бесплатные правки 7 дней',
      'Личный куратор',
      'Поддержка 24/7'
    ],
    cta: 'Выбрать тариф',
    featured: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-pad bg-[#FAFAF7]">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Прозрачное ценообразование</span>
          <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.5rem]">
            Стоимость&nbsp;<span className="text-[#E07A2F]">услуг</span>
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
            Выберите подходящий тариф или оставьте заявку — рассчитаем стоимость индивидуально.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[16px] border p-8 transition-all duration-200 ${
                plan.featured
                  ? 'pricing-featured scale-[1.02]'
                  : 'bg-white border-[#E8E4DC] shadow-[0_2px_12px_rgba(28,28,30,0.06)] hover:shadow-[0_8px_32px_rgba(28,28,30,0.10)] hover:-translate-y-1'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#1C1C1E] text-white text-[11px] font-bold px-4 py-1 tracking-wide shadow">
                  ПОПУЛЯРНЫЙ
                </span>
              )}

              <div>
                <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${plan.featured ? 'text-white/70' : 'text-[#E07A2F]'}`}>
                  {plan.name}
                </p>
                <p className={`text-[2.2rem] font-extrabold leading-tight ${plan.featured ? 'text-white' : 'text-[#1C1C1E]'}`}>
                  {plan.price}
                </p>
                <p className={`mt-1 text-sm ${plan.featured ? 'text-white/70' : 'text-[#6B7280]'}`}>
                  {plan.description}
                </p>
              </div>

              <div className={`my-6 h-px ${plan.featured ? 'bg-white/20' : 'bg-[#E8E4DC]'}`} />

              <ul className="flex-1 space-y-2.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${plan.featured ? 'text-white' : 'text-[#E07A2F]'}`}
                    />
                    <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-[#6B7280]'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#order"
                className={`mt-8 flex items-center justify-center rounded-[10px] px-6 py-3 text-sm font-semibold transition-all duration-150 ${
                  plan.featured
                    ? 'bg-white text-[#E07A2F] hover:bg-[#FFF4EC] shadow-md'
                    : 'btn-primary'
                }`}
              >
                {plan.featured ? plan.cta : 'Выбрать тариф'}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Точная стоимость рассчитывается индивидуально после изучения задания.&nbsp;
          <a href="#order" className="font-semibold text-[#E07A2F] hover:underline">
            Оставьте заявку
          </a>
          &nbsp;— расчёт бесплатно.
        </p>
      </div>
    </section>
  );
}
