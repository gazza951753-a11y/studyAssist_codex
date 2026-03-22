import { prisma } from '@/lib/prisma';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  return <main className="container-main py-12"><h1 className="text-3xl font-bold">Пользователи</h1><p className="mt-4">Всего: {users.length}</p></main>;
}
