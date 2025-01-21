'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CheckoutForm = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

export default function Checkout() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Validate the form
    // 2. Process the payment
    // 3. Create the order
    // 4. Clear the cart
    // For now, we'll just simulate a successful order
    alert('Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
    router.push('/');
  };

  if (state.items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Color: {item.color} | Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${state.total}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between mt-2 text-lg font-semibold">
                    <span>Total</span>
                    <span>${state.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 