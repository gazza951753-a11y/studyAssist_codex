import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateRu = (value: Date | string) =>
  new Intl.DateTimeFormat('ru-RU').format(new Date(value));

export const formatCurrency = (value: number | string) => `${Number(value).toLocaleString('ru-RU')} ₽`;

export const orderDisplayId = (id: string | number) => `#${String(id).replace(/\D/g, '').slice(-5).padStart(5, '0')}`;
