'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

type CartPreviewProps = {
  isOpen: boolean;
};

export default function CartPreview({ isOpen }: CartPreviewProps) {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: number, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, color } });
  };

  return (
    <div 
      className={`
        absolute top-full right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50
        transform transition-all duration-300 origin-top
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Cart ({state.items.length})</h3>
        
        {state.items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-h-64 overflow-auto">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex gap-3 group">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.color)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${item.price * item.quantity}</p>
                    </div>
                    <Link
                      href={`/product/${item.id}`}
                      className="text-xs text-gray-500 hover:text-gray-700 mt-1 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">${state.total}</span>
              </div>
              
              <Link
                href="/cart"
                className="block w-full bg-gray-900 text-white text-center py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 