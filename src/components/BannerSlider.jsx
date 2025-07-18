import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { accImages } from '../assets/images'

const banners = [
  {
    id: 1,
    image: accImages.img_qr_boxchat,
    alt: 'Banner 1',
  },
  {
    id: 2,
    image: accImages.img_25tots,
    alt: 'Banner 2',
  },
  {
    id: 3,
    image: accImages.imgCheckLegit,
    alt: 'Banner 3',
  },
]

export default function BannerSlider({ fullHeight }) {
  return (
    <div className={fullHeight ? 'w-full h-full' : 'mb-8'}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className={fullHeight ? 'rounded-xl shadow-lg w-full h-full' : 'rounded-xl shadow-lg'}
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div className='w-full md:h-[450px] h-[300px] overflow-hidden rounded-xl'>
              <img
                src={banner.image}
                alt={banner.alt}
                className={fullHeight ? 'w-full h-full object-contain rounded-xl' : 'w-full h-full object-contain rounded-xl'}
              />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 