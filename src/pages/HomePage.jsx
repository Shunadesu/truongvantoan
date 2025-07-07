import { Link } from 'react-router-dom'
import { accMoGoi, accDoiHinh, accFCTrang } from '../data'
import AccCard from '../components/AccCard'
import banner from '../assets/img/banner.gif'
import { SiZalo } from 'react-icons/si'
import { accImages } from '../assets/images'
import SEOHead from '../components/SEOHead'

// SEO Meta Data
const SEO_DATA = {
  title: 'truongvantoan.com - Shop Bán Account Game Uy Tín Hàng Đầu Việt Nam',
  description: 'Mua bán account game Liên Quân, Free Fire, FIFA Online 4 giá rẻ, uy tín, giao hàng nhanh. Shop account game chất lượng cao với nhiều ưu đãi hấp dẫn.',
  keywords: 'account game, mua acc game, bán acc game, acc liên quân, acc free fire, acc fifa, shop game, game account',
  ogImage: banner,
  canonical: 'https://truongvantoan.com'
}

// Social Media Links
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/toan.truong1003',
  zalo: 'https://zalo.me/0931133159',
  phone: 'tel:0931133159'
}

// Social Button Component
const SocialButton = ({ href, icon, children, bgColor, hoverColor, isPhone = false }) => (
  <a 
    href={href} 
    target={isPhone ? undefined : "_blank"}
    rel={isPhone ? undefined : "noopener noreferrer"}
    className={`flex items-center gap-3 ${bgColor} text-white px-6 py-3 rounded-lg font-semibold ${hoverColor} transition duration-300 shadow-lg hover:shadow-xl`}
  >
    {icon}
    {children}
  </a>
)

// Facebook Icon
const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-white">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
  </svg>
)

// Zalo Icon
const ZaloIcon = () => (
    <SiZalo size={24} className="text-white" />
)

// Phone Icon
const PhoneIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-white">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
  </svg>
)

export default function HomePage() {

  // Lấy 4 sản phẩm nổi bật từ các danh sách
  const featuredProducts = [
    ...accMoGoi.slice(0, 2).map(item => ({ ...item, uniqueId: `mo_goi_${item.id}` })),
    ...accDoiHinh.slice(0, 2).map(item => ({ ...item, uniqueId: `doi_hinh_${item.id}` }))
  ]

  return (
    <>
      <SEOHead 
        title={SEO_DATA.title}
        description={SEO_DATA.description}
        keywords={SEO_DATA.keywords}
        image={SEO_DATA.ogImage}
        url={SEO_DATA.canonical}
      />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden rounded-lg">
        {/* Background Image */}
        <img 
          src={accImages.bannerchealse} 
          alt="Trương Văn Toàn Banner" 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Overlay để làm mờ */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        {/* Gradient overlay để tăng độ tương phản */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-blue-700/70"></div>
        
        {/* Content */}
        <div className="relative z-10 container max-w-[1240px] mx-auto px-4">
          <div className="grid p-4 md:grid-cols-1 gap-12 justify-center items-center text-center">
            <div className="p-4 w-full">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                truongvantoan.com
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-md">
                Shop bán account game uy tín hàng đầu Việt Nam
              </p>
              {/* Social Media & Contact Buttons */}
              <div className="flex w-full flex-wrap gap-2 md:gap-4 justify-center items-center">
                <SocialButton 
                  href={SOCIAL_LINKS.facebook}
                  icon={<FacebookIcon />}
                  bgColor="bg-blue-600"
                  hoverColor="hover:bg-blue-700"
                >
                  Facebook
                </SocialButton>

                <SocialButton 
                  href={SOCIAL_LINKS.zalo}
                  icon={<ZaloIcon />}
                  bgColor="bg-blue-500"
                  hoverColor="hover:bg-blue-600"
                >
                 0931.133.159
                </SocialButton>

                <SocialButton 
                  href={SOCIAL_LINKS.phone}
                  icon={<PhoneIcon />}
                  bgColor="bg-green-600"
                  hoverColor="hover:bg-green-700"
                  isPhone={true}
                >
                  0931.133.159
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Featured Products */}
        <section className="py-8 bg-white rounded-lg">
          <div className="container max-w-[1240px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4">Danh sách Tài khoản FC Trắng</h2>
              {/* <p className="text-xl text-gray-600">Những account game chất lượng cao được nhiều người chọn</p> */}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8">
              {accFCTrang.map(product => (
                <AccCard key={product.uniqueId} acc={product} />
              ))}
            </div>
            
          </div>
        </section>
        {/* Featured Products */}
        <section className="py-8 bg-white rounded-lg">
          <div className="container max-w-[1240px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4">Acc game giá hot</h2>
              <p className="text-xl text-gray-600">Những account game chất lượng cao được nhiều người chọn</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8">
              {featuredProducts.map(product => (
                <AccCard key={product.uniqueId} acc={product} />
              ))}
            </div>
            <div className="text-center">
              <Link 
                to="/shop" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300 inline-block shadow-lg hover:shadow-xl"
              >
                Xem Tất Cả Acc
              </Link>
            </div>
          </div>
        </section>

        

      {/* Banner Section */}
      <section className="py-16">
        <div className="container max-w-[1240px] mx-auto px-4">
          <div className="flex flex-col gap-4">
           
            <Link to="https://www.facebook.com/photo/?fbid=2320510934798841&set=a.441073339409286" target="_blank">
            <img src={accImages.imgCheckLegit} alt="truongvantoan.com" className="w-full h-auto rounded-lg" />
            </Link>
            <img src={accImages.img_qr_boxchat} alt="truongvantoan.com" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Sẵn Sàng Mua Account Game?</h2>
          <p className="text-xl mb-8 text-blue-100">Tham gia cộng đồng game thủ cùng chúng tôi</p>
          
          {/* Social Media & Contact Buttons */}
          <div className="flex w-full flex-wrap gap-4 justify-center items-center">
            <SocialButton 
              href={SOCIAL_LINKS.facebook}
              icon={<FacebookIcon />}
              bgColor="bg-blue-600"
              hoverColor="hover:bg-blue-700"
            >
              Facebook
            </SocialButton>

            <SocialButton 
              href={SOCIAL_LINKS.zalo}
              icon={<ZaloIcon />}
              bgColor="bg-blue-500"
              hoverColor="hover:bg-blue-600"
            >
              0931.133.159
            </SocialButton>

            <SocialButton 
              href={SOCIAL_LINKS.phone}
              icon={<PhoneIcon />}
              bgColor="bg-green-600"
              hoverColor="hover:bg-green-700"
              isPhone={true}
            >
              0931.133.159
            </SocialButton>
          </div>
        </div>
      </section>
    </div>
    </>
  )
} 