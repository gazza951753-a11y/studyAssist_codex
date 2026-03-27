'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container-main py-20">
      <div className="glass mx-auto max-w-xl rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold">Что-то пошло не так</h2>
        <p className="mt-3 text-textSecondary">Произошла ошибка. Попробуйте обновить страницу или повторить действие позже.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-brand-gradient px-5 py-2 font-semibold">Повторить</button>
      </div>
    </main>
  );
}
