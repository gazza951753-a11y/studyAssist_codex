'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#how',      label: 'Как работает' },
  { href: '#pricing',  label: 'Цены' },
  { href: '#reviews',  label: 'Отзывы' }
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-border'
          : 'bg-background border-b border-border'
      }`}
    >
      <div className="container-main flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 text-2xl font-extrabold tracking-tight text-textPrimary">
          StudyAssist<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-textSecondary transition-colors duration-150 hover:text-textPrimary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="btn-outline py-2 px-4 text-sm"
          >
            Войти
          </Link>
          <a
            href="#order"
            className="btn-primary py-2 px-4 text-sm"
          >
            Получить консультацию
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          className="md:hidden rounded-lg p-2 text-textSecondary hover:text-textPrimary hover:bg-cardBg transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="container-main border-t border-border bg-surface pb-5 pt-4 space-y-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/auth/login" className="btn-outline text-sm text-center">
              Войти
            </Link>
            <a href="#order" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">
              Получить консультацию
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
