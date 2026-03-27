import Link from 'next/link';
import { Mail, Phone, Send, MessageCircle, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-main grid gap-8 md:grid-cols-3">
        <div>
          <p className="bg-brand-gradient bg-clip-text text-2xl font-bold text-transparent">StudyAssist</p>
          <p className="mt-2 text-textSecondary">Индивидуальный подход к каждому студенту.</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/privacy">Политика конфиденциальности</Link><br/>
          <Link href="/offer">Пользовательское соглашение</Link><br/>
          <Link href="/refund-policy">Правила возврата и оплаты</Link><br/>
          <Link href="/consent-personal-data">Согласие на обработку ПДн</Link><br/>
          <Link href="/consent-marketing">Согласие на рассылки</Link>
        </div>
        <div className="space-y-2 text-sm text-textSecondary">
          <p className="flex items-center gap-2"><Mail size={16}/> support@studyassist.ru</p>
          <p className="flex items-center gap-2"><Phone size={16}/> +7-953-924-68-17</p>
          <p className="flex items-center gap-2"><Send size={16}/> @studyAssist_support</p>
          <p className="flex items-center gap-2"><MessageCircle size={16}/> vk.ru/supp0rt_studyassist</p>
          <p className="flex items-center gap-2"><MessageCircle size={16}/> max.ru/u/f9LHodD0cOKKqte1G0iOkuvcpOxTcT_Ij63H_NRW1G01Mzd5cDnBJdmEom8</p>
          <a className="flex items-center gap-2" href="https://yookassa.ru/guide-instruction/#logos" target="_blank"><CreditCard size={16}/> YooKassa</a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-textSecondary">© 2025 StudyAssist.ru</p>
    </footer>
  );
}
