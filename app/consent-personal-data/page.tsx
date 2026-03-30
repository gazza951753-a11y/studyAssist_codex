import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { consentPdText } from '@/lib/legal';

export default function Page() {
  return <><Navbar/><main className="container-main py-12"><article className="glass whitespace-pre-wrap rounded-2xl p-6 text-sm leading-7 text-textSecondary">{consentPdText}</article></main><Footer/></>;
}
