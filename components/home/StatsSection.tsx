import { Users, Star, Clock, ThumbsUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1 000+',
    label: 'студентов',
    sub: 'уже воспользовались сервисом'
  },
  {
    icon: Star,
    value: '4.9 / 5',
    label: 'рейтинг',
    sub: 'средняя оценка работ'
  },
  {
    icon: Clock,
    value: '30 мин',
    label: 'время ответа',
    sub: 'среднее время первого ответа'
  },
  {
    icon: ThumbsUp,
    value: '95%',
    label: 'довольных клиентов',
    sub: 'возвращаются снова'
  }
];

export function StatsSection() {
  return (
    <section className="bg-[#F5F0E8] border-y border-[#E8E4DC]">
      <div className="container-main py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-[#E8E4DC] shadow-[0_2px_8px_rgba(28,28,30,0.05)]">
                <s.icon size={20} className="text-[#E07A2F]" />
              </div>
              <p className="text-[2rem] font-extrabold leading-none text-[#1C1C1E] tracking-tight">
                {s.value}
              </p>
              <p className="text-sm font-semibold text-[#1C1C1E]">{s.label}</p>
              <p className="text-xs text-[#6B7280] leading-tight">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
