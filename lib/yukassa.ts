import { YooCheckout } from 'yookassa';

export const yukassa = new YooCheckout({
  shopId: process.env.YUKASSA_SHOP_ID || '',
  secretKey: process.env.YUKASSA_SECRET_KEY || ''
});
