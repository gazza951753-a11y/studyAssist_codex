'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Как быстро выполняются работы?',
    a: 'Сроки зависят от объёма и сложности. Рефераты — от 1 дня, курсовые работы — от 3 дней, дипломные работы — от 7 дней. В сложных случаях уточняем срок индивидуально.'
  },
  {
    q: 'Гарантируете ли вы уникальность текста?',
    a: 'Да, гарантируем уникальность не менее 80% по системе Антиплагиат. Для дипломных и магистерских работ достигаем 85% и выше. По запросу предоставляем отчёт проверки.'
  },
  {
    q: 'Когда нужно платить?',
    a: 'Оплата производится после согласования всех условий: темы, объёма, срока и стоимости. Предоплата 50% — после подтверждения заявки, остаток — при получении готовой работы.'
  },
  {
    q: 'Можно ли вносить правки после получения работы?',
    a: 'Да, бесплатные правки включены в каждый тариф. Базовый — 1 день, Стандарт — 3 дня, Премиум — 7 дней с момента получения работы. Правки выполняем в течение 24 часов.'
  },
  {
    q: 'Конфиденциально ли это?',
    a: 'Абсолютно. Мы не храним ваши персональные данные дольше необходимого и никогда не передаём информацию третьим лицам. Все специалисты подписывают соглашение о неразглашении.'
  },
  {
    q: 'Как связаться с вами после оформления заявки?',
    a: 'Мы свяжемся с вами в течение 30 минут после получения заявки — по email или телефону. Также вы можете написать нам в Telegram (@studyAssist_support) или ВКонтакте.'
  },
  {
    q: 'Как оплатить услуги?',
    a: 'Принимаем оплату через ЮKassa: банковские карты (Visa, Mastercard, МИР), электронные кошельки, СБП. Все транзакции защищены. Чек приходит автоматически на email.'
  },
  {
    q: 'Работаете ли вы по всей России?',
    a: 'Да, мы работаем онлайн со студентами из любого города России. Часовой пояс не имеет значения — менеджеры на связи 24/7.'
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="section-pad bg-[#FAFAF7]">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">FAQ</span>
          <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.5rem]">
            Часто задаваемые&nbsp;<span className="text-[#E07A2F]">вопросы</span>
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
            Не нашли ответ? Напишите нам — ответим в течение 30 минут.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <Accordion.Item
                key={q}
                value={`item-${i}`}
                className="rounded-[16px] bg-white border border-[#E8E4DC] shadow-[0_2px_8px_rgba(28,28,30,0.04)] overflow-hidden"
              >
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-[#1C1C1E] hover:text-[#E07A2F] transition-colors [&[data-state=open]]:text-[#E07A2F]">
                  <span>{q}</span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-[#6B7280] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#E07A2F]"
                  />
                </Accordion.Trigger>
                <Accordion.Content
                  data-radix-accordion-content
                  className="px-6 pb-5 text-sm leading-relaxed text-[#6B7280]"
                >
                  {a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#6B7280] mb-4">Остались вопросы?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:support@studyassist.ru" className="btn-outline px-5 py-2.5 text-sm">
              Написать на email
            </a>
            <a
              href="https://t.me/studyAssist_support"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
