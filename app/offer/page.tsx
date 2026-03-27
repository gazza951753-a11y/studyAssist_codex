import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { offerText } from '@/lib/legal';

export default function OfferPage() {
  return <><Navbar/><main className="container-main py-12"><article className="glass whitespace-pre-wrap rounded-2xl p-6 text-sm leading-7 text-textSecondary">{offerText}</article></main><Footer/></>;
}
