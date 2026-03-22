import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const [totalOrders, todayOrders, payments] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: new Date(new Date().toDateString()) } } }),
    prisma.payment.aggregate({ _sum: { amount: true } })
  ]);

  return <main className="container-main py-12"><h1 className="text-3xl font-bold">Админ-панель</h1><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="glass rounded-2xl p-4">Всего заявок: {totalOrders}</div><div className="glass rounded-2xl p-4">Новых сегодня: {todayOrders}</div><div className="glass rounded-2xl p-4">Выручка: {payments._sum.amount?.toString() || '0'} ₽</div></div></main>;
}
