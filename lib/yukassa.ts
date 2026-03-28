// eslint-disable-next-line @typescript-eslint/no-var-requires
const yookassaLib = require('yookassa');
const YooCheckout = yookassaLib.YooCheckout ?? yookassaLib.default?.YooCheckout ?? yookassaLib.default;

export const yukassa = new YooCheckout({
  shopId: process.env.YUKASSA_SHOP_ID || '',
  secretKey: process.env.YUKASSA_SECRET_KEY || ''
});
