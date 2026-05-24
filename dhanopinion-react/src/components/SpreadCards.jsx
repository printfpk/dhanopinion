import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function SpreadCards({ items, renderCard, cols = 4, className = "g-4" }) {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center 50%']
  })

  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const numRows = Math.ceil(items.length / cols)
  const midCol = (cols - 1) / 2
  const midRow = (numRows - 1) / 2

  return (
    <div ref={containerRef} className={className} style={{ perspective: 1000 }}>
      {items.map((item, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        
        const colDiff = midCol - col
        const rowDiff = midRow - row
        
        const xOffset = `calc(${colDiff * 100}% + ${colDiff * 24}px)`
        const yOffsetBase = `calc(${rowDiff * 100}% + ${rowDiff * 24}px)`
        
        const x = useTransform(scrollYProgress, [0, 1], [isDesktop ? xOffset : '0%', '0%'])
        // Combine grid centering Y with the slight 20px overlap effect Y
        const y = useTransform(scrollYProgress, [0, 1], [isDesktop ? `calc(${yOffsetBase} + ${Math.abs(colDiff) * 20}px)` : '0px', '0px'])
        const rotate = useTransform(scrollYProgress, [0, 1], [isDesktop ? colDiff * -10 : 0, 0])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [isDesktop ? 0 : 1, 1, 1])

        return (
          <motion.div 
            key={i} 
            style={{ 
              x, y, rotate, opacity, 
              zIndex: items.length - Math.ceil(Math.abs(colDiff) + Math.abs(rowDiff)) 
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {renderCard(item, i)}
          </motion.div>
        )
      })}
    </div>
  )
}
