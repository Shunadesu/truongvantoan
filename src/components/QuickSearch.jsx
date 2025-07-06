import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

export default function QuickSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchById, setSearchById] = useState('');
  const { filteredAccounts, getAccountById } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || searchById.trim()) {
      const query = searchById ? `id=${searchById}` : `q=${encodeURIComponent(searchTerm)}`;
      navigate(`/search?${query}`);
      setIsOpen(false);
      setSearchTerm('');
      setSearchById('');
    }
  };

  const handleResultClick = (account) => {
    navigate(`/shop/${account.categoryKey}/${account.id}`);
    setIsOpen(false);
    setSearchTerm('');
    setSearchById('');
  };

  // Get results based on search type
  const getResults = () => {
    if (searchById) {
      const account = getAccountById(searchById);
      return account ? [account] : [];
    } else if (searchTerm) {
      return filteredAccounts
        .filter(account => 
          account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
    }
    return [];
  };

  const results = getResults();

  return (
    <div className="relative">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên account..."
          value={searchById || searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            // Check if input is a number (ID search)
            if (/^\d*$/.test(value)) {
              setSearchById(value);
              setSearchTerm('');
              setIsOpen(value.length > 0);
            } else {
              setSearchTerm(value);
              setSearchById('');
              setIsOpen(value.length > 0);
            }
          }}
          onFocus={() => setIsOpen((searchTerm.length > 0) || (searchById.length > 0))}
          className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          Tìm
        </button>
      </form>

      {/* Dropdown Results */}
      {isOpen && (searchTerm || searchById) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              {/* Search Type Indicator */}
              <div className="p-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs text-gray-500">
                  {searchById 
                    ? `🔢 Tìm theo ID: ${searchById}` 
                    : `📝 Tìm theo từ khóa: "${searchTerm}"`
                  }
                </span>
              </div>

              {results.map((account) => (
                <div
                  key={`${account.categoryKey}-${account.id}`}
                  onClick={() => handleResultClick(account)}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  {/* Account Image */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src={account.image}
                      alt={account.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Account Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-800 truncate">
                        {account.name}
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        ID: {account.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {account.category} • {account.price}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="ml-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}

              {/* View All Results */}
              <div className="p-3 border-t border-gray-200">
                <Link
                  to={`/search?${searchById ? `id=${searchById}` : `q=${encodeURIComponent(searchTerm)}`}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Xem tất cả kết quả ({results.length})
                </Link>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <div className="text-2xl mb-2">🔍</div>
              <p>
                {searchById 
                  ? `Không tìm thấy account với ID: ${searchById}`
                  : 'Không tìm thấy kết quả'
                }
              </p>
              <p className="text-sm mt-1">
                {searchById 
                  ? 'Thử ID khác hoặc tìm theo tên'
                  : 'Thử từ khóa khác'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 