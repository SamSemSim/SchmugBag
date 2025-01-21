'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

// This would typically come from a database
const products = [
  {
    id: 1,
    name: "The Classic Tote",
    price: 599,
    description: "A timeless design perfect for everyday elegance",
    image: "https://placehold.co/600x600/222222/ffffff?text=Classic+Tote",
    details: [
      "Premium leather construction",
      "Interior laptop sleeve",
      "Multiple compartments",
      "Magnetic closure",
      "Dimensions: 14\"L x 5.5\"W x 10\"H"
    ],
    colors: ["Black", "Brown", "Navy"],
    inStock: true
  },
  // Add more products as needed
];

export default function ProductDetail() {
  const params = useParams();
  const { dispatch } = useCart();
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);
  const [quantity, setQuantity] = useState(1);

  // In a real app, you'd fetch this from an API
  const product = products.find(p => p.id === Number(params.id)) || products[0];

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor,
      },
    });
    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <div 
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">${product.price}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 