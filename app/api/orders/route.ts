import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { sendSupportEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';

export const runtime = 'nodejs';

const allowedExt = new Set(['.pdf', '.doc', '.docx', '.txt', '.zip', '.jpg', '.jpeg', '.png']);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const form = await req.formData();

  const type = String(form.get('type') || '');
  const subject = String(form.get('subject') || '');
  const deadline = String(form.get('deadline') || '');
  const description = String(form.get('description') || '');
  const name = String(form.get('name') || '');
  const email = String(form.get('email') || '');
  const phone = String(form.get('phone') || '');
  const agreed = String(form.get('agreed') || '') === 'true';

  if (!type || !subject || !deadline || description.length < 50 || !name || !email || !agreed) {
    return NextResponse.json({ error: 'Проверьте корректность заполнения формы.' }, { status: 400 });
  }

  const files = form.getAll('files') as File[];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 50 * 1024 * 1024) {
    return NextResponse.json({ error: 'Максимальный размер файлов: 50MB' }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      userId: (session?.user as any)?.id,
      type,
      subject,
      deadline: new Date(deadline),
      description,
      status: 'new'
    }
  });

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', order.id);
  await mkdir(uploadDir, { recursive: true });

  const savedPaths: string[] = [];
  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!allowedExt.has(ext)) continue;
    const target = path.join(uploadDir, file.name.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, '_'));
    const bytes = await file.arrayBuffer();
    await writeFile(target, Buffer.from(bytes));
    savedPaths.push(target.replace(path.join(process.cwd(), 'public'), ''));
  }

  if (savedPaths.length) {
    await prisma.order.update({ where: { id: order.id }, data: { files: JSON.stringify(savedPaths) } });
  }

  const text = `📋 Новый запрос консультации #${order.id}\nТип: ${type}\nПредмет: ${subject}\nДедлайн: ${deadline}\nОписание: ${description}\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone || 'не указан'}\nФайлы: ${savedPaths.length} шт.`;

  await Promise.all([
    sendTelegramMessage(text),
    sendSupportEmail(
      `Новый запрос ${order.id}`,
      `<pre>${text}</pre>`,
      savedPaths.map((f) => ({ filename: path.basename(f), path: path.join(process.cwd(), 'public', f) }))
    )
  ]);

  const orderNumber = `#${order.id.replace(/\D/g, '').slice(-5).padStart(5, '0')}`;
  return NextResponse.json({ id: order.id, orderNumber });
}

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(orders);
}
