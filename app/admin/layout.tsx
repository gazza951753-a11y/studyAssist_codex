import { headers } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function checkBasicAuth(authHeader: string | null, secret: string | undefined) {
  if (!authHeader || !secret) return false;
  const [type, encoded] = authHeader.split(' ');
  if (type !== 'Basic' || !encoded) return false;
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [, password] = decoded.split(':');
  return password === secret;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const adminExists = (await prisma.user.count({ where: { isAdmin: true } })) > 0;

  if ((session as any)?.user?.isAdmin) return <>{children}</>;

  if (!adminExists) {
    const authHeader = headers().get('authorization');
    if (checkBasicAuth(authHeader, process.env.ADMIN_SECRET)) return <>{children}</>;
  }

  redirect('/auth/login');
}
