import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function priceFormatter(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function orderStatus(status: string) {
  switch (status) {
    case 'paid':
      
      break;
  
    default:
      break;
  }
}

export function capitalizeFirstLetter(word: string) {
const capitalizedString = word.charAt(0).toUpperCase() + word.slice(1);
return capitalizedString;
}