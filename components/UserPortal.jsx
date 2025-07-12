"use client";
import { Edit, Plus, X, Save, User, Package, Heart, Settings, LogOut, MessageCircle, RotateCcw, Search, Menu } from 'lucide-react';
import { useState } from 'react';

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Sankalp Tripathi',
    email: 'sankalpt098@gmail.com',
    deliveryAddress: 'No address saved yet'
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Basic Slim Fit T-Shirt",
      description: "Cotton T-Shirt with comfortable fit",
      category: "men",
      type: "t-shirt",
      size: "M",
      condition: "new",
      tags: ["cotton", "basic", "slim-fit"],
      redeemType: "swap",
      pointsRequired: 199,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Basic Heavy Weight T-Shirt",
      description: "Premium heavy weight cotton t-shirt",
      category: "men",
      type: "t-shirt",
      size: "L",
      condition: "new",
      tags: ["cotton", "heavy-weight", "premium"],
      redeemType: "swap",
      pointsRequired: 199,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Full Sleeve Zipper",
      description: "Camouflage pattern full sleeve jacket",
      category: "men",
      type: "jacket",
      size: "M",
      condition: "new",
      tags: ["camouflage", "zipper", "full-sleeve"],
      redeemType: "swap",
      pointsRequired: 199,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop"
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'men',
    type: 't-shirt',
    size: 'M',
    condition: 'new',
    tags: [],
    redeemType: 'swap',
    pointsRequired: 0,
    image: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
      ));
      setEditingProduct(null);
    } else {
      const newProduct = {
        ...formData,
        id: Date.now()
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setShowAddProduct(false);
    setFormData({
      title: '',
      description: '',
      category: 'men',
      type: 't-shirt',
      size: 'M',
      condition: 'new',
      tags: [],
      redeemType: 'swap',
      pointsRequired: 0,
      image: ''
    });
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const menuItems = [
    { id: 'profile', label: 'My Account', icon: User },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'membership', label: 'Ora-q Membership', icon: Settings },
    { id: 'feedback', label: 'Send Feedback', icon: MessageCircle },
    { id: 'contact', label: 'Contact Us', icon: MessageCircle },
    { id: 'return', label: 'Request Return', icon: RotateCcw },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ];

  const categories = [
    { id: 'new', label: 'NEW' },
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'shirts', label: 'SHIRTS' },
    { id: 't-shirts', label: 'T-SHIRTS' },
    { id: 'polo-shirts', label: 'POLO SHIRTS' },
    { id: 'shorts', label: 'SHORTS' },
    { id: 'jeans', label: 'JEANS' },
    { id: 'jackets', label: 'JACKETS' },
    { id: 'suits', label: 'SUITS' },
    { id: 'coats', label: 'COATS' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
  

      <div className="max-w-7xl mx-auto px-4 py-8">
        

        {activeTab === 'profile' && (
          <div className="max-w-4xl">
            <div className="flex gap-8">
              {/* Profile Sidebar */}
              <div className="w-80 space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg">{profileData.name}</h3>
                  <p className="text-gray-600 text-sm">{profileData.email}</p>
                </div>
                
                <nav className="space-y-1">
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Profile Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-8">Account Settings</h2>
                
                <div className="space-y-8">
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">My Information</h3>
                      <p className="text-gray-600 mb-1">{profileData.name}</p>
                      <p className="text-gray-600">{profileData.email}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit Info
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
                      <p className="text-gray-600">{profileData.deliveryAddress}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit Info
                    </button>
                  </div>

                  <div className="py-6">
                    <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                    <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Change Password
                    </button>
                    <p className="text-gray-600 text-sm mt-2">
                      Choose a strong, unique password to keep your information safe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs */}
        {activeTab !== 'profile' && activeTab !== 'products' && (
          <div className="max-w-4xl">
            <div className="flex gap-8">
              <div className="w-80 space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg">{profileData.name}</h3>
                  <p className="text-gray-600 text-sm">{profileData.email}</p>
                </div>
                
                <nav className="space-y-1">
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">This section is coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                onClick={() => {
                  setShowAddProduct(false);
                  setEditingProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="t-shirt">T-Shirt</option>
                    <option value="shirt">Shirt</option>
                    <option value="pants">Pants</option>
                    <option value="jacket">Jacket</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {tag}
                      <button 
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTagAdd(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Redeem Type</label>
                  <select
                    value={formData.redeemType}
                    onChange={(e) => handleInputChange('redeemType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="swap">Swap</option>
                    <option value="points">Points</option>
                    <option value="purchase">Purchase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Points Required</label>
                  <input
                    type="number"
                    value={formData.pointsRequired}
                    onChange={(e) => handleInputChange('pointsRequired', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter points"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPortal;