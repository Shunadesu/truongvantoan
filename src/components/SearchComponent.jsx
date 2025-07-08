import { Link } from 'react-router-dom';
import { useSearch, priceRanges, categories } from '../hooks/useSearch';
import AccCard from './AccCard';

export default function SearchComponent() {
  const {
    searchTerm,
    setSearchTerm,
    searchById,
    setSearchById,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    sortBy,
    setSortBy,
    filteredAccounts,
    resetFilters
  } = useSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔍 Tìm Kiếm Account
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm account game theo ID, tên, giá cả, danh mục và nhiều tiêu chí khác
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ID Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔢 Tìm theo ID
              </label>
              <input
                type="number"
                placeholder="Nhập ID account..."
                value={searchById}
                onChange={(e) => setSearchById(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Text Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Tìm theo tên/mô tả
              </label>
              <input
                type="text"
                placeholder="Nhập tên account, mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={searchById !== ''}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  searchById !== '' ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📂 Danh mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💰 Khoảng giá
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>
                {searchById 
                  ? `Tìm kiếm theo ID: ${searchById}` 
                  : searchTerm 
                    ? `Tìm kiếm theo từ khóa: "${searchTerm}"` 
                    : 'Nhập ID hoặc từ khóa để tìm kiếm'
                }
              </span>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sắp xếp theo:</label>
            <div className="flex gap-2">
              {[
                { key: 'name', label: 'Tên' },
                { key: 'id', label: 'ID' },
                { key: 'category', label: 'Danh mục' },
                { key: 'price', label: 'Giá thấp đến cao' },
                { key: 'priceDesc', label: 'Giá cao đến thấp' },
              ].map(option => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    sortBy === option.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredAccounts.length}</span> kết quả
            {searchById && filteredAccounts.length === 1 && (
              <span className="ml-2 text-green-600">
                ✓ Tìm thấy chính xác ID {searchById}
              </span>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccounts.map((account) => (
            <AccCard key={`${account.categoryKey}-${account.id}`} acc={account} />
          ))}
        </div>

        {/* No Results */}
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-600 mb-4">
              {searchById 
                ? `Không tìm thấy account với ID: ${searchById}`
                : 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để có kết quả khác'
              }
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Quick ID Search Tips */}
        {filteredAccounts.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💡 Mẹo tìm kiếm nhanh
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🔢 Tìm theo ID:</h4>
                <ul className="space-y-1">
                  <li>• Nhập chính xác ID để tìm account cụ thể</li>
                  <li>• ID từ 1-50: Account Mở Thẻ</li>
                  <li>• ID từ 101-200: Account Mở Gói</li>
                  <li>• ID từ 201-300: Account Đổi Hình</li>
                  <li>• ID từ 301-400: Account BP Trắng</li>
                  <li>• ID từ 401-500: Account FC Trắng</li>
                  <li>• ID từ 501-600: Dịch Vụ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">📝 Tìm theo từ khóa:</h4>
                <ul className="space-y-1">
                  <li>• Tìm theo tên account</li>
                  <li>• Tìm theo danh mục (Mở Thẻ, BP Trắng...)</li>
                  <li>• Tìm theo mô tả</li>
                  <li>• Kết hợp với bộ lọc giá và danh mục</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 