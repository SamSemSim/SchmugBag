'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import CartPreview from './CartPreview';

export default function NavBar() {
  const { state } = useCart();
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsBouncing(true);
    const timer = setTimeout(() => setIsBouncing(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SchmugBags
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/collection" className="text-gray-700 hover:text-gray-900">
              Collection
            </Link>
            <Link href="/new-arrivals" className="text-gray-700 hover:text-gray-900">
              New Arrivals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            <div className="relative">
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-gray-900"
                onMouseEnter={() => setIsCartPreviewOpen(true)}
                onMouseLeave={() => setIsCartPreviewOpen(false)}
              >
                Cart
                {totalItems > 0 && (
                  <span 
                    className={`
                      absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 
                      flex items-center justify-center rounded-full transition-transform
                      ${isBouncing ? 'animate-bounce' : ''}
                    `}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
              <CartPreview isOpen={isCartPreviewOpen} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 