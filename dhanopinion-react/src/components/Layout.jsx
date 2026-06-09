import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import GsapGlobalAnimator from './GsapGlobalAnimator'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <GsapGlobalAnimator />
      <Navbar />
      {/* Reduced paddingTop from 64 to 0 so the pages handle their own layout where needed, or minimal */}
      <main style={{ paddingTop: 72 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
