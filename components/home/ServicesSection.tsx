import { ArrowRight } from 'lucide-react';

const services = [
  {
    emoji: '📄',
    title: 'Курсовые работы',
    description: 'Пишем курсовые любой сложности под требования вашего вуза. Уникальность от 80%.',
    href: '#order'
  },
  {
    emoji: '🎓',
    title: 'Дипломные работы',
    description: 'Помогаем с ВКР: структура, написание, оформление, подготовка к защите.',
    href: '#order'
  },
  {
    emoji: '📝',
    title: 'Рефераты',
    description: 'Рефераты по любому предмету за короткий срок. Быстро и по стандарту.',
    href: '#order'
  },
  {
    emoji: '🔬',
    title: 'Лабораторные работы',
    description: 'Выполняем расчётные и исследовательские лабораторные работы с оформлением.',
    href: '#order'
  },
  {
    emoji: '💬',
    title: 'Онлайн-консультации',
    description: 'Разбираем сложные темы простым языком. Готовимся к экзаменам и зачётам.',
    href: '#order'
  },
  {
    emoji: '🧮',
    title: 'Разбор задач',
    description: 'Помогаем разобраться в алгоритмах, формулах и решении задач пошагово.',
    href: '#order'
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="section-pad bg-[#FAFAF7]">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Направления работы</span>
          <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.5rem]">
            Чем мы&nbsp;<span className="text-[#E07A2F]">помогаем</span>
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-xl mx-auto">
            Охватываем все типы учебных работ — от небольшого реферата до дипломной работы.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="card-white group flex flex-col gap-4 p-6"
            >
              {/* Emoji icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F0E8] text-2xl">
                {s.emoji}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1C1C1E]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{s.description}</p>
              </div>

              <a
                href={s.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E07A2F] hover:gap-2.5 transition-all duration-150"
              >
                Оставить заявку
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
