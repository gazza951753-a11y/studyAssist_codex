import { FileText, BadgeRussianRuble, Rocket } from 'lucide-react';

const steps = [
  { title: 'Оставьте запрос', text: 'Опишите учебный вопрос, прикрепите материалы и цель консультации.', icon: FileText },
  { title: 'Получите план и стоимость', text: 'Менеджер свяжется с вами в течение 30 минут.', icon: BadgeRussianRuble },
  { title: 'Оплатите консультацию и получите результат', text: 'После оплаты начинаем консультационную работу: разбор темы, объяснение и рекомендации.', icon: Rocket }
];

export function HowItWorks() {
  return (
    <section id="how" className="container-main py-16">
      <h2 className="text-3xl font-bold">Как это работает</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="glass rounded-2xl p-6">
            <p className="text-sm font-bold text-accent">Шаг {i + 1}</p>
            <step.icon className="mt-3" />
            <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-textSecondary">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
