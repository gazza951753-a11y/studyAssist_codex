'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, CheckCircle2, UploadCloud, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { z } from 'zod';

const schema = z.object({
  type:        z.string().min(1, 'Выберите тип работы'),
  subject:     z.string().min(2, 'Укажите предмет или дисциплину'),
  deadline:    z.string().min(1, 'Укажите дедлайн'),
  description: z.string().min(20, 'Описание должно содержать не менее 20 символов'),
  name:        z.string().min(2, 'Введите ваше имя'),
  email:       z.string().email('Некорректный email'),
  phone:       z.string().optional(),
  agreed:      z.boolean().refine((v) => v, 'Необходимо согласие на обработку данных')
});

type FormData = z.infer<typeof schema>;

const STEPS = ['Работа', 'Описание', 'Контакты'];

export function OrderForm() {
  const [step, setStep]       = useState(1);
  const [files, setFiles]     = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef          = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: '', subject: '', deadline: '', description: '',
      name: '', email: '', phone: '', agreed: false
    }
  });

  const { register, formState: { errors } } = form;

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ['type', 'subject', 'deadline'],
    2: ['description'],
    3: ['name', 'email', 'phone', 'agreed']
  };

  const next = async () => {
    const ok = await form.trigger(stepFields[step]);
    if (ok) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const onSubmit = form.handleSubmit(async (values) => {
    setSending(true);
    try {
      const data = new FormData();
      Object.entries(values).forEach(([k, v]) => data.append(k, String(v ?? '')));
      files.forEach((file) => data.append('files', file));

      const res     = await fetch('/api/orders', { method: 'POST', body: data });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Не удалось отправить заявку');

      setSuccess(payload.orderNumber);
      (window as any).ym?.(process.env.NEXT_PUBLIC_METRIKA_ID, 'reachGoal', 'order_submit');
    } catch (err: any) {
      alert(err.message || 'Ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      setSending(false);
    }
  });

  /* ── Success state ── */
  if (success) {
    return (
      <section id="order" className="section-pad bg-[#F5F0E8]">
        <div className="container-main flex justify-center">
          <div className="w-full max-w-lg rounded-[16px] bg-white border border-[#E8E4DC] shadow-[0_4px_20px_rgba(28,28,30,0.07)] p-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 mx-auto mb-4">
              <CheckCircle2 size={36} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1C1C1E]">Заявка отправлена!</h2>
            <p className="mt-2 text-[#6B7280]">
              Номер заявки:&nbsp;
              <span className="font-bold text-[#1C1C1E]">{success}</span>
            </p>
            <p className="mt-3 text-sm text-[#6B7280]">
              Мы свяжемся с вами в течение 30 минут для уточнения деталей.
            </p>
            <button
              className="btn-primary mt-6 px-6 py-2.5 text-sm"
              onClick={() => { setSuccess(null); form.reset(); setStep(1); setFiles([]); }}
            >
              Оставить ещё заявку
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="section-pad bg-[#F5F0E8]">
      <div className="container-main">
        <div className="grid gap-12 md:grid-cols-2 items-start">

          {/* Left: text */}
          <div>
            <span className="section-tag">Бесплатный расчёт</span>
            <h2 className="text-[2rem] font-extrabold tracking-tight text-[#1C1C1E] md:text-[2.4rem]">
              Оставить&nbsp;<span className="text-[#E07A2F]">заявку</span>
            </h2>
            <p className="mt-3 text-[#6B7280] leading-relaxed">
              Заполните форму — мы свяжемся в течение 30 минут, согласуем детали
              и назовём точную стоимость. Без предоплаты.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Бесплатный расчёт стоимости',
                'Конфиденциальность гарантирована',
                'Уникальность от 80% по Антиплагиат',
                'Бесплатные правки 3 дня'
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#1C1C1E]">
                  <CheckCircle2 size={16} className="text-[#E07A2F] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Step indicator (desktop sidebar) */}
            <div className="mt-10 hidden md:block">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const active   = step === n;
                const complete = step > n;
                return (
                  <div key={label} className="flex items-center gap-3 mb-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        complete
                          ? 'bg-[#E07A2F] text-white'
                          : active
                          ? 'bg-[#E07A2F] text-white ring-4 ring-[#E07A2F]/20'
                          : 'bg-white border border-[#E8E4DC] text-[#6B7280]'
                      }`}
                    >
                      {complete ? <CheckCircle2 size={14} /> : n}
                    </div>
                    <span className={`text-sm font-medium ${active ? 'text-[#1C1C1E]' : 'text-[#6B7280]'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: form card */}
          <div className="rounded-[16px] bg-white border border-[#E8E4DC] shadow-[0_4px_24px_rgba(28,28,30,0.08)] p-8">

            {/* Mobile step indicator */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    step > i ? 'bg-[#E07A2F]' : 'bg-[#E8E4DC]'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-1">
              Шаг {step} из {STEPS.length}
            </p>
            <h3 className="text-xl font-bold text-[#1C1C1E] mb-6">{STEPS[step - 1]}</h3>

            <form onSubmit={onSubmit} className="space-y-4">

              {/* Step 1: Work details */}
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Тип работы <span className="text-[#E07A2F]">*</span>
                    </label>
                    <select {...register('type')} className="input-field">
                      <option value="">Выберите тип работы</option>
                      <option value="coursework">Курсовая работа</option>
                      <option value="diploma">Дипломная / ВКР</option>
                      <option value="essay">Реферат / Эссе</option>
                      <option value="lab">Лабораторная работа</option>
                      <option value="presentation">Презентация / Доклад</option>
                      <option value="consultation">Онлайн-консультация</option>
                      <option value="tasks">Разбор задач</option>
                      <option value="other">Другое</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Предмет / Дисциплина <span className="text-[#E07A2F]">*</span>
                    </label>
                    <input
                      {...register('subject')}
                      placeholder="Например: Маркетинг, Право, Физика"
                      className="input-field"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-[#1C1C1E] mb-1.5">
                      <Calendar size={14} className="text-[#E07A2F]" />
                      Дедлайн <span className="text-[#E07A2F]">*</span>
                    </label>
                    <input
                      type="date"
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      {...register('deadline')}
                      className="input-field"
                    />
                    {errors.deadline && (
                      <p className="mt-1 text-xs text-red-500">{errors.deadline.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* Step 2: Description & files */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Описание задания <span className="text-[#E07A2F]">*</span>
                    </label>
                    <textarea
                      {...register('description')}
                      rows={5}
                      placeholder="Опишите ваше задание: тема, требования к объёму, структура, особые пожелания..."
                      className="input-field resize-none"
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Прикрепить файлы <span className="text-[#6B7280] font-normal">(необязательно, до 50 МБ)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#E8E4DC] bg-[#FAFAF7] px-4 py-5 text-sm text-[#6B7280] hover:border-[#E07A2F] hover:text-[#E07A2F] transition-colors"
                    >
                      <UploadCloud size={18} />
                      Нажмите для выбора файлов
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png"
                      onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    />
                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((f) => (
                          <li key={f.name} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                            <span className="text-[#E07A2F]">•</span> {f.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Contacts */}
              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Ваше имя <span className="text-[#E07A2F]">*</span>
                    </label>
                    <input
                      {...register('name')}
                      placeholder="Как к вам обращаться"
                      className="input-field"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Email <span className="text-[#E07A2F]">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.ru"
                      className="input-field"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1E] mb-1.5">
                      Телефон <span className="text-[#6B7280] font-normal">(необязательно)</span>
                    </label>
                    <InputMask
                      mask="+7 999 999-99-99"
                      {...register('phone')}
                      placeholder="+7 999 000-00-00"
                      className="input-field"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('agreed')}
                      className="mt-0.5 h-4 w-4 rounded accent-[#E07A2F] cursor-pointer"
                    />
                    <span className="text-xs text-[#6B7280] leading-relaxed">
                      Я согласен(а) с{' '}
                      <a href="/privacy" className="text-[#E07A2F] hover:underline">
                        политикой конфиденциальности
                      </a>{' '}
                      и{' '}
                      <a href="/offer" className="text-[#E07A2F] hover:underline">
                        условиями оферты
                      </a>
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="text-xs text-red-500">{errors.agreed.message}</p>
                  )}
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={back}
                    className="btn-outline flex items-center gap-1.5 px-4 py-2.5 text-sm"
                  >
                    <ChevronLeft size={16} />
                    Назад
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-1.5"
                  >
                    Далее
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Отправляем...' : 'Отправить заявку'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
