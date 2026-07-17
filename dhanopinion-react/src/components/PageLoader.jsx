import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--void)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 300,
          color: 'var(--pure)',
          letterSpacing: '0.1em',
        }}
      >
        DHAN<span style={{ color: 'var(--gold)' }}>OPINION</span>
      </motion.div>
    </div>
  )
}
