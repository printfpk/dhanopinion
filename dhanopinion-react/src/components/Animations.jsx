import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const elements = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div };

export const HoverFlip = ({ text, style }) => {
  const words = text.split(' ');

  return (
    <motion.span initial="initial" whileHover="hover" style={{ display: 'inline-flex', flexWrap: 'wrap', perspective: 1000, ...style }}>
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

export const RevealChar = ({ text, highlight = "", highlightStyle, className, style, delay = 0, as = 'h2' }) => {
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
        const charColor = 'inherit';
        const wrapperStyle = (isHighlight && highlightStyle) ? highlightStyle : {};
        const italicStyle = isHighlight ? { fontStyle: 'italic' } : {};

        return (
          <span key={wordIndex} style={{ display: 'inline-flex', alignItems: 'center', ...wrapperStyle, ...italicStyle }}>
            <span style={{ display: 'inline-flex', overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={charVariants}
                  style={{ display: 'inline-block', color: charColor }}
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

export const ScrollFillText = ({ text, as = 'h2', className, style }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const insetRight = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${insetRight}% 0 0)`;

  const MotionComponent = elements[as] || motion.div;

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', ...style }}>
      {/* Base Layer: Gray */}
      <MotionComponent className={className} style={{ color: 'var(--smoke)', opacity: 0.4, margin: 0 }}>
        {text}
      </MotionComponent>

      {/* Top Layer: Blue Gradient */}
      <MotionComponent
        className={className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 0,
          backgroundImage: 'linear-gradient(90deg, #0055ff, #83e7ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          clipPath,
          color: 'transparent',
          width: '100%'
        }}
      >
        {text}
      </MotionComponent>
    </div>
  );
};

// Individual character component so useTransform hook is called at component top-level
const ScrollChar = ({ char, scrollYProgress, start, end }) => {
  const grayOpacity = useTransform(scrollYProgress, [start, end], [1, 0]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* Invisible spacer for sizing */}
      <span style={{ visibility: 'hidden' }}>{char}</span>
      {/* Blue gradient layer (always visible underneath) */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundImage: 'linear-gradient(90deg, #0055ff, #83e7ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {char}
      </span>
      {/* Gray overlay that fades out on scroll */}
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          color: 'rgba(140,140,140,1)',
          WebkitTextFillColor: 'rgba(140,140,140,1)',
          opacity: grayOpacity,
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

export const ScrollCharRevealText = ({ text, as = 'h2', className, style }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 40%"]
  });

  const words = text.split(' ');
  const totalChars = text.replace(/\s/g, '').length;

  const MotionComponent = elements[as] || motion.div;
  let charCount = 0;

  return (
    <MotionComponent
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        ...style
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', alignItems: 'center' }}>
          {word.split('').map((char, charIndex) => {
            const start = charCount / totalChars;
            const end = (charCount + 1) / totalChars;
            charCount++;
            return (
              <ScrollChar
                key={charIndex}
                char={char}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionComponent>
  );
};

export const TypewriterText = ({ text, delay = 0, style, className }) => {
  const chars = text.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Typewriter speed
        delayChildren: delay,
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline", transition: { duration: 0 } }
  };

  return (
    <motion.span
      className={className}
      style={{ display: "inline", ...style }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {chars.map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
