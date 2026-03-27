import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-main py-20 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-textSecondary">Страница не найдена.</p>
      <Link href="/" className="mt-5 inline-block rounded-xl bg-brand-gradient px-5 py-2 font-semibold">На главную</Link>
    </main>
  );
}
