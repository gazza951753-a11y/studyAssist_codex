import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return NextResponse.json(await prisma.review.findMany({ where: { approved: true } }));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Нужна авторизация' }, { status: 401 });
  const body = await req.json();
  const review = await prisma.review.create({
    data: {
      userId: (session.user as any).id,
      name: session.user.name || body.name,
      text: body.text,
      rating: body.rating,
      avatar: session.user.image || body.avatar,
      approved: false
    }
  });
  return NextResponse.json(review);
}
