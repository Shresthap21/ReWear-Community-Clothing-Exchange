"use client";
import { useEffect, useState } from "react";
import {
  Menu,
  User,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Clock,
  ShoppingBag,
} from "lucide-react";
import axiosPrivate from "@/lib/axiosPrivate";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleApprove = async (id) => {
    try {
      await axiosPrivate.patch(`/admin/items/${id}/approve`);
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, status: "approved" } : product
        )
      );
    } catch (error) {
      console.error("Error approving item:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosPrivate.patch(`/admin/items/${id}/reject`);
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, status: "rejected" } : product
        )
      );
    } catch (error) {
      console.error("Error rejecting item:", error);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleView = async (id) => {
    try {
      const response = await axiosPrivate.get(`/items/${id}`);
      setSelectedItem(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesFilter = filter === "all" || product.status === filter;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.uploaderId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "available":
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: products.length,
    pending: products.filter((p) => p.status === "pending").length,
    approved: products.filter((p) => p.status === "approved").length,
    rejected: products.filter((p) => p.status === "rejected").length,
    available: products.filter((p) => p.status === "available").length,
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axiosPrivate.get("/admin/items/pending");
      const data = res.data;

      setTimeout(() => {
        setProducts(data || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderActionButtons = (product) => {
    const baseButtons = [
      <button
        key="view"
        onClick={() => handleView(product._id)}
        className="text-blue-600 hover:text-blue-900"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </button>,
      <button
        key="delete"
        onClick={() => handleDelete(product._id)}
        className="text-red-600 hover:text-red-900"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>,
    ];

    if (product.status === "pending") {
      return [
        ...baseButtons.slice(0, 1),
        <button
          key="approve"
          onClick={() => handleApprove(product._id)}
          className="text-green-600 hover:text-green-900"
          title="Approve"
        >
          <Check className="w-4 h-4" />
        </button>,
        <button
          key="reject"
          onClick={() => handleReject(product._id)}
          className="text-red-600 hover:text-red-900"
          title="Reject"
        >
          <X className="w-4 h-4" />
        </button>,
        baseButtons[1],
      ];
    } else if (product.status === "available") {
      return [
        ...baseButtons.slice(0, 1),
        <button
          key="edit"
          className="text-gray-600 hover:text-gray-900"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>,
        baseButtons[1],
      ];
    } else {
      return baseButtons;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6" />
              <span className="font-bold text-xl">Admin Portal</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <button className="w-8 h-8 rounded-full border bg-black flex items-center justify-center">
              <User className="w-4 h-4" color="white" />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.available}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items, users, or categories..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} items
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded-lg object-cover"
                            src={product.images[0]}
                            alt={product.title}
                            onError={(e) => {
                              e.target.src = "/api/placeholder/64/64";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.description.substring(0, 60)}...
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Size: {product.size} • {product.condition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {product.category}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {product.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.pointsRequired} pts
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {product.redeemType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.uploaderId.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.uploaderId.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {getStatusIcon(product.status)}
                        <span className="ml-1 capitalize">
                          {product.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {renderActionButtons(product)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No items found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Item Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={selectedItem.images[0]}
                    alt={selectedItem.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    {selectedItem.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="capitalize">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="capitalize">{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span>{selectedItem.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Condition:</span>
                      <span className="capitalize">
                        {selectedItem.condition}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Points:</span>
                      <span>{selectedItem.pointsRequired} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uploader:</span>
                      <span>{selectedItem.uploaderId.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          selectedItem.status
                        )}`}
                      >
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
