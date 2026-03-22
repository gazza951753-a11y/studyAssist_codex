'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8), confirm: z.string(), agree: z.boolean().refine(Boolean) }).refine((v)=>v.password===v.confirm, { message: 'Пароли не совпадают', path: ['confirm'] });

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  return (
    <main className="container-main py-20">
      <div className="mx-auto max-w-md glass rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit(async (v)=>{
          await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: v.name, email: v.email, password: v.password }) });
          location.href = '/auth/login';
        })}>
          <input {...register('name')} className="w-full rounded-lg bg-surface p-3" placeholder="Имя" />
          <input {...register('email')} className="w-full rounded-lg bg-surface p-3" placeholder="Email" />
          <input type="password" {...register('password')} className="w-full rounded-lg bg-surface p-3" placeholder="Пароль" />
          <input type="password" {...register('confirm')} className="w-full rounded-lg bg-surface p-3" placeholder="Повтор пароля" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('agree')} /> Принимаю условия соглашения</label>
          <button className="w-full rounded-lg bg-brand-gradient p-3">Зарегистрироваться</button>
        </form>
        <p className="mt-4 text-sm">Уже есть аккаунт? <Link href="/auth/login" className="text-accent">Войти</Link></p>
      </div>
    </main>
  );
}
