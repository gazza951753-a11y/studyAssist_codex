import Link from 'next/link';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';

const legal = [
  { href: '/privacy',              label: 'Конфиденциальность' },
  { href: '/offer',                label: 'Пользовательское соглашение' },
  { href: '/refund-policy',        label: 'Правила возврата' },
  { href: '/consent-personal-data', label: 'Согласие на обработку ПДн' },
  { href: '/consent-marketing',    label: 'Согласие на рассылки' }
];

const services = [
  { href: '#services', label: 'Курсовые работы' },
  { href: '#services', label: 'Дипломные работы' },
  { href: '#services', label: 'Рефераты' },
  { href: '#services', label: 'Лабораторные работы' },
  { href: '#services', label: 'Онлайн-консультации' },
  { href: '#services', label: 'Разбор задач' }
];

const nav = [
  { href: '#how',     label: 'Как это работает' },
  { href: '#pricing', label: 'Цены' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq',     label: 'Вопросы и ответы' },
  { href: '#order',   label: 'Оставить заявку' }
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8E4DC]">

      {/* Main footer grid */}
      <div className="container-main py-14 grid gap-10 md:grid-cols-4">

        {/* Brand column */}
        <div className="md:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center text-[1.35rem] font-extrabold text-[#1C1C1E] tracking-tight hover:opacity-80 transition-opacity"
          >
            StudyAssist<span className="text-[#E07A2F]">.</span>
          </Link>
          <p className="mt-3 text-sm text-[#6B7280] leading-relaxed">
            Профессиональная помощь студентам с любыми учебными задачами. Быстро, качественно и конфиденциально.
          </p>

          {/* Contacts */}
          <div className="mt-5 space-y-2.5">
            <a
              href="mailto:support@studyassist.ru"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
            >
              <Mail size={15} className="shrink-0" />
              support@studyassist.ru
            </a>
            <a
              href="tel:+79539246817"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
            >
              <Phone size={15} className="shrink-0" />
              +7-953-924-68-17
            </a>
            <a
              href="https://t.me/studyAssist_support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
            >
              <Send size={15} className="shrink-0" />
              @studyAssist_support
            </a>
            <a
              href="https://vk.ru/supp0rt_studyassist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
            >
              <MessageCircle size={15} className="shrink-0" />
              ВКонтакте
            </a>
          </div>
        </div>

        {/* Services column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] mb-4">Услуги</p>
          <ul className="space-y-2">
            {services.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] mb-4">Навигация</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] mb-4">Документы</p>
          <ul className="space-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[#6B7280] hover:text-[#E07A2F] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8E4DC]">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} StudyAssist.ru — Все права защищены</p>
          <p>
            Оплата через&nbsp;
            <a
              href="https://yookassa.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E07A2F] transition-colors font-medium"
            >
              ЮKassa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
