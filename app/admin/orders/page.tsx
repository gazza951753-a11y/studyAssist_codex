import { prisma } from '@/lib/prisma';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return <main className="container-main py-12"><h1 className="text-3xl font-bold">Заявки</h1><div className="mt-6 space-y-2">{orders.map((o)=> <div key={o.id} className="glass rounded-xl p-4">{o.subject} — {o.status}</div>)}</div></main>;
}
