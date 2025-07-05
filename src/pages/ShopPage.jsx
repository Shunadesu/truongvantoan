import BannerSlider from '../components/BannerSlider'
import CategorySection from '../components/CategorySection'
import CategoryNav from '../components/CategoryNav'
import { accMoThe, accMoGoi, accDoiHinh, accBPTrang, accFCTrang, dichVu } from '../data'

const categories = [
  { key: 'mo_the', title: 'Acc mở thẻ', data: accMoThe },
  { key: 'mo_goi', title: 'Acc mở gói', data: accMoGoi },
  { key: 'doi_hinh', title: 'Acc đội hình', data: accDoiHinh },
  { key: 'bp_trang', title: 'Acc chứa BP trắng', data: accBPTrang },
  { key: 'fc_trang', title: 'Acc chứa FC trắng', data: accFCTrang },
  { key: 'dich_vu', title: 'Dịch vụ', data: dichVu },
]

export default function ShopPage() {
  return (
    <>
      <BannerSlider />
      <CategoryNav categories={categories} />
      {categories.map(cat => (
        <CategorySection
          key={cat.key}
          id={cat.key}
          title={cat.title}
          accs={cat.data}
        />
      ))}
    </>
  )
} 