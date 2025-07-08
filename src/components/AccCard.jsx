import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { SiZalo } from 'react-icons/si'
import { useCart } from '../contexts/CartContext'
import { BsCartPlus } from "react-icons/bs";
import { FaFacebookMessenger } from 'react-icons/fa'
// CSS cho moving border
const movingBorderStyle = `
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`


export default function AccCard({ acc, disableNavigate }) {
  const navigate = useNavigate()
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

  // Thêm vào giỏ hàng (context)
  const handleAddToCart = e => {
    e.stopPropagation();
    if (addToCart(acc)) {
      toast.success('Đã thêm vào giỏ hàng!')
    } else {
      toast.error('Acc đã có trong giỏ hàng!')
    }
  }


  return (
    <div className="bg-white relative border border-blue-200 rounded-lg shadow flex flex-col items-center cursor-pointer hover:shadow-xl transition" >
      <div
        onClick={disableNavigate ? undefined : goToDetail}
        className="relative w-full h-full"
      >
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
      <div className="p-4 flex flex-col gap-1 w-full">
        <h2
          onClick={disableNavigate ? undefined : goToDetail}
          className="text-blue-800 font-bold text-sm md:text-lg cursor-pointer hover:text-blue-600"
        >{acc.name}</h2>
        <div className="absolute top-2 right-2 text-md rounded-md text-blue-700 font-bold mb-1 bg-white px-2 py-1">ID: {acc.id}</div>
        <p className="text-blue-800 font-bold text-xs md:text-[14px]">Giá: <span className="text-red-500 font-bold">{acc.price}</span> </p>
        <p className="text-gray-700 text-xs md:text-sm mb-2">{acc.description}</p>
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
  )
} 