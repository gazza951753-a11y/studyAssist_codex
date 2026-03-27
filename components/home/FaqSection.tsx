'use client';

import * as Accordion from '@radix-ui/react-accordion';

const faq = [
  ['Как быстро вы проводите консультации?', 'От нескольких часов до нескольких дней, в зависимости от сложности задания.'],
  ['Гарантируете ли вы уникальность?', 'Да, обеспечиваем уникальность не менее 80% по Антиплагиат.'],
  ['Когда нужно платить?', 'После согласования формата. Консультация начинается после оплаты выбранного тарифа.'],
  ['Можно ли вносить правки?', 'Да, бесплатные правки доступны в течение 3 дней после сдачи.'],
  ['Конфиденциально ли это?', 'Да, все данные защищены и не передаются третьим лицам.']
];

export function FaqSection() {
  return (
    <section className="container-main py-16">
      <h2 className="text-3xl font-bold">Частые вопросы</h2>
      <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
        {faq.map(([q, a], i) => (
          <Accordion.Item key={q} value={`i-${i}`} className="glass rounded-xl px-4 py-3">
            <Accordion.Trigger className="w-full text-left font-medium">{q}</Accordion.Trigger>
            <Accordion.Content className="pt-2 text-sm text-textSecondary">{a}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
