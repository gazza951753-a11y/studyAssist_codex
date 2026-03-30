import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://studyassist.ru'),
  title: 'StudyAssist — Сервис консультаций для студентов',
  description: 'Консультации для студентов: репетиторство, разбор тем, подготовка к зачётам и экзаменам, подбор учебных материалов. Конфиденциально и профессионально.',
  keywords: 'консультации студентам, репетиторство, помощь в обучении, подготовка к экзаменам, учебные материалы, StudyAssist',
  openGraph: {
    title: 'StudyAssist — Помощь студентам с учёбой',
    description: 'Консультации, наставничество и учебные материалы для студентов.',
    url: 'https://studyassist.ru',
    images: ['/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyAssist — помощь студентам',
    description: 'Быстро, качественно и конфиденциально.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const metrikaId = process.env.NEXT_PUBLIC_METRIKA_ID;

  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        {metrikaId && (
          <>
            <Script id="metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}', 'ym'); ym(${metrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
            </Script>
            <noscript><div><img src={`https://mc.yandex.ru/watch/${metrikaId}`} style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
          </>
        )}
      </body>
    </html>
  );
}
