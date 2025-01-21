'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import Notification from '@/components/Notification';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  releaseDate: string;
  colors: string[];
};

export default function NewArrivals() {
  const { dispatch } = useCart();
  const [addedProducts, setAddedProducts] = useState<{ [key: number]: boolean }>({});
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch products
    const fetchProducts = () => {
      setIsLoading(true);
      // In a real application, this would be an API call
      const newProducts = [
        {
          id: 1,
          name: "Urban Explorer Backpack",
          price: 699,
          description: "A versatile backpack for the modern adventurer",
          image: "/images/products/bag1.jpeg",
          releaseDate: "New Release",
          colors: ["Black", "Navy", "Olive"],
        },
        {
          id: 2,
          name: "Evening Star Clutch",
          price: 449,
          description: "Elegance meets contemporary design",
          image: "/images/products/bag2.jpg",
          releaseDate: "Coming Soon",
          colors: ["Gold", "Silver", "Rose Gold"],
        },
        {
          id: 3,
          name: "Weekend Wanderer Tote",
          price: 549,
          description: "Your perfect companion for weekend getaways",
          image: "/images/products/bag3.avif",
          releaseDate: "Pre-order Now",
          colors: ["Tan", "Brown", "Black"],
        },
        {
          id: 4,
          name: "Classic Leather Satchel",
          price: 599,
          description: "Timeless elegance for everyday use",
          image: "/images/products/bag4.jpg",
          releaseDate: "Coming Soon",
          colors: ["Brown", "Black", "Burgundy"],
        },
        {
          id: 5,
          name: "Mini Crossbody Bag",
          price: 399,
          description: "Compact style for the essentials",
          image: "/images/products/bag5.jpg",
          releaseDate: "New Release",
          colors: ["Black", "Tan", "Navy"],
        },
      ];
      setProducts(newProducts);
      setIsLoading(false);
    };

    fetchProducts();
    // Refresh products every 5 minutes
    const interval = setInterval(fetchProducts, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        color: product.colors[0],
      },
    });

    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setNotification({
      visible: true,
      message: `${product.name} added to cart!`
    });

    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);

  return (
    <>
      <Notification
        message={notification.message}
        isVisible={notification.visible}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
      
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
            <p className="text-gray-600">Discover our latest collection of luxury handbags</p>
          </div>

          {/* Featured New Arrival */}
          <div className="mb-16">
            <div className="relative h-[60vh] bg-gray-900 rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${featuredProduct.image})` }}
              ></div>
              <div className="relative h-full flex items-end">
                <div className="text-white p-8 md:p-12 w-full bg-gradient-to-t from-black/70">
                  <h2 className="text-3xl font-bold mb-2">{featuredProduct.name}</h2>
                  <p className="mb-4">{featuredProduct.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl">${featuredProduct.price}</p>
                    <div className="relative">
                      <button 
                        onClick={() => handleAddToCart(featuredProduct)}
                        className={`
                          bg-white text-gray-900 px-6 py-2 rounded-md font-semibold 
                          hover:bg-gray-100 transition-all duration-300
                          ${addedProducts[featuredProduct.id] ? 'scale-95 bg-green-500 text-white' : ''}
                        `}
                      >
                        {addedProducts[featuredProduct.id] ? 'Added!' : 'Shop Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other New Arrivals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-sm text-gray-500">{product.releaseDate}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">${product.price}</p>
                    <div className="relative">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`
                          bg-gray-900 text-white px-4 py-2 rounded-md
                          hover:bg-gray-800 transition-all duration-300
                          ${addedProducts[product.id] ? 'scale-95 bg-green-500' : ''}
                        `}
                      >
                        {addedProducts[product.id] ? 'Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 py-12 px-6 bg-gray-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and get early access to new releases
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 