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
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
