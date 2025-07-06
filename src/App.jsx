import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import ShopPage from './pages/ShopPage'
import NewsPage from './pages/NewsPage'
import ReviewPage from './pages/ReviewPage'
import AccDetailPage from './pages/AccDetailPage'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="acc/:id" element={<AccDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
