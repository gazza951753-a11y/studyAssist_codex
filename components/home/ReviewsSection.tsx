'use client';

import { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';

/* ── Types ── */
interface Review {
  id: string;
  name: string;
  university?: string;
  city?: string;
  rating: number;
  text: string;
  createdAt: string;
}

/* ── Star picker ── */
function StarPicker({
  value,
  onChange
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Оценка">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} звезд`}
          className="star-btn transition-transform hover:scale-110"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          <Star
            size={24}
            className={
              n <= (hovered || value)
                ? 'text-[#E07A2F] fill-[#E07A2F]'
                : 'text-[#E8E4DC] fill-[#E8E4DC]'
            }
          />
        </button>
      ))}
    </div>
  );
}

/* ── Static fallback reviews ── */
const FALLBACK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Анна М.',
    university: 'Экономика, МГУ',
    city: 'Москва',
    rating: 5,
    text: 'Подготовилась к зачёту по экономике за неделю. Объяснили сложные темы простым языком, стало намного спокойнее перед экзаменом.',
    createdAt: ''
  },
  {
    id: '2',
    name: 'Дмитрий К.',
    university: 'Юриспруденция, СПбГУ',
    city: 'Санкт-Петербург',
    rating: 5,
    text: 'Регулярно обращаюсь с курсовыми по праву. Всегда сдают в срок, замечаний от преподавателей нет. Рекомендую!',
    createdAt: ''
  },
  {
    id: '3',
    name: 'Елена С.',
    university: 'Психология, РГГУ',
    city: 'Москва',
    rating: 5,
    text: 'Помогли структурировать дипломную работу и подготовиться к защите. Подробный план на каждый этап — очень удобно.',
    createdAt: ''
  },
  {
    id: '4',
    name: 'Михаил П.',
    university: 'Информатика, МФТИ',
    city: 'Долгопрудный',
    rating: 5,
    text: 'За короткий срок разобрали тему алгоритмов и подобрали литературу. Получилось подготовиться к семинару без стресса.',
    createdAt: ''
  },
  {
    id: '5',
    name: 'Ольга В.',
    university: 'Медицина, Первый МГМУ',
    city: 'Москва',
    rating: 4,
    text: 'Помогли собрать презентацию и отрепетировать выступление. После консультации уверенно выступила на паре.',
    createdAt: ''
  },
  {
    id: '6',
    name: 'Артём Н.',
    university: 'Финансы, ВШЭ',
    city: 'Москва',
    rating: 5,
    text: 'Курсовая по финансовому анализу выполнена на высшем уровне. Уникальность 87%, преподаватель остался доволен.',
    createdAt: ''
  }
];

/* ── Review card ── */
function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="card-white flex flex-col gap-4 p-6">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? 'text-[#E07A2F] fill-[#E07A2F]'
                : 'text-[#E8E4DC] fill-[#E8E4DC]'
            }
          />
        ))}
      </div>

      {/* Text */}
      <p className="flex-1 text-sm leading-relaxed text-[#6B7280]">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E8] text-sm font-bold text-[#E07A2F] shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1C1C1E]">{review.name}</p>
          {(review.university || review.city) && (
            <p className="text-xs text-[#6B7280]">
              {[review.university, review.city].filter(Boolean).join(' • ')}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Write review form ── */
function WriteReviewForm() {
  const [rating, setRating]   = useState(0);
  const [name, setName]       = useState('');
  const [city, setCity]       = useState('');
  const [uni, setUni]         = useState('');
  const [text, setText]       = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !text.trim() || rating === 0) {
      setError('Пожалуйста, заполните имя, оценку и текст отзыва.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city, university: uni, rating, text })
      });
      if (!res.ok) throw new Error('Ошибка сервера');
      setDone(true);
    } catch {
      setError('Не удалось отправить отзыв. Попробуйте позже.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 size={40} className="text-green-500" />
        <p className="text-lg font-bold text-[#1C1C1E]">Спасибо за отзыв!</p>
        <p className="text-sm text-[#6B7280]">Он появится после проверки модератором.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
            Имя <span className="text-[#E07A2F]">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">Город</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Москва"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">Университет</label>
          <input
            value={uni}
            onChange={(e) => setUni(e.target.value)}
            placeholder="МГУ, ВШЭ..."
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
          Оценка <span className="text-[#E07A2F]">*</span>
        </label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
          Текст отзыва <span className="text-[#E07A2F]">*</span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Расскажите о вашем опыте работы с нами..."
          className="input-field resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm disabled:opacity-60"
      >
        <Send size={15} />
        {sending ? 'Отправляем...' : 'Отправить отзыв'}
      </button>
    </form>
  );
}

/* ── Main section ── */
export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section id="reviews" className="section-pad bg-white">
      <div className="container-main">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Реальные оценки</span>
          <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.5rem]">
            Отзывы&nbsp;<span className="text-[#E07A2F]">студентов</span>
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
            Более 1 000 студентов уже воспользовались нашей помощью. Вот что они говорят.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        {/* Write review block */}
        <div className="mt-14 rounded-[16px] bg-[#FAFAF7] border border-[#E8E4DC] p-8">
          <div className="mb-6">
            <span className="section-tag">Поделитесь мнением</span>
            <h3 className="text-xl font-bold text-[#1C1C1E]">Написать отзыв</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Ваш опыт поможет другим студентам сделать выбор.
            </p>
          </div>
          <WriteReviewForm />
        </div>
      </div>
    </section>
  );
}
