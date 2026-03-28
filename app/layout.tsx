import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://studyassist.ru'),
  title: {
    default: 'StudyAssist — Помощь студентам с учёбой онлайн | Курсовые, Рефераты, Консультации',
    template: '%s | StudyAssist'
  },
  description:
    'StudyAssist — профессиональная помощь студентам: курсовые, дипломные, рефераты, лабораторные работы, онлайн-консультации. Быстро, качественно, конфиденциально.',
  keywords: [
    'помощь студентам',
    'курсовые работы',
    'дипломные работы',
    'рефераты на заказ',
    'лабораторные работы',
    'онлайн репетитор',
    'консультации для студентов',
    'StudyAssist',
    'подготовка к экзаменам',
    'помощь с учёбой',
    'написание курсовой',
    'написание диплома'
  ],
  authors: [{ name: 'StudyAssist', url: 'https://studyassist.ru' }],
  creator: 'StudyAssist',
  publisher: 'StudyAssist',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 }
  },
  alternates: { canonical: 'https://studyassist.ru' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://studyassist.ru',
    siteName: 'StudyAssist',
    title: 'StudyAssist — Помощь студентам с учёбой онлайн',
    description:
      'Курсовые, дипломные, рефераты, лабораторные работы и онлайн-консультации. Помогаем студентам разобраться в любой учебной теме.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'StudyAssist — помощь студентам' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyAssist — Помощь студентам онлайн',
    description: 'Курсовые, дипломные, рефераты, консультации. Быстро и конфиденциально.',
    images: ['/og-image.jpg']
  },
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://studyassist.ru/#business',
      name: 'StudyAssist',
      url: 'https://studyassist.ru',
      logo: 'https://studyassist.ru/logo.png',
      email: 'support@studyassist.ru',
      telephone: '+7-953-924-68-17',
      description: 'Профессиональная помощь студентам: курсовые, дипломные, рефераты, лабораторные работы, онлайн-консультации.',
      priceRange: '₽₽',
      areaServed: { '@type': 'Country', name: 'Россия' },
      sameAs: ['https://vk.ru/supp0rt_studyassist'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1000',
        bestRating: '5',
        worstRating: '1'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://studyassist.ru/#website',
      name: 'StudyAssist',
      url: 'https://studyassist.ru',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://studyassist.ru/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Как быстро выполняются работы?',
          acceptedAnswer: { '@type': 'Answer', text: 'Сроки зависят от объёма и сложности: рефераты — от 1 дня, курсовые — от 3 дней, дипломные — от 7 дней.' }
        },
        {
          '@type': 'Question',
          name: 'Гарантируете ли вы уникальность?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, гарантируем уникальность не менее 80% по системе Антиплагиат.' }
        },
        {
          '@type': 'Question',
          name: 'Конфиденциально ли это?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, все данные защищены. Мы не передаём персональную информацию третьим лицам.' }
        },
        {
          '@type': 'Question',
          name: 'Когда нужно платить?',
          acceptedAnswer: { '@type': 'Answer', text: 'Оплата производится после согласования всех условий и стоимости работы.' }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const metrikaId = process.env.NEXT_PUBLIC_METRIKA_ID;

  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <Script
          id="jsonld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-textPrimary antialiased`}>
        {children}

        {metrikaId && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${metrikaId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,ecommerce:'dataLayer'});`}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${metrikaId}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
