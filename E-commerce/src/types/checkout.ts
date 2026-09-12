export type ShippingMethodId = 'standard' | 'express' | 'overnight';
export type PaymentMethodType = 'card' | 'upi' | 'cod';

export interface ShippingMethodOption {
  id: ShippingMethodId;
  name: string;
  duration: string;
  price: number;
}

export interface CheckoutFormData {
  // Contact & Shipping
  email: string;
  fullName: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveAddressToProfile: boolean;

  // Shipping Selection
  shippingMethod: ShippingMethodId;

  // Payment Selection
  paymentMethod: PaymentMethodType;

  // Card Payment
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;

  // UPI Payment
  upiId: string;

  // Additional options
  billingSameAsShipping: boolean;
  orderNotes: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export interface CartItem {
  id: string; // composite key: productId + color + size
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stockCount: number;
  selectedColor?: string;
  selectedSize?: string;
}
