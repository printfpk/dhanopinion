import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function GsapGlobalAnimator() {
  const { pathname } = useLocation()

  useGSAP(() => {
    let splitInstances = []

    // We use a small timeout to ensure the DOM (including Outlet content) is fully rendered
    const timer = setTimeout(() => {
      // Select main body paragraphs to animate. 
      // Not excluding captions or overlines so it applies globally as requested
      const paragraphs = document.querySelectorAll('main p:not(.no-anim)')
      
      paragraphs.forEach((p) => {
        // Skip if already split
        if (p.classList.contains('is-split')) return
        
        // Split text into lines
        const split = new SplitType(p, { types: 'lines' })
        p.classList.add('is-split')
        splitInstances.push(split)

        // To create a mask reveal effect, we wrap each line in a div with overflow hidden
        split.lines.forEach((line) => {
          const wrapper = document.createElement('div')
          wrapper.style.overflow = 'hidden'
          wrapper.style.display = 'block'
          line.parentNode.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        })

        // GSAP ScrollTrigger animation: lines slide up from being hidden under the wrapper
        gsap.fromTo(split.lines, 
          { 
            y: '100%',
            opacity: 0 // Keep opacity 0 initially so they are completely hidden
          },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1, // Stagger each line
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
      
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh()
      
    }, 150)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
      splitInstances.forEach(split => split.revert())
    }
  }, [pathname]) // Re-run whenever the route changes

  return null
}
