'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="container-main py-20">
      <div className="mx-auto max-w-md glass rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Вход</h1>
        <form className="mt-4 space-y-3" onSubmit={(e)=>{e.preventDefault(); signIn('credentials', { email, password, callbackUrl: '/dashboard' });}}>
          <input className="w-full rounded-lg bg-surface p-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="w-full rounded-lg bg-surface p-3" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="w-full rounded-lg bg-brand-gradient p-3">Войти</button>
        </form>
        <p className="my-4 text-center text-sm text-textSecondary">или войти через</p>
        <div className="grid gap-2">
          <button onClick={()=>signIn('vk', { callbackUrl: '/dashboard' })} className="rounded-lg border border-white/20 p-2">ВКонтакте</button>
          <button onClick={()=>signIn('mailru', { callbackUrl: '/dashboard' })} className="rounded-lg border border-white/20 p-2">Mail.ru</button>
          <button onClick={()=>signIn('yandex', { callbackUrl: '/dashboard' })} className="rounded-lg border border-white/20 p-2">Яндекс</button>
        </div>
        <p className="mt-4 text-sm">Нет аккаунта? <Link href="/auth/register" className="text-accent">Регистрация</Link></p>
      </div>
    </main>
  );
}
