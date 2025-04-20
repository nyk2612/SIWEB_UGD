import React, { useState, useEffect } from 'react';
import { fetchProducts } from '@/pages/utils/api';

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // For demo purposes if API is not ready
  useEffect(() => {
    const demoProducts = [
      { id: 1, name: 'Beras Premium', price: 65000, category: 'sembako', stock: 25, image: '/assets/produk-a.jpg' },
      { id: 2, name: 'Minyak Goreng', price: 20000, category: 'sembako', stock: 30, image: '/assets/produk-b.jpg' },
      { id: 3, name: 'Kecap Manis', price: 15000, category: 'bumbu', stock: 40, image: '/assets/produk-c.jpg' },
      { id: 4, name: 'Gula Pasir', price: 12500, category: 'sembako', stock: 20, image: '/assets/produk-a.jpg' },
      { id: 5, name: 'Tepung Terigu', price: 10000, category: 'bahan-kue', stock: 15, image: '/assets/produk-b.jpg' },
      { id: 6, name: 'Susu Kaleng', price: 15000, category: 'minuman', stock: 25, image: '/assets/produk-c.jpg' },
    ];
    setProducts(demoProducts);
    setLoading(false);
  }, []);

  const categories = ['all', 'sembako', 'bumbu', 'bahan-kue', 'minuman'];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (categoryFilter === 'all' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Katalog Produk</h1>
        
        {/* Search and Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Semua Kategori' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Nama (A-Z)</option>
              <option value="name-desc">Nama (Z-A)</option>
              <option value="price-asc">Harga (Terendah)</option>
              <option value="price-desc">Harga (Tertinggi)</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-green-600 mt-2">Rp {product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Stok: {product.stock}</p>
                  <button 
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Katalog;