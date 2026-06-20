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
      {/* paddingTop matches two-row navbar height: 56px top row + 40px bottom row = 96px */}
      <main style={{ paddingTop: 96 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
