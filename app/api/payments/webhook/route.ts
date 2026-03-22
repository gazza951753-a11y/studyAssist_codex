import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const bodyText = await req.text();
  const signature = req.headers.get('x-content-hmac') || '';
  const expected = crypto.createHmac('sha256', process.env.YUKASSA_SECRET_KEY || '').update(bodyText).digest('hex');
  if (signature && signature !== expected) return NextResponse.json({ error: 'invalid signature' }, { status: 401 });

  const payload = JSON.parse(bodyText);
  if (payload.event === 'payment.succeeded') {
    const paymentId = payload.object.id as string;
    const order = await prisma.order.findFirst({ where: { paymentId } });
    if (order) {
      await prisma.payment.create({ data: { orderId: order.id, userId: order.userId || undefined, amount: order.price || 0, status: 'succeeded', yukassaId: paymentId } });
      await prisma.order.update({ where: { id: order.id }, data: { status: 'paid' } });
    }
  }

  return NextResponse.json({ ok: true });
}
