import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import { SiZalo } from 'react-icons/si'
import { useCart } from '../contexts/CartContext'

// CSS cho moving border
const movingBorderStyle = `
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`


const icons = {
  zalo: <SiZalo size={24} className="text-blue-500" />, // Zalo icon mới
  facebook: (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
  ),
  phone: (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-green-600"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/></svg>
  ),
}

export default function AccCard({ acc }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [modalType, setModalType] = useState('cart') // 'cart' hoặc 'buy'
  const { addToCart } = useCart()

  // Add CSS animation to document
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = movingBorderStyle
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Structured data SEO
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: acc.name,
      image: acc.image,
      description: acc.description,
      offers: {
        '@type': 'Offer',
        price: acc.price.replace(/\D/g, ''),
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
      },
    })
    script.id = `acc-jsonld-${acc.id}`
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById(`acc-jsonld-${acc.id}`)
      if (el) document.head.removeChild(el)
    }
  }, [acc])


  const goToDetail = () => navigate(`/acc/${acc.id}`)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // Thêm vào giỏ hàng (context)
  const handleAddToCart = e => {
    e.stopPropagation();
    if (addToCart(acc)) {
      toast.success('Đã thêm vào giỏ hàng!')
    } else {
      toast.error('Acc đã có trong giỏ hàng!')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          user_name: form.name,
          user_email: form.email,
          user_phone: form.phone,
          acc: `ID: ${acc.id} - ${acc.name} - ${acc.price}`,
          type: modalType === 'buy' ? 'Mua ngay' : 'Thêm vào giỏ',
        },
        'YOUR_PUBLIC_KEY'
      )
      toast.success('Đã gửi thông tin! Chúng tôi sẽ liên hệ bạn sớm.')
      setShowModal(false)
      setForm({ name: '', email: '', phone: '' })
    } catch {
      toast.error('Gửi thông tin thất bại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white relative border border-blue-200 rounded-lg shadow flex flex-col items-center cursor-pointer hover:shadow-xl transition" >
      <div onClick={goToDetail} className="relative w-full h-full">
        <img 
          src={acc.image} 
          alt={acc.name} 
          className="w-full h-full object-cover rounded"
          style={{
            border: '4px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #3b82f6, #ffffff, #3b82f6) border-box',
            backgroundSize: '200% 200%',
            animation: 'gradient-x 1s ease infinite'
          }}
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h2 onClick={goToDetail} className="text-blue-800 font-bold text-sm md:text-lg cursor-pointer hover:text-blue-600">{acc.name}</h2>
        <div className="absolute top-2 right-2 text-md rounded-md text-blue-700 font-bold mb-1 bg-white px-2 py-1">ID: {acc.id}</div>
        <p className="text-blue-800 font-bold text-xs md:text-[14px]">Giá: <span className="text-red-500 font-bold">{acc.price}</span> </p>
        <p className="text-gray-700 text-xs md:text-sm mb-2">{acc.description}</p>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <button className="bg-blue-700 text-xs md:text-sm text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-blue-900 transition" onClick={e => {e.stopPropagation(); setModalType('buy'); setShowModal(true);}}>Mua ngay</button>
          <button className="bg-green-600 text-xs md:text-sm text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-green-800 transition" onClick={handleAddToCart}>Thêm vào giỏ</button>
        </div>
        <div className="flex gap-3 mt-3 justify-end">
          <a href="https://zalo.me/0931133159" target="_blank" title="Zalo" onClick={e => e.stopPropagation()}>{icons.zalo}</a>
          <a href="https://www.facebook.com/toan.truong1003" target="_blank" title="Facebook" onClick={e => e.stopPropagation()}>{icons.facebook}</a>
          <a href="tel:0931133159" title="Gọi điện" onClick={e => e.stopPropagation()}>{icons.phone}</a>
        </div>
      </div>
      {/* Modal xác nhận */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in flex flex-col gap-4 relative">
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Xác nhận {modalType === 'buy' ? 'mua acc' : 'thêm vào giỏ'}</h2>
            <input required name="name" value={form.name} onChange={handleChange} placeholder="Họ tên" className="border rounded px-4 py-2" />
            <input required name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border rounded px-4 py-2" />
            <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" className="border rounded px-4 py-2" />
            <div className="text-gray-700 text-sm mb-2">Acc: <span className="text-blue-800 font-bold">ID: {acc.id} - {acc.name} - {acc.price}</span></div>
            <button type="submit" disabled={loading} className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Đang gửi...' : 'Xác nhận & Gửi thông tin'}
            </button>
            <div className="text-gray-700 text-sm mb-2 text-center">Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất</div>
          </form>
        </div>
      )}
    </div>
  )
} 