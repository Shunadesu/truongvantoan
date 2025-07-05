import { useParams } from 'react-router-dom'
import { accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu } from '../data'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import AccCard from '../components/AccCard'
import emailjs from '@emailjs/browser'
import { useCart } from '../contexts/CartContext'

function findAccById(id) {
  const all = [accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu].flat()
  return all.find(acc => String(acc.id) === String(id))
}

function getRelatedAccs(acc, id, n = 4) {
  if (!acc) return []
  const all = [accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu].flat()
  let related = []
  if (acc.category) {
    related = all.filter(a => a.category === acc.category && String(a.id) !== String(id))
  }
  if (related.length < n) {
    // Bổ sung random nếu chưa đủ
    const others = all.filter(a => String(a.id) !== String(id) && (!acc.category || a.category !== acc.category))
    while (related.length < n && others.length > 0) {
      const idx = Math.floor(Math.random() * others.length)
      related.push(others[idx])
      others.splice(idx, 1)
    }
  }
  // Thêm uniqueId để tránh duplicate keys
  return related.slice(0, n).map((item, index) => ({ ...item, uniqueId: `related-${id}-${index}` }))
}

export default function AccDetailPage() {
  const { id } = useParams()
  const acc = findAccById(id)
  const images = acc?.images && acc.images.length > 0 ? acc.images : [acc?.image].filter(Boolean)
  const [mainImg, setMainImg] = useState(images[0])
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isZoomed, setIsZoomed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [modalType, setModalType] = useState('cart')
  const relatedAccs = getRelatedAccs(acc, id)
  const { addToCart } = useCart()

  useEffect(() => {
    if (acc) {
      document.title = acc.metaTitle || acc.name
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', acc.metaDescription || acc.description)
      else {
        const m = document.createElement('meta')
        m.name = 'description'
        m.content = acc.metaDescription || acc.description
        document.head.appendChild(m)
      }
    }
    return () => {
      document.title = 'truongvantoan.com'
    }
  }, [acc])

  useEffect(() => {
    setMainImg(images[0])
  }, [id])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleAddToCart = () => {
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

  const openImageModal = (image) => {
    setModalImage(image)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setModalImage('')
    setIsZoomed(false)
  }

  if (!acc) return <div className="text-red-600 text-xl">Không tìm thấy acc!</div>

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Hình ảnh acc */}
        <div className="flex-1 flex flex-col items-center">
          <img 
            src={mainImg} 
            alt={acc.name} 
            className="w-72 h-72 object-cover rounded mb-4 border-4 border-blue-600 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => openImageModal(mainImg)}
          />
          {images.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={img+idx}
                src={img}
                alt={acc.name + ' thumbnail'}
                className={`w-16 h-16 object-cover rounded border-2 cursor-pointer hover:opacity-80 transition-opacity ${mainImg === img ? 'border-blue-600' : 'border-gray-300'}`}
                onClick={() => {
                  setMainImg(img)
                  openImageModal(img)
                }}
              />
              ))}
            </div>
          )}
        </div>
        {/* Thông tin acc */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{acc.name}</h1>
          <div className="text-xl text-blue-700 font-semibold mb-2">Giá:  {acc.price}</div>
          <div className="text-gray-700 mb-4">{acc.description}</div>
          <div className="flex gap-2 mb-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900 transition text-lg" onClick={() => {setModalType('buy'); setShowModal(true);}}>Mua ngay</button>
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 transition text-lg" onClick={handleAddToCart}>Thêm vào giỏ</button>
          </div>
        </div>
      </div>
      {/* Tham khảo thêm */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-blue-800 text-2xl font-bold mb-6">Tham khảo thêm</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {relatedAccs.map(acc => (
            <AccCard key={acc.uniqueId} acc={acc} minPrice={null} />
          ))}
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

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={modalImage} 
              alt={acc.name} 
              className={`transition-all duration-300 rounded-lg shadow-2xl ${
                isZoomed 
                  ? 'w-auto h-auto max-w-none max-h-none scale-150 cursor-zoom-out' 
                  : 'max-w-full max-h-[90vh] object-contain cursor-zoom-in'
              }`}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => setIsZoomed(!isZoomed)}
            />
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            {isZoomed && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
                Double-click để thu nhỏ
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
} 