'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  details: string[];
  colors: string[];
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Urban Explorer Backpack",
    price: 699,
    description: "A versatile backpack for the modern adventurer",
    image: "/images/products/bag1.jpeg",
    category: "backpack",
    details: [
      "Premium materials",
      "Multiple compartments",
      "Laptop sleeve",
      "Water-resistant",
    ],
    colors: ["Black", "Navy", "Olive"],
    inStock: true,
  },
  {
    id: 2,
    name: "Evening Star Clutch",
    price: 449,
    description: "Elegance meets contemporary design",
    image: "/images/products/bag2.jpg",
    category: "clutch",
    details: [
      "Premium leather",
      "Magnetic closure",
      "Interior pocket",
      "Chain strap included",
    ],
    colors: ["Gold", "Silver", "Rose Gold"],
    inStock: true,
  },
  {
    id: 3,
    name: "Weekend Wanderer Tote",
    price: 549,
    description: "Your perfect companion for weekend getaways",
    image: "/images/products/bag3.avif",
    category: "tote",
    details: [
      "Spacious design",
      "Genuine leather",
      "Multiple pockets",
      "Removable shoulder strap",
    ],
    colors: ["Tan", "Brown", "Black"],
    inStock: true,
  },
  {
    id: 4,
    name: "Classic Leather Satchel",
    price: 599,
    description: "Timeless elegance for everyday use",
    image: "/images/products/bag4.jpg",
    category: "satchel",
    details: [
      "Full-grain leather",
      "Brass hardware",
      "Adjustable strap",
      "Multiple compartments",
    ],
    colors: ["Brown", "Black", "Burgundy"],
    inStock: true,
  },
  {
    id: 5,
    name: "Mini Crossbody Bag",
    price: 399,
    description: "Compact style for the essentials",
    image: "/images/products/bag5.jpg",
    category: "crossbody",
    details: [
      "Compact design",
      "Adjustable strap",
      "Secure closure",
      "Card slots",
    ],
    colors: ["Black", "Tan", "Navy"],
    inStock: true,
  },
];

export default function Collection() {
  const { dispatch } = useCart();
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

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

  let filteredProducts = [...products];

  // Apply category filter
  if (filterBy) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filterBy
    );
  }

  // Apply color filter
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((product) =>
      product.colors.includes(selectedColor)
    );
  }

  // Apply sorting
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Get all unique colors
  const allColors = Array.from(
    new Set(products.flatMap((product) => product.colors))
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Collection</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">All Styles</option>
            <option value="tote">Tote Bags</option>
            <option value="clutch">Clutches</option>
            <option value="shoulder">Shoulder Bags</option>
            <option value="crossbody">Crossbody Bags</option>
          </select>

          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">All Colors</option>
            {allColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div 
                  className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
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
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Available Colors: {product.colors.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 