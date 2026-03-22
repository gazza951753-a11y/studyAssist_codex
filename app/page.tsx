import Script from 'next/script';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FaqSection } from '@/components/home/FaqSection';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { OrderForm } from '@/components/home/OrderForm';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServicesSection } from '@/components/home/ServicesSection';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'StudyAssist', url: 'https://studyassist.ru', email: 'support@studyassist.ru' },
    {
      '@type': 'WebSite',
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
        { '@type': 'Question', name: 'Как быстро вы проводите консультации?', acceptedAnswer: { '@type': 'Answer', text: 'От нескольких часов до нескольких дней, в зависимости от сложности задания.' } },
        { '@type': 'Question', name: 'Гарантируете ли вы уникальность?', acceptedAnswer: { '@type': 'Answer', text: 'Да, обеспечиваем уникальность не менее 80% по Антиплагиат.' } },
        { '@type': 'Question', name: 'Когда нужно платить?', acceptedAnswer: { '@type': 'Answer', text: 'После согласования стоимости. Консультация начинается после оплаты тарифа.' } },
        { '@type': 'Question', name: 'Можно ли вносить правки?', acceptedAnswer: { '@type': 'Answer', text: 'Да, бесплатные правки доступны в течение 3 дней после сдачи.' } },
        { '@type': 'Question', name: 'Конфиденциально ли это?', acceptedAnswer: { '@type': 'Answer', text: 'Да, данные защищены и не передаются третьим лицам.' } }
      ]
    },
    { '@type': 'AggregateRating', itemReviewed: { '@type': 'Organization', name: 'StudyAssist' }, ratingValue: '5', reviewCount: '5' }
  ]
};

export default function HomePage() {
  return (
    <>
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <ServicesSection />
        <OrderForm />
        <ReviewsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
