'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, RefreshCw, Upload, X } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Draggable, Droppable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  details: string[];
  colors: string[];
  inStock: boolean;
}

// Shared product data
const initialProducts: Product[] = [
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

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Initialize with API data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.length > 0 ? data : initialProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(initialProducts);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    let imageUrl = newProduct.image || '';

    if (uploadedImage) {
      // In a real app, you would upload the image to a server/storage here
      // For now, we'll use the preview URL
      imageUrl = imagePreview;
    }

    const product: Product = {
      id: newId,
      name: newProduct.name || '',
      price: newProduct.price || 0,
      description: newProduct.description || '',
      image: imageUrl,
      category: newProduct.category || '',
      details: newProduct.details || [],
      colors: newProduct.colors || [],
      inStock: true,
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Failed to add product');
      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setNewProduct({});
      setUploadedImage(null);
      setImagePreview('');
      setIsAddProductOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedProduct),
      });

      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      
      const updatedProducts = products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedProducts);
      setSelectedProduct(null);
      setIsEditProductOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      return sortConfig.direction === 'asc'
        ? aValue.length - bValue.length
        : bValue.length - aValue.length;
    }
    
    return sortConfig.direction === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || product.category === filterCategory)
  );

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (field === 'price') {
      const value = parseFloat(e.target.value);
      setNewProduct({ ...newProduct, [field]: value });
    } else if (field === 'colors' || field === 'details') {
      const items = e.target.value.split(',').map(item => item.trim());
      setNewProduct({ ...newProduct, [field]: items });
    } else {
      setNewProduct({ ...newProduct, [field]: e.target.value });
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>, field: keyof Product) => {
    setNewProduct({ ...newProduct, [field]: e.target.value });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (!selectedProduct) return;

    if (field === 'price') {
      const value = parseFloat(e.target.value);
      setSelectedProduct({ ...selectedProduct, [field]: value });
    } else if (field === 'colors' || field === 'details') {
      const items = e.target.value.split(',').map(item => item.trim());
      setSelectedProduct({ ...selectedProduct, [field]: items });
    } else {
      setSelectedProduct({ ...selectedProduct, [field]: e.target.value });
    }
  };

  const handleEditSelectChange = (e: ChangeEvent<HTMLSelectElement>, field: keyof Product) => {
    if (!selectedProduct) return;
    setSelectedProduct({ ...selectedProduct, [field]: e.target.value });
  };

  const handleReorderDetails = (productId: number, details: string[]) => {
    const updatedProducts = products.map(p => 
      p.id === productId 
        ? { ...p, details }
        : p
    );
    setProducts(updatedProducts);
  };

  const handleToggleStock = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const updatedProduct = { ...product, inStock: !product.inStock };

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error('Failed to update product');
      const savedProduct = await response.json();
      
      const updatedProducts = products.map(p => 
        p.id === savedProduct.id ? savedProduct : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product stock status. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the product details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name || ''}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price || ''}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={newProduct.category || ''}
                  onChange={(e) => handleSelectChange(e, 'category')}
                >
                  <option value="">Select Category</option>
                  <option value="tote">Tote Bags</option>
                  <option value="clutch">Clutches</option>
                  <option value="shoulder">Shoulder Bags</option>
                  <option value="crossbody">Crossbody Bags</option>
                  <option value="backpack">Backpacks</option>
                  <option value="satchel">Satchels</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="colors">Colors (comma-separated)</Label>
                <Input
                  id="colors"
                  value={newProduct.colors?.join(', ') || ''}
                  onChange={(e) => handleInputChange(e, 'colors')}
                  placeholder="e.g., Black, Navy, Olive"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details (comma-separated)</Label>
                <Textarea
                  id="details"
                  value={newProduct.details?.join(', ') || ''}
                  onChange={(e) => handleInputChange(e, 'details')}
                  placeholder="e.g., Premium materials, Multiple compartments"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description || ''}
                  onChange={(e) => handleInputChange(e, 'description')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadedImage(null);
                              setImagePreview('');
                            }}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="imageUrl">Or enter image URL</Label>
                    <Input
                      id="imageUrl"
                      value={newProduct.image || ''}
                      onChange={(e) => handleInputChange(e, 'image')}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Product Details</Label>
                <DragDropContext
                  onDragEnd={(result: DropResult) => {
                    if (!result.destination || !newProduct.details) return;
                    const items = Array.from(newProduct.details);
                    const [reorderedItem] = items.splice(result.source.index, 1);
                    items.splice(result.destination.index, 0, reorderedItem);
                    setNewProduct({ ...newProduct, details: items });
                  }}
                >
                  <Droppable droppableId="details">
                    {(provided: DroppableProvided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {newProduct.details?.map((detail, index) => (
                          <Draggable
                            key={detail}
                            draggableId={detail}
                            index={index}
                          >
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                              >
                                <span className="flex-1">{detail}</span>
                                <button
                                  onClick={() => {
                                    const newDetails = newProduct.details?.filter((_, i) => i !== index);
                                    setNewProduct({ ...newProduct, details: newDetails });
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new detail"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        const newDetail = input.value.trim();
                        if (newDetail) {
                          setNewProduct({
                            ...newProduct,
                            details: [...(newProduct.details || []), newDetail],
                          });
                          input.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <Button onClick={handleAddProduct}>Save Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Current inventory count</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Colors</CardTitle>
            <CardDescription>Across all products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {new Set(products.flatMap(p => p.colors)).size}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Current inventory value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              ${totalValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-md"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm('');
            setFilterCategory('all');
            setSortConfig(null);
          }}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                Product {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                Category {sortConfig?.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('price')}>
                Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('colors')}>
                Colors {sortConfig?.key === 'colors' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.inStock}
                      onCheckedChange={() => handleToggleStock(product.id)}
                    />
                    <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditProductOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={selectedProduct.name}
                  onChange={(e) => handleEditInputChange(e, 'name')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => handleEditInputChange(e, 'price')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={selectedProduct.category}
                  onChange={(e) => handleEditSelectChange(e, 'category')}
                >
                  <option value="tote">Tote Bags</option>
                  <option value="clutch">Clutches</option>
                  <option value="shoulder">Shoulder Bags</option>
                  <option value="crossbody">Crossbody Bags</option>
                  <option value="backpack">Backpacks</option>
                  <option value="satchel">Satchels</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-colors">Colors (comma-separated)</Label>
                <Input
                  id="edit-colors"
                  value={selectedProduct.colors.join(', ')}
                  onChange={(e) => handleEditInputChange(e, 'colors')}
                  placeholder="e.g., Black, Navy, Olive"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-details">Details (comma-separated)</Label>
                <Textarea
                  id="edit-details"
                  value={selectedProduct.details.join(', ')}
                  onChange={(e) => handleEditInputChange(e, 'details')}
                  placeholder="e.g., Premium materials, Multiple compartments"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedProduct.description}
                  onChange={(e) => handleEditInputChange(e, 'description')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={selectedProduct.image}
                  onChange={(e) => handleEditInputChange(e, 'image')}
                />
              </div>
              <Button onClick={handleEditProduct}>Update Product</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 