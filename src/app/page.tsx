'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  releaseDate: string;
  colors: string[];
};

export default function Home() {
  const { dispatch } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
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
      ];
      setProducts(newProducts);
      setIsLoading(false);
    };

    fetchProducts();
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
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/222222/ffffff?text=Luxury+Handbags')] bg-cover bg-center opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Luxury Redefined
            </h1>
            <p className="text-xl text-white mb-8">
              Discover our collection of handcrafted luxury handbags
            </p>
            <a
              href="/collection"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className="text-sm text-gray-500">{product.releaseDate}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-lg font-medium">${product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SchmugBags</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted with the finest materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                <span className="text-2xl text-white">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
              <p className="text-gray-600">Each piece is thoughtfully designed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                <span className="text-2xl text-white">💝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Timeless Elegance</h3>
              <p className="text-gray-600">Classic styles that never go out of fashion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Subscribe to receive updates about new collections and exclusive offers</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
