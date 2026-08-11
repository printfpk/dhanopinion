import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import GsapGlobalAnimator from './GsapGlobalAnimator'

import { Helmet } from 'react-helmet-async'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const siteUrl = 'https://dhanopinion.com'

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dhanopinion",
    "url": siteUrl,
    "logo": `${siteUrl}/wp-content/uploads/2023/07/finflow-favicon-2.png`
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Dhanopinion",
    "description": "Simplify Investing",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/information-centre?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  useEffect(() => {
    // 1. Scroll to hash if present, otherwise top
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // slight delay to ensure render
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

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
      <Helmet>
        <link rel="alternate" hreflang="x-default" href={`${siteUrl}${pathname}`} />
        <link rel="alternate" hreflang="en" href={`${siteUrl}${pathname}`} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
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
