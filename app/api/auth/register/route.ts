import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const exists = await prisma.user.findUnique({ where: { email: body.email } });
  if (exists) return NextResponse.json({ error: 'Пользователь уже существует' }, { status: 409 });
  await prisma.user.create({ data: { email: body.email, name: body.name, passwordHash: await hash(body.password, 10), provider: 'credentials' } });
  return NextResponse.json({ ok: true });
}
