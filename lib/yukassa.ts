// eslint-disable-next-line @typescript-eslint/no-var-requires
const YooKassa = require('yookassa');

export const yukassa = new YooKassa({
  shopId: process.env.YUKASSA_SHOP_ID || '',
  secretKey: process.env.YUKASSA_SECRET_KEY || ''
});
