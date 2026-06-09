import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function SpreadCards({ items, renderCard, cols = 4, className = "g-4" }) {
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
    <div className={className} style={{ perspective: 1000 }}>
      {items.map((item, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        
        const colDiff = midCol - col
        const rowDiff = midRow - row
        
        const xOffset = `calc(${colDiff * 100}% + ${colDiff * 24}px)`
        const yOffsetBase = `calc(${rowDiff * 100}% + ${rowDiff * 24}px)`
        
        return (
          <motion.div 
            key={i} 
            initial={isDesktop ? { 
              x: xOffset, 
              y: `calc(${yOffsetBase} + ${Math.abs(colDiff) * 20}px)`, 
              rotate: colDiff * -10, 
              opacity: 0 
            } : { opacity: 0, y: 50 }}
            animate={{ 
              x: "0%", 
              y: "0px", 
              rotate: 0, 
              opacity: 1 
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2 + i * 0.1, 
              type: "spring", 
              bounce: 0.4 
            }}
            style={{ 
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
