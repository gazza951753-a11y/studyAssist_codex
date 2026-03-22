import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { yukassa } from '@/lib/yukassa';

export async function POST(req: Request) {
  const body = await req.json();
  const order = await prisma.order.findUnique({ where: { id: body.orderId } });
  if (!order || !order.price) return NextResponse.json({ error: 'Не указана стоимость' }, { status: 400 });

  const payment = await yukassa.createPayment({
    amount: { value: order.price.toString(), currency: 'RUB' },
    confirmation: { type: 'redirect', return_url: process.env.YUKASSA_RETURN_URL || '' },
    capture: true,
    description: `Оплата консультации ${order.id}`
  });

  await prisma.order.update({ where: { id: order.id }, data: { paymentLink: payment.confirmation.confirmation_url, paymentId: payment.id, status: 'waiting_payment' } });

  return NextResponse.json({ url: payment.confirmation.confirmation_url });
}
