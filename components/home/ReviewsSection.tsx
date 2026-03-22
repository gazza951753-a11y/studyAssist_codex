import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Анна М.', university: 'Экономика', text: 'Подготовилась к зачёту по экономике за неделю. Объяснили сложные темы простым языком, стало намного спокойнее перед экзаменом.', avatar: '/reviews/anna.png' },
  { name: 'Дмитрий К.', university: 'Студент, Юриспруденция', text: 'Регулярно беру консультации по программированию. Отлично разбирают ошибки в коде и показывают, как решать задачи самостоятельно.', avatar: '/reviews/dmitriy.png' },
  { name: 'Елена С.', university: 'Магистрант, Психология', text: 'Помогли структурировать исследование и подготовиться к защите. Понравился формат наставничества и чёткий план на каждый этап.', avatar: '/reviews/elena.png' },
  { name: 'Михаил П.', university: 'Студент, IT', text: 'За короткий срок разобрали тему и подобрали литературу. Получилось подготовиться к семинару без стресса.', avatar: '/reviews/mikhail.png' },
  { name: 'Ольга В.', university: 'Студентка, Медицина', text: 'Помогли собрать презентацию и отрепетировать выступление. После консультации уверенно выступила на паре.', avatar: '/reviews/olga.png' }
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="container-main py-16">
      <h2 className="text-3xl font-bold">Отзывы студентов</h2>
      <p className="mt-2 text-sm text-textSecondary">Положите файлы аватарок в папку public/reviews: anna.png, dmitriy.png, elena.png, mikhail.png, olga.png</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Image src={review.avatar} alt={review.name} width={48} height={48} className="rounded-full object-cover" />
              <div><p className="font-semibold">{review.name}</p><p className="text-xs text-textSecondary">{review.university}</p></div>
            </div>
            <div className="mt-3 flex text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <p className="mt-3 text-sm text-textSecondary">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
