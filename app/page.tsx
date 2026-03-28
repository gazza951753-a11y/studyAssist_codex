import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FaqSection } from '@/components/home/FaqSection';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { OrderForm } from '@/components/home/OrderForm';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { PricingSection } from '@/components/home/PricingSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <HowItWorks />
        <PricingSection />
        <OrderForm />
        <ReviewsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
