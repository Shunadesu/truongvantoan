import { useParams } from 'react-router-dom'
import { accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu } from '../data'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import AccCard from '../components/AccCard'

import { useCart } from '../contexts/CartContext'
import { FaFacebookMessenger } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'
import { BsCartPlus } from 'react-icons/bs'
import ReactDOM from 'react-dom'

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

// Thêm component ProductSchema để chèn schema.org Product
function ProductSchema({ acc }) {
  if (!acc) return null;
  const priceNumber = parseInt(acc.price.replace(/[^\d]/g, ''));
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": acc.name,
        "image": acc.images && acc.images.length > 0 ? acc.images : [acc.image],
        "description": acc.description,
        "sku": acc.id,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "VND",
          "price": priceNumber,
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2099-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        },
        "review": [{
          "@type": "Review",
          "author": "Khách hàng",
          "datePublished": "2024-01-01",
          "reviewBody": "Sản phẩm tốt!",
          "name": "Đánh giá mẫu",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          }
        }]
      })
    }} />
  );
}

export default function AccDetailPage() {
  const { id } = useParams()
  const acc = findAccById(id)
  const images = acc?.images && acc.images.length > 0 ? acc.images : [acc?.image].filter(Boolean)
  const [mainImg, setMainImg] = useState(images[0])
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [isZoomed, setIsZoomed] = useState(false)
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0, lastOffsetX: 0, lastOffsetY: 0 })
  const imgRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hasTransition, setHasTransition] = useState(true)
  const [showModalTrigger, setShowModalTrigger] = useState(false)

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

  useEffect(() => {
    if (!showImageModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImageModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageModal]);


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
    setIsZoomed(false)
    setDrag({ isDragging: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0, lastOffsetX: 0, lastOffsetY: 0 })
    setHasTransition(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setModalImage('')
    setIsZoomed(false)
    setDrag({ isDragging: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0, lastOffsetX: 0, lastOffsetY: 0 })
    setHasTransition(true)
  }

  // Xử lý kéo ảnh khi zoom (pointer events)
  const handlePointerDown = (e) => {
    if (!isZoomed) return
    e.preventDefault()
    setIsDragging(true)
    setHasTransition(false)
    setDrag(d => ({
      ...d,
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY
    }))
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = (e) => {
    if (!isZoomed || !isDragging) return
    e.preventDefault()
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    setDrag(d => ({
      ...d,
      offsetX: d.lastOffsetX + dx,
      offsetY: d.lastOffsetY + dy
    }))
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    setHasTransition(false)
    setDrag(d => ({
      ...d,
      isDragging: false,
      lastOffsetX: d.offsetX,
      lastOffsetY: d.offsetY
    }))
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  // Zoom đúng vị trí click
  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Chỉ set trigger, không mở modal trực tiếp
    setShowModalTrigger(true);
  };
  
  // useEffect để mở modal khi trigger được set
  useEffect(() => {
    if (showModalTrigger && mainImg) {
      openImageModal(mainImg);
      setShowModalTrigger(false);
    }
  }, [showModalTrigger, mainImg]);
  
  // Tách biệt logic mở modal cho thumbnail
  const handleThumbnailClick = (e, img) => {
    e.preventDefault();
    e.stopPropagation();
    setMainImg(img);
    // Delay một chút để tránh conflict
    setTimeout(() => {
      openImageModal(img);
    }, 100);
  };

  if (!acc) return <div className="text-red-600 text-xl">Không tìm thấy acc!</div>

  return (
    <>
      {/* Schema.org Product JSON-LD */}
      {acc && <ProductSchema acc={acc} />}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Hình ảnh acc */}
        <div className="flex-1 flex flex-col items-center">
          <img 
            src={mainImg} 
            alt={acc.name} 
            className="w-full h-full object-contain rounded mb-4 border-4 border-blue-600 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={handleImageClick}
          />
          {images.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <button
                key={img+idx}
                type="button"
                className={`p-0 border-none bg-transparent w-16 h-16 rounded ${mainImg === img ? 'border-blue-600' : 'border-gray-300'}`}
                style={{ outline: 'none' }}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMainImg(img);
                  handleThumbnailClick(e, img);
                }}
              >
                <img
                  src={img}
                  alt={acc.name + ' thumbnail'}
                  className="w-16 h-16 object-cover rounded"
                  draggable={false}
                />
              </button>
            ))}
          </div>
          )}
        </div>
        {/* Thông tin acc */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{acc.name}</h1>
          <div className="text-gray-700 mb-4">Mô tả: {acc.description}</div>
          <div className="text-gray-700 mb-4">Trạng thái: {acc.status}</div>
          <div className="text-xl text-blue-700 font-semibold mb-2">Giá:  {acc.price}</div>
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
      {showImageModal && ReactDOM.createPortal(
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 z-50 ${isZoomed ? '' : 'flex items-center justify-center p-4'}`}
          onClick={closeImageModal}
          style={isZoomed ? { padding: 0, display: 'block' } : {}}
        >
          <img
            src={modalImage}
            alt={acc.name}
            ref={imgRef}
            className={`rounded-lg shadow-2xl ${isZoomed
              ? 'fixed top-0 left-0 w-screen h-screen object-contain z-50 cursor-grab'
              : 'relative max-w-full max-h-[90vh] object-contain cursor-zoom-in'
            } ${hasTransition ? 'transition-all duration-300' : ''}`}
            style={isZoomed
              ? { transform: `scale(1.5) translate(${drag.offsetX}px, ${drag.offsetY}px)`, cursor: isDragging ? 'grabbing' : 'grab', background: 'black' }
              : {}
            }
            onClick={handleImageClick}
            onPointerDown={handlePointerDown}
            draggable={false}
          />
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>,
        document.body
      )}
    </>
  )
} 