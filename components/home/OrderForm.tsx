'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, CheckCircle2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { z } from 'zod';

const schema = z.object({
  type: z.string().min(1, 'Выберите формат консультации'),
  subject: z.string().min(2, 'Укажите предмет'),
  deadline: z.string().min(1, 'Выберите дедлайн'),
  description: z.string().min(50, 'Минимум 50 символов'),
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Некорректный email'),
  phone: z.string().optional(),
  agreed: z.boolean().refine((v) => v, 'Требуется согласие')
});

type FormData = z.infer<typeof schema>;

export function OrderForm() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: '', subject: '', deadline: '', description: '', name: '', email: '', phone: '', agreed: false }
  });

  const validateStep = async () => {
    if (step === 1) return form.trigger(['type', 'subject', 'deadline']);
    if (step === 2) return form.trigger(['description']);
    return form.trigger(['name', 'email', 'phone', 'agreed']);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSending(true);
    try {
      const data = new FormData();
      Object.entries(values).forEach(([k, v]) => data.append(k, String(v ?? '')));
      files.forEach((file) => data.append('files', file));

      const res = await fetch('/api/orders', { method: 'POST', body: data });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Не удалось отправить запрос');

      setSuccess(payload.orderNumber);
      (window as any).ym?.(process.env.NEXT_PUBLIC_METRIKA_ID, 'reachGoal', 'order_submit');
    } catch (error: any) {
      alert(error.message || 'Ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      setSending(false);
    }
  });

  if (success) {
    return (
      <section id="order" className="container-main py-16">
        <div className="glass rounded-2xl p-8 text-center">
          <CheckCircle2 className="mx-auto text-green-400" size={40} />
          <h2 className="mt-4 text-2xl font-bold">Заявка отправлена</h2>
          <p className="mt-2 text-textSecondary">Номер вашего запроса: <span className="font-semibold text-textPrimary">{success}</span></p>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="container-main py-16">
      <h2 className="text-3xl font-bold">Оставить запрос</h2>
      <p className="mt-2 text-textSecondary">Шаг {step} из 3</p>

      <form onSubmit={onSubmit} className="glass mt-6 space-y-5 rounded-2xl p-6">
        {step === 1 && (
          <>
            <select {...form.register('type')} className="w-full rounded-lg bg-surface p-3">
              <option value="">Формат консультации</option>
              <option value="coursework">Разбор курсового проекта</option>
              <option value="diploma">Консультация по ВКР</option>
              <option value="essay">Консультация по теме/эссе</option>
              <option value="lab">Разбор лабораторных и задач</option>
              <option value="presentation">Подготовка презентации/доклада</option>
              <option value="other">Другое</option>
            </select>
            <input {...form.register('subject')} placeholder="Дисциплина / предмет" className="w-full rounded-lg bg-surface p-3" />
            <label className="flex items-center gap-2 text-sm text-textSecondary"><Calendar size={16}/> Дедлайн</label>
            <input type="date" min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} {...form.register('deadline')} className="w-full rounded-lg bg-surface p-3" />
          </>
        )}

        {step === 2 && (
          <>
            <textarea {...form.register('description')} className="h-36 w-full rounded-lg bg-surface p-3" placeholder="Подробно опишите ваш учебный запрос: тема, формат, дедлайн, цели (минимум 50 символов)" />
            <label className="text-sm text-textSecondary">Файлы (до 50MB суммарно)</label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 p-4 text-sm text-textSecondary hover:border-white/40">
              <UploadCloud size={16} /> Перетащите файлы или нажмите для выбора
              <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            </label>
            {files.length > 0 && <ul className="space-y-1 text-sm text-textSecondary">{files.map((f) => <li key={f.name}>• {f.name}</li>)}</ul>}
          </>
        )}

        {step === 3 && (
          <>
            <input {...form.register('name')} placeholder="Имя" className="w-full rounded-lg bg-surface p-3" />
            <input {...form.register('email')} placeholder="Email" className="w-full rounded-lg bg-surface p-3" />
            <InputMask mask="+7 999 999-99-99" {...form.register('phone')} placeholder="Телефон (необязательно)" className="w-full rounded-lg bg-surface p-3" />
            <label className="flex items-start gap-2 text-sm text-textSecondary"><input type="checkbox" className="mt-1" {...form.register('agreed')} /> Согласен(а) с обработкой персональных данных и условиями оферты.</label>
          </>
        )}

        {Object.values(form.formState.errors)[0]?.message && (
          <p className="text-sm text-red-400">{String(Object.values(form.formState.errors)[0]?.message)}</p>
        )}

        <div className="flex gap-2">
          {step > 1 && <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-lg border border-white/20 px-4 py-2">Назад</button>}
          {step < 3 ? (
            <button
              type="button"
              onClick={async () => {
                const ok = await validateStep();
                if (ok) setStep((s) => s + 1);
              }}
              className="rounded-lg bg-brand-gradient px-4 py-2 font-semibold"
            >
              Далее
            </button>
          ) : (
            <button disabled={sending} className="rounded-lg bg-brand-gradient px-4 py-2 font-semibold disabled:opacity-70">{sending ? 'Отправляем...' : 'Отправить запрос'}</button>
          )}
        </div>
      </form>
    </section>
  );
}
