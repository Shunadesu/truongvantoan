import { useState, useMemo } from 'react';
import { 
  accMoThe, 
  accMoGoi, 
  accDoiHinh, 
  accBPTrang, 
  accFCTrang, 
  dichVu 
} from '../data';

// Combine all data with category labels
const allAccounts = [
  ...accMoThe.map(item => ({ ...item, category: 'Mở Thẻ', categoryKey: 'mo-the' })),
  ...accMoGoi.map(item => ({ ...item, category: 'Mở Gói', categoryKey: 'mo-goi' })),
  ...accDoiHinh.map(item => ({ ...item, category: 'Đổi Hình', categoryKey: 'doi-hinh' })),
  ...accBPTrang.map(item => ({ ...item, category: 'BP Trắng', categoryKey: 'bp-trang' })),
  ...accFCTrang.map(item => ({ ...item, category: 'FC Trắng', categoryKey: 'fc-trang' })),
  ...dichVu.map(item => ({ ...item, category: 'Dịch Vụ', categoryKey: 'dich-vu' }))
];

// Price range options
export const priceRanges = [
  { label: 'Tất cả giá', min: 0, max: Infinity },
  { label: 'Dưới 100K', min: 0, max: 100000 },
  { label: '100K - 500K', min: 100000, max: 500000 },
  { label: '500K - 1M', min: 500000, max: 1000000 },
  { label: 'Trên 1M', min: 1000000, max: Infinity }
];

// Category options
export const categories = [
  { key: 'all', label: 'Tất cả danh mục' },
  { key: 'mo-the', label: 'Mở Thẻ' },
  { key: 'mo-goi', label: 'Mở Gói' },
  { key: 'doi-hinh', label: 'Đổi Hình' },
  { key: 'bp-trang', label: 'BP Trắng' },
  { key: 'fc-trang', label: 'FC Trắng' },
  { key: 'dich-vu', label: 'Dịch Vụ' }
];

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchById, setSearchById] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    let filtered = allAccounts;

    // ID search (priority over text search)
    if (searchById) {
      const id = parseInt(searchById);
      if (!isNaN(id)) {
        filtered = filtered.filter(account => account.id === id);
      }
    } else {
      // Text search (only if no ID search)
      if (searchTerm) {
        filtered = filtered.filter(account =>
          account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(account => account.categoryKey === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange > 0) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(account => {
        const price = parseInt(account.price.replace(/[^\d]/g, ''));
        return price >= range.min && price <= range.max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price': {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        }
        case 'category':
          return a.category.localeCompare(b.category);
        case 'id':
          return a.id - b.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, searchById, selectedCategory, selectedPriceRange, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSearchById('');
    setSelectedCategory('all');
    setSelectedPriceRange(0);
    setSortBy('name');
  };

  // Get price number from price string
  const getPriceNumber = (priceStr) => {
    return parseInt(priceStr.replace(/[^\d]/g, ''));
  };

  // Format price for display
  const formatPrice = (priceStr) => {
    const num = getPriceNumber(priceStr);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  // Get account by ID
  const getAccountById = (id) => {
    return allAccounts.find(account => account.id === parseInt(id));
  };

  return {
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
    resetFilters,
    getPriceNumber,
    formatPrice,
    getAccountById,
    allAccounts
  };
}; 