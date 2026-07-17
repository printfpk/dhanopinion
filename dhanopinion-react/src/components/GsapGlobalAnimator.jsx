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

    const runAnimation = () => {
      const paragraphs = document.querySelectorAll('.post-content-sec p:not(.no-split), .sec p:not(.no-split), .uicore-content p:not(.no-split), .elementor-widget-text-editor p:not(.no-split), h1:not(.no-split), h2:not(.no-split), h3:not(.no-split), h4:not(.no-split), h5:not(.no-split), h6:not(.no-split)')
      paragraphs.forEach((p) => {
        if (p.classList.contains('is-split')) return
        p.classList.add('is-split')

        const split = new SplitType(p, { types: 'lines' })
        splitInstances.push(split)

        split.lines.forEach((line) => {
          const wrapper = document.createElement('div')
          wrapper.style.overflow = 'hidden'
          wrapper.style.display = 'block'
          line.parentNode.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        })

        gsap.fromTo(split.lines, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
      ScrollTrigger.refresh()
    }

    const timer = setTimeout(runAnimation, 80)

    // Disabled MutationObserver to prevent infinite browser freezes.
    // The initial timeout is enough for static content.

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
      splitInstances.forEach(split => split.revert())
    }
  }, [pathname])

  return null
}
