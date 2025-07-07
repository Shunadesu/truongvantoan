import BannerSlider from '../components/BannerSlider'
import CategorySection from '../components/CategorySection'
import CategoryNav from '../components/CategoryNav'
import { accDoiHinh, accBPTrang, accFCTrang, dichVu } from '../data'

const categories = [
  { key: 'fc_trang', title: 'Acc FC trắng', data: accFCTrang },
  { key: 'doi_hinh', title: 'Acc Giá trị đội hình', data: accDoiHinh },
  { key: 'bp_trang', title: 'Acc BP trắng', data: accBPTrang },
  { key: 'dich_vu', title: 'Dịch vụ', data: dichVu },
]

export default function ShopPage() {
  return (
    <>
      {/* <BannerSlider /> */}
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