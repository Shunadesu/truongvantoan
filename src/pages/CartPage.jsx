import { useState } from 'react'
import { AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import { useCart } from '../contexts/CartContext'

export default function CartPage() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, acc) => sum + (parseInt(acc.price.replace(/\D/g, '')) || 0), 0)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

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
          cart: cart.map(acc => `ID: ${acc.id} - ${acc.name} - ${acc.price}`).join(', '),
          total: total.toLocaleString() + 'đ',
        },
        'YOUR_PUBLIC_KEY'
      )
      toast.success('Đã gửi đơn hàng! Chúng tôi sẽ liên hệ bạn sớm.')
      setShowModal(false)
      setForm({ name: '', email: '', phone: '' })
      clearCart()
    } catch {
      toast.error('Gửi đơn hàng thất bại!')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center flex flex-col items-center">
        <AiOutlineShoppingCart size={64} className="text-blue-200 mb-4" />
        <div className="text-gray-500 text-2xl font-semibold mb-2">Giỏ hàng của bạn đang trống.</div>
        <div className="text-blue-700">Hãy thêm acc vào giỏ để bắt đầu mua sắm!</div>
       
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-8 flex items-center gap-2">
        <AiOutlineShoppingCart size={32} /> Giỏ hàng của bạn
      </h1>
      <div className="flex flex-col gap-6 mb-8">
        {cart.map(acc => (
          <div key={acc.id} className="flex flex-col md:flex-row items-center gap-6 bg-blue-50 rounded-xl p-4 border border-blue-200 shadow hover:shadow-xl transition">
            <img src={acc.image} alt={acc.name} className="w-32 h-32 object-contain rounded-lg border-4 border-blue-600 bg-white" />
            <div className="flex-1 flex flex-col items-center md:items-start">
              <div className="font-bold text-xl text-blue-800 mb-1">{acc.name}</div>
              <div className="text-blue-700 text-lg font-semibold mb-2">{acc.price}</div>
              <div className="text-gray-600 text-sm mb-2 text-center md:text-left">{acc.description}</div>
              <div className="text-xs text-gray-400">ID: {acc.id}</div>
            </div>
            <button
              className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-500 border border-red-200 px-4 py-2 rounded transition font-semibold mt-2 md:mt-0"
              onClick={() => removeFromCart(acc.id)}
            >
              <AiOutlineDelete size={20} /> Xóa
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6">
        <div className="text-xl font-bold text-blue-800">Tổng tiền: <span className="text-green-600">{total.toLocaleString()}đ</span></div>
        <button className="bg-green-600 hover:bg-green-800 text-white text-lg font-bold px-8 py-3 rounded-lg shadow transition" onClick={() => setShowModal(true)}>Thanh toán ngay</button>
      </div>
      {/* Modal xác nhận thanh toán */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in flex flex-col gap-4 relative">
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Xác nhận đơn hàng</h2>
            <input required name="name" value={form.name} onChange={handleChange} placeholder="Họ tên" className="border rounded px-4 py-2" />
            <input required name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border rounded px-4 py-2" />
            <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" className="border rounded px-4 py-2" />
            <div className="text-gray-700 text-sm mb-2">Tổng tiền: <span className="text-green-600 font-bold">{total.toLocaleString()}đ</span></div>
            <button type="submit" disabled={loading} className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Đang gửi...' : 'Xác nhận & Gửi đơn hàng'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
} 