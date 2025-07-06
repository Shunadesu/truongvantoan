import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'
import ScrollToTop from '../components/ScrollToTop'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />
     
      <main className="container max-w-[1240px] mx-auto px-2 md:px-4 flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
} 