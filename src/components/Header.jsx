import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai'
import { useCart } from '../contexts/CartContext'
import { BiPhone } from 'react-icons/bi'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()

  // Đóng menu khi chuyển route
  if (open && typeof window !== 'undefined') {
    window.onresize = () => setOpen(false)
  }

  // Handle logo click - scroll to top if on home page, otherwise navigate
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-blue-800 text-white shadow sticky top-0 z-40">
      <nav className="container max-w-[1240px] mx-auto flex justify-between items-center py-4 px-4 relative">
        <Link 
          to="/" 
          className="font-extrabold text-xl md:text-2xl tracking-widest text-white transition cursor-pointer"
          onClick={handleLogoClick}
        >
          truongvantoan.com
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-ld font-semibold items-center">
          <div className='flex gap-6'>
            <Link to="/shop" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/shop') ? 'underline underline-offset-4' : ''}`}>Shop Acc</Link>
            <Link to="/news" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/news') ? 'underline underline-offset-4' : ''}`}>Họp chợ</Link>
            <Link to="/review" className={`hover:text-blue-200 transition ${location.pathname.startsWith('/review') ? 'underline underline-offset-4' : ''}`}>Hướng dẫn</Link>
          </div>
          
          {/* Search Button */}
          <Link 
            to="/search" 
            className={`flex items-center gap-2 hover:text-blue-200 transition ${location.pathname.startsWith('/search') ? 'underline underline-offset-4' : ''}`}
          >
            <AiOutlineSearch size={24} className="text-white bg-blue-700 rounded-full p-1 shadow-lg group-hover:bg-blue-900 transition" />
            <span>Tìm kiếm</span>
          </Link>

          <Link to="/cart" className="relative group flex items-center">
            <AiOutlineShoppingCart size={24} className="text-white bg-blue-700 rounded-full p-1 shadow-lg group-hover:bg-blue-900 transition" />
            <span className="ml-2">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
            )}
          </Link>
          <Link to="tel:0931133159" className="flex items-center">
            <BiPhone size={24} className="text-white bg-blue-700 rounded-full p-1 shadow-lg group-hover:bg-blue-900 transition" />
            <span className="ml-2">0931133159</span>
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
            <Link to="/shop" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Shop Acc</Link>
            <Link to="/news" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Họp Chợ hằng ngày</Link>
            <Link to="/review" className="w-full text-left p-4 hover:bg-blue-700 transition" onClick={() => setOpen(false)}>Hướng dẫn</Link>
            
            {/* Mobile Search Button */}
            <Link 
              to="/search" 
              className="w-full text-left p-4 hover:bg-blue-700 transition flex items-center gap-2" 
              onClick={() => setOpen(false)}
            >
              <AiOutlineSearch size={20} className="text-white" />
              <span>Tìm kiếm</span>
            </Link>

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