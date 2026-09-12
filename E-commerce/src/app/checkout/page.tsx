'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useToast } from '@/context/ToastContext';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutFormData, CheckoutFormErrors } from '@/types/checkout';
import { Address } from '@/types/user';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, shippingCost, taxAmount, totalAmount, shippingMethod, setShippingMethod, clearCart, appliedPromo } = useCart();
  const { user, addAddress } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<CheckoutFormErrors>({});

  // Initialize checkout form with active user details if available
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: user?.email || '',
    fullName: user?.name || '',
    phone: user?.phone || '',
    street1: user?.addresses?.[0]?.street1 || '',
    street2: user?.addresses?.[0]?.street2 || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    country: user?.addresses?.[0]?.country || 'India',
    saveAddressToProfile: false,
    shippingMethod: shippingMethod,
    paymentMethod: 'card',
    cardholderName: user?.name || '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    billingSameAsShipping: true,
    orderNotes: '',
  });

  // Sync shipping method between cart and form
  useEffect(() => {
    setShippingMethod(formData.shippingMethod);
  }, [formData.shippingMethod, setShippingMethod]);

  // Autofill from a specific saved address
  const handleAutofillAddress = (addr: Address) => {
    setFormData((prev) => ({
      ...prev,
      fullName: addr.fullName,
      phone: addr.phone || prev.phone,
      street1: addr.street1,
      street2: addr.street2 || '',
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    }));
    toast(`Autofilled shipping details from "${addr.label}"`, 'info');
  };

  // Demo card quick fill
  const handleFillDemoCard = () => {
    setFormData((prev) => ({
      ...prev,
      cardholderName: prev.fullName || 'Alex Mercer',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '12/28',
      cardCvv: '742',
    }));
    toast('Demo test Visa card details populated', 'info');
  };

  const handleFieldChange = (field: keyof CheckoutFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Comprehensive Client-Side Form Validation Engine
  const validateForm = (): boolean => {
    const errors: CheckoutFormErrors = {};

    // 1. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    // 2. Full Name validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'Full legal recipient name is required (min 3 characters)';
    }

    // 3. Phone validation
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'Contact phone number is required';
    } else if (phoneClean.length < 10) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    // 4. Address fields validation
    if (!formData.street1.trim()) {
      errors.street1 = 'Street address line is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City name is required';
    }
    if (!formData.state.trim()) {
      errors.state = 'State / Province is required';
    }
    if (!formData.postalCode.trim() || formData.postalCode.trim().length < 4) {
      errors.postalCode = 'Valid postal / ZIP code is required';
    }

    // 5. Payment method specific validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardholderName.trim()) {
        errors.cardholderName = 'Cardholder name is required';
      }
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (!cleanCard) {
        errors.cardNumber = '16-digit card number is required';
      } else if (cleanCard.length !== 16) {
        errors.cardNumber = 'Card number must be exactly 16 digits';
      }

      if (!formData.cardExpiry.trim()) {
        errors.cardExpiry = 'Expiry date MM/YY is required';
      } else {
        const [month, year] = formData.cardExpiry.split('/');
        const numMonth = parseInt(month, 10);
        if (!month || !year || numMonth < 1 || numMonth > 12) {
          errors.cardExpiry = 'Invalid month (01-12)';
        }
      }

      if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) {
        errors.cardCvv = 'CVV code must be 3 or 4 digits';
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
        errors.upiId = 'Please provide a valid UPI Virtual Address (e.g. name@okhdfcbank)';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast('Your cart is empty', 'error');
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      toast('Please review and correct the highlighted fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate realistic payment gateway handshake (800ms)
      await new Promise((r) => setTimeout(r, 800));

      // Build shipping address object
      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        label: 'Order Address',
        fullName: formData.fullName,
        street1: formData.street1,
        street2: formData.street2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
        isDefault: false,
      };

      // Save to user profile address book if checkbox is enabled
      if (formData.saveAddressToProfile && user) {
        addAddress({
          label: `${formData.city} Address`,
          fullName: formData.fullName,
          street1: formData.street1,
          street2: formData.street2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
          isDefault: false,
        });
      }

      // Build order payload
      const order = createOrder({
        userId: user?.id || 'guest-user',
        customerName: formData.fullName,
        customerEmail: formData.email,
        items: items.map((item) => ({
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        shippingAddress,
        shippingMethod: formData.shippingMethod,
        shippingCost,
        payment: {
          method: formData.paymentMethod,
          transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}-AUTH`,
          status: 'paid',
          last4: formData.paymentMethod === 'card' ? formData.cardNumber.slice(-4) || '4242' : undefined,
          cardBrand: formData.paymentMethod === 'card' ? 'Visa Signature' : undefined,
          upiId: formData.paymentMethod === 'upi' ? formData.upiId : undefined,
          paidAt: new Date().toISOString(),
        },
        pricing: {
          subtotal,
          discount: discountAmount,
          shipping: shippingCost,
          tax: taxAmount,
          total: totalAmount,
          promoCode: appliedPromo?.code,
        },
        notes: formData.orderNotes,
      });

      // Launch celebratory particle confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error('Confetti trigger error', e);
      }

      // Empty cart and redirect to live tracking page
      clearCart();
      toast('Order authorized and successfully placed!', 'success');
      router.push(`/orders/${order.id}`);
    } catch (e) {
      console.error('Order submission failed', e);
      toast('An error occurred during order submission. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-zinc-400">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Bag
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Client-Side Verified Checkout
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Complete your contact, shipping destination, and secure payment method.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Gateway</span>
        </div>
      </div>

      {/* Main Checkout Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Client-Side Forms */}
        <div className="lg:col-span-8 space-y-10">
          {/* Section 1: Shipping Form */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <ShippingForm
              formData={formData}
              errors={formErrors}
              onChange={handleFieldChange}
              onAutofillAddress={handleAutofillAddress}
            />
          </div>

          {/* Section 2: Payment Form */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <PaymentForm
              formData={formData}
              errors={formErrors}
              onChange={handleFieldChange}
              onFillDemoCard={handleFillDemoCard}
            />
          </div>
        </div>

        {/* Right Column: Sticky Order Summary & Submit Button */}
        <div className="lg:col-span-4">
          <OrderSummary
            isSubmitting={isSubmitting}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}
