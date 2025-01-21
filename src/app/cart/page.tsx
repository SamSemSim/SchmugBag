'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, color: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id, color } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, color, quantity } });
    }
  };

  const removeItem = (id: number, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, color } });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/collection"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {state.items.map((item) => (
              <div key={`${item.id}-${item.color}`} className="flex gap-6 py-6 border-b">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id, item.color)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">Color: {item.color}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${state.total}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 