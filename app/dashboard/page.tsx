import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDateRu } from '@/lib/utils';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/auth/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { orders: true, payments: true } });
  if (!user) redirect('/auth/login');

  return (
    <main className="container-main py-12">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>
      <section className="mt-6 glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Мои запросы</h2>
        <div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-textSecondary"><th>ID</th><th>Тип</th><th>Предмет</th><th>Дедлайн</th><th>Статус</th><th>Сумма</th></tr></thead><tbody>{user.orders.map((o)=> <tr key={o.id} className="border-t border-white/10"><td>{o.id.slice(-5)}</td><td>{o.type}</td><td>{o.subject}</td><td>{formatDateRu(o.deadline)}</td><td>{o.status}</td><td>{o.price ? formatCurrency(o.price.toString()) : '—'}</td></tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
