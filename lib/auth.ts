import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import YandexProvider from 'next-auth/providers/yandex';
import { prisma } from './prisma';

const VkIdProvider = {
  id: 'vk',
  name: 'ВКонтакте',
  type: 'oauth',
  issuer: 'https://id.vk.com',
  wellKnown: 'https://id.vk.com/.well-known/openid-configuration',
  clientId: process.env.VK_CLIENT_ID,
  clientSecret: process.env.VK_CLIENT_SECRET,
  idToken: true,
  checks: ['pkce', 'state'],
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.name || [profile.first_name, profile.last_name].filter(Boolean).join(' '),
      email: profile.email,
      image: profile.picture
    };
  }
} as any;

const MailruProvider = {
  id: 'mailru',
  name: 'Mail.ru',
  type: 'oauth',
  wellKnown: 'https://oauth.mail.ru/.well-known/openid-configuration',
  authorization: { params: { scope: 'openid profile email' } },
  idToken: true,
  clientId: process.env.MAILRU_CLIENT_ID,
  clientSecret: process.env.MAILRU_CLIENT_SECRET,
  profile(profile: any) {
    return { id: profile.sub || profile.id, name: profile.name, email: profile.email, image: profile.picture };
  }
} as any;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Пароль', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user?.passwordHash) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.avatar };
      }
    }),
    VkIdProvider,
    MailruProvider,
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || '',
      clientSecret: process.env.YANDEX_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = user.id;
      const dbUser = token.email ? await prisma.user.findUnique({ where: { email: token.email } }) : null;
      if (dbUser) token.isAdmin = dbUser.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    }
  },
  pages: { signIn: '/auth/login' }
};
