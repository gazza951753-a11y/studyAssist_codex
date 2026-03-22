const services = [
  { title: 'Консультации по предметам', text: 'Разбираем сложные темы простым языком.', price: 'от 1000 ₽' },
  { title: 'Разбор методичек и заданий', text: 'Помогаем понять структуру, требования и критерии.', price: 'от 3500 ₽' },
  { title: 'Репетиторство и практика', text: 'Разбираем задачи, формулы и алгоритмы пошагово.', price: 'от 1000 ₽ / сессия' },
  { title: 'Консультации по ВКР', text: 'Помощь в структуре, логике исследования и источниках.', price: 'от 15000 ₽' },
  { title: 'Академическое наставничество', text: 'Сопровождение по учебному плану и дедлайнам.', price: 'от 7000 ₽' },
  { title: 'Подготовка к защите', text: 'Репетиция выступления, структура доклада и визуал.', price: 'от 1200 ₽' },
  { title: 'Подбор учебных материалов', text: 'Список релевантных источников и план изучения.', price: 'от 5000 ₽' },
  { title: 'Индивидуальные консультации', text: 'Индивидуальный подход к каждому студенту.', price: 'по согласованию' }
];

export function ServicesSection() {
  return (
    <section id="services" className="container-main py-16">
      <h2 className="text-3xl font-bold">Услуги</h2>
      <p id="prices" className="mt-2 text-textSecondary">Стоимость зависит от срочности, объёма и сложности темы.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((item) => (
          <div key={item.title} className="glass rounded-2xl p-5">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-textSecondary">{item.text}</p>
            <p className="mt-4 font-bold text-accent">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
