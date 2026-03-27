import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@studyassist.ru';
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Администратор',
      isAdmin: true,
      passwordHash: await bcrypt.hash('Admin12345!', 10),
      provider: 'credentials'
    }
  });

  const reviews = [
    { name: 'Анна М.', city: 'Москва', university: 'Экономика', text: 'Сдала курсовую по экономике на отлично! Всё чётко по методичке, никаких правок не потребовалось. Спасибо огромное, буду обращаться ещё.', avatar: '/reviews/anna.png' },
    { name: 'Дмитрий К.', city: 'Санкт-Петербург', university: 'Студент, Юриспруденция', text: 'Заказывал лабораторные по программированию несколько раз. Каждый раз всё сдаётся с первого раза. Удобно что можно оплатить после того как убедился в качестве.', avatar: '/reviews/dmitriy.png' },
    { name: 'Елена С.', city: 'Тольятти', university: 'Магистрант, Психология', text: 'Диплом помогли доработать в последний момент, буквально за 3 дня. Думала уже паника, но ребята взялись и всё сделали как надо. Защитилась на 4.', avatar: '/reviews/elena.png' },
    { name: 'Михаил П.', city: 'Екатеринбург', university: 'Студент, IT', text: 'Реферат за ночь, да ещё и уникальность 85%. Цена адекватная, связь быстрая. Всё нормально.', avatar: '/reviews/mikhail.png' },
    { name: 'Ольга В.', city: 'Казань', university: 'Студентка, Медицина', text: 'Заказывала презентацию с докладом. Слайды сделали красиво, доклад логичный. Преподаватель похвалил оформление.', avatar: '/reviews/olga.png' }
  ];

  await prisma.review.createMany({
    data: reviews.map((r) => ({ ...r, rating: 5, approved: true })),
    skipDuplicates: true
  });

  console.log('Seed done', admin.id);
}

main().finally(async () => prisma.$disconnect());
