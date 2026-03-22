import { prisma } from '@/lib/prisma';

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ where: { approved: false } });
  return <main className="container-main py-12"><h1 className="text-3xl font-bold">Модерация отзывов</h1><p className="mt-4">Ожидают: {reviews.length}</p></main>;
}
