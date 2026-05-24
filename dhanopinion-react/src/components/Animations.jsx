import { motion } from 'framer-motion'

const elements = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div };

export const HoverFlip = ({ text }) => {
  const words = text.split(' ');
  
  return (
    <motion.span initial="initial" whileHover="hover" style={{ display: 'inline-flex', flexWrap: 'wrap', perspective: 1000 }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', position: 'relative', overflow: 'hidden' }}>
          <motion.span
            variants={{ initial: { y: 0, rotateX: 0 }, hover: { y: '-100%', rotateX: 90 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: wordIndex * 0.03 }}
            style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
          >
            {word}
          </motion.span>
          <motion.span
            variants={{ initial: { y: '100%', rotateX: -90 }, hover: { y: 0, rotateX: 0 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: wordIndex * 0.03 }}
            style={{ display: 'inline-block', position: 'absolute', inset: 0, color: 'var(--gold)', transformOrigin: 'center top' }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && <span style={{ width: '0.25em', display: 'inline-block' }} />}
        </span>
      ))}
    </motion.span>
  );
};

export const RevealChar = ({ text, highlight = "", className, style, delay = 0, as = 'h2' }) => {
  const MotionComponent = elements[as] || motion.div;
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      }
    }
  };

  const charVariants = {
    hidden: { y: '120%', rotateZ: 5, opacity: 0 },
    visible: { 
      y: 0, rotateZ: 0, opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <MotionComponent 
      className={className} 
      style={{ display: 'flex', flexWrap: 'wrap', ...style }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "100px" }}
    >
      {words.map((word, wordIndex) => {
        if (word === '\\n' || word === '\n') {
          return <div key={wordIndex} style={{ flexBasis: '100%', height: 0 }} />;
        }
        
        const isHighlight = highlight && word.toUpperCase().includes(highlight.toUpperCase());
        const color = isHighlight ? 'var(--gold)' : 'inherit';
        
        return (
          <span key={wordIndex} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={charVariants}
                  style={{ display: 'inline-block', color }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 && words[wordIndex + 1] !== '\\n' && words[wordIndex + 1] !== '\n' && (
              <span style={{ width: '0.25em', display: 'inline-block' }} />
            )}
          </span>
        )
      })}
    </MotionComponent>
  );
};
