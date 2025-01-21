'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  releaseDate: string;
  colors: string[];
  category?: string;
  inStock?: boolean;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!adminAuthenticated) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Urban Explorer Backpack",
      price: 699,
      description: "A versatile backpack for the modern adventurer",
      image: "/images/products/bag1.jpeg",
      releaseDate: "New Release",
      colors: ["Black", "Navy", "Olive"],
      category: "backpack",
      inStock: true,
    },
    {
      id: 2,
      name: "Evening Star Clutch",
      price: 449,
      description: "Elegance meets contemporary design",
      image: "/images/products/bag2.jpg",
      releaseDate: "Coming Soon",
      colors: ["Gold", "Silver", "Rose Gold"],
      category: "clutch",
      inStock: true,
    },
    {
      id: 3,
      name: "Weekend Wanderer Tote",
      price: 549,
      description: "Your perfect companion for weekend getaways",
      image: "/images/products/bag3.avif",
      releaseDate: "Pre-order Now",
      colors: ["Tan", "Brown", "Black"],
      category: "tote",
      inStock: true,
    },
    {
      id: 4,
      name: "Classic Leather Satchel",
      price: 599,
      description: "Timeless elegance for everyday use",
      image: "/images/products/bag4.jpg",
      releaseDate: "Coming Soon",
      colors: ["Brown", "Black", "Burgundy"],
      category: "satchel",
      inStock: true,
    },
    {
      id: 5,
      name: "Mini Crossbody Bag",
      price: 399,
      description: "Compact style for the essentials",
      image: "/images/products/bag5.jpg",
      releaseDate: "New Release",
      colors: ["Black", "Tan", "Navy"],
      category: "crossbody",
      inStock: true,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setIsEditing(false);
      setEditingProduct(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editingProduct) {
      const { name, value } = e.target;
      setEditingProduct({
        ...editingProduct,
        [name]: value,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingProduct({
                  id: products.length + 1,
                  name: '',
                  price: 0,
                  description: '',
                  image: '',
                  releaseDate: 'New Release',
                  colors: [],
                  category: '',
                  inStock: true,
                });
                setIsEditing(true);
              }}
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Add New Product
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {isEditing && editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editingProduct.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={editingProduct.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Release Status</label>
                  <select
                    name="releaseDate"
                    value={editingProduct.releaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="New Release">New Release</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Pre-order Now">Pre-order Now</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="backpack">Backpack</option>
                    <option value="clutch">Clutch</option>
                    <option value="tote">Tote</option>
                    <option value="satchel">Satchel</option>
                    <option value="crossbody">Crossbody</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingProduct(null);
                    }}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.releaseDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-gray-600 hover:text-gray-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 