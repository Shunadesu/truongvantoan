import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()

  // Đóng menu khi chuyển route
  if (open && typeof window !== 'undefined') {
    window.onresize = () => setOpen(false)
  }

  return (
    <header className="bg-blue-800 text-white shadow sticky top-0 z-40">
      <nav className="container max-w-[1240px] mx-auto flex justify-between items-center py-4 px-4 relative">
        <Link to="/" className="font-extrabold text-2xl tracking-widest text-white">truongvantoan.com</Link>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-lg font-semibold items-center">
         
          <Link to="/shop" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/shop') ? 'underline underline-offset-4' : ''}`}>Shop Acc Game</Link>
          <Link to="/news" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/news') ? 'underline underline-offset-4' : ''}`}>Tin Tức</Link>
          <Link to="/review" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/review') ? 'underline underline-offset-4' : ''}`}>Review Cầu Thủ</Link>
          <Link to="/cart" className="relative group ml-4 flex items-center">
            <AiOutlineShoppingCart size={28} className="text-white bg-blue-700 rounded-full p-1 shadow-lg group-hover:bg-blue-900 transition" />
            <span className="ml-2">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
            )}
          </Link>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(o => !o)} aria-label="Mở menu">
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        {/* Mobile menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-blue-900 text-white flex flex-col items-start py-4 gap-4 md:hidden animate-fade-in z-50 shadow-lg">
            <Link to="/" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Trang Chủ</Link>
            <Link to="/shop" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Shop Acc Game</Link>
            <Link to="/news" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Tin Tức</Link>
            <Link to="/review" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Review Cầu Thủ</Link>
            <Link to="/cart" className="relative group w-full text-left p-4 hover:bg-blue-700 transition flex items-center gap-2" onClick={() => setOpen(false)}>
              <AiOutlineShoppingCart size={24} className="text-white bg-blue-700 rounded-full p-1 shadow-lg group-hover:bg-blue-900 transition" />
              <span>Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="absolute left-6 top-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
              )}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
} 