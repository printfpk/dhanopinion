import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import GsapGlobalAnimator from './GsapGlobalAnimator'

export default function Layout() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // 1. Scroll to top instantly on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    // 2. Make all external website links open in a new tab dynamically
    const handleGlobalClick = (e) => {
      const link = e.target.closest('a')
      if (link && link.href && link.href.startsWith('http')) {
        // Check if it's an external link
        if (!link.href.includes(window.location.hostname) && !link.href.includes('dhanopinion.com')) {
          link.setAttribute('target', '_blank')
          link.setAttribute('rel', 'noopener noreferrer')
        }
      }
    }
    
    // Use capture phase to ensure it runs before the default click action
    document.addEventListener('click', handleGlobalClick, true)
    return () => document.removeEventListener('click', handleGlobalClick, true)
  }, [])

  return (
    <>
      <GsapGlobalAnimator />
      <Navbar />
      {/* paddingTop matches single-row navbar height: 72px */}
      <main className="site-main" style={{ paddingTop: 72 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
