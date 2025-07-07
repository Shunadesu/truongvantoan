import { useParams } from 'react-router-dom'
import { accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu } from '../data'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import AccCard from '../components/AccCard'

import { useCart } from '../contexts/CartContext'
import { FaFacebookMessenger } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'
import { BsCartPlus } from 'react-icons/bs'

function findAccById(id) {
  const all = [accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu].flat()
  return all.find(acc => String(acc.id) === String(id))
}

function getRelatedAccs(acc, id, n = 4) {
  if (!acc) return []
  const all = [accDoiHinh, accBPTrang, accFCTrang, dichVu].flat()
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


  const handleAddToCart = () => {
    if (addToCart(acc)) {
      toast.success('Đã thêm vào giỏ hàng!')
    } else {
      toast.error('Acc đã có trong giỏ hàng!')
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
            className="w-full h-full object-contain rounded mb-4 border-4 border-blue-600 cursor-pointer hover:opacity-90 transition-opacity" 
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
          <div className="text-gray-700 mb-4">ID: {acc.id} - Liên hệ ngay</div>
          <div className="grid grid-cols-3 items-center gap-2">
          {/* Facebook Button */}
          <a 
            href="https://www.facebook.com/toan.truong1003" 
            target="_blank" 
            title="Facebook" 
            onClick={e => e.stopPropagation()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
          >
            
            <FaFacebookMessenger size={24}/>
          </a>
          
          {/* Zalo Button */}
          <a 
            href="https://zalo.me/0931133159" 
            target="_blank" 
            title="Zalo" 
            onClick={e => e.stopPropagation()}
            className=" bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
          >
            
              <SiZalo size={24}/>
          </a>
          
          {/* Add to Cart Button */}
          <button 
            className=" bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg" 
            onClick={handleAddToCart}
            title="Thêm vào giỏ hàng"
          >
            <BsCartPlus size={24}/>
          </button>
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