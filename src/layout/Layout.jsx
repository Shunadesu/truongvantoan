import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'
import ScrollToTop from '../components/ScrollToTop'
import { Outlet } from 'react-router-dom'
import backgroundImage from '../assets/img/bannerchealse.jpeg'

export default function Layout() {

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundAttachment: 'fixed'
    }}>
      <ScrollToTop />
      <Header />
      <main className="container max-w-[1240px] mx-auto px-2 md:px-4 flex-1 py-8 relative z-10 rounded-lg overflow-hidden">
        <div className="p-6 rounded-lg bg-white backdrop-blur-sm">
          <Outlet />
        </div>
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
} 