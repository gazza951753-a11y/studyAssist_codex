'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#how', label: 'Как проходит консультация' },
  { href: '#prices', label: 'Цены' },
  { href: '#reviews', label: 'Отзывы' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="bg-brand-gradient bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">StudyAssist</Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-textSecondary transition hover:text-textPrimary">{link.label}</a>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/auth/login" className="rounded-xl border border-white/20 px-4 py-2 text-sm">Войти</Link>
          <a href="#order" className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold shadow-glow">Получить консультацию</a>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden"><Menu /></button>
      </div>
      {open && (
        <div className="container-main space-y-3 pb-4 md:hidden">
          {links.map((link) => <a className="block text-textSecondary" href={link.href} key={link.href}>{link.label}</a>)}
          <div className="flex gap-2">
            <Link href="/auth/login" className="rounded-xl border border-white/20 px-3 py-2 text-sm">Войти</Link>
            <a href="#order" className="rounded-xl bg-brand-gradient px-3 py-2 text-sm font-semibold">Получить консультацию</a>
          </div>
        </div>
      )}
    </nav>
  );
}
