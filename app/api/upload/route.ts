import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const form = await req.formData();
  const files = form.getAll('files') as File[];
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > 50 * 1024 * 1024) return NextResponse.json({ error: 'Превышен лимит 50MB' }, { status: 400 });

  const folder = path.join(process.cwd(), 'public', 'uploads', Date.now().toString());
  await mkdir(folder, { recursive: true });
  const stored: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const filePath = path.join(folder, file.name);
    await writeFile(filePath, Buffer.from(bytes));
    stored.push(filePath.replace(path.join(process.cwd(), 'public'), ''));
  }

  return NextResponse.json({ files: stored });
}
