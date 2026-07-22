import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HoverFlip, RevealChar } from '../components/Animations'
import { useRef, useState, useEffect } from 'react'
import { client } from '../sanityClient'

/* ─── Single Step Card with scroll-driven reveal ─── */
function StepCard({ step, index, totalSteps }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" })
  const isEven = index % 2 === 0

  // Parallax on the ghost number
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.6, 1, 0.6, 0])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.92,
      rotateX: 6,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  }

  return (
    <div
      ref={cardRef}
      className="steps-timeline-item"
      style={{
        display: 'flex',
        justifyContent: isEven ? 'flex-start' : 'flex-end',
        width: '100%',
        padding: '0 0 clamp(40px, 6vw, 80px) 0',
        position: 'relative'
      }}
    >
      {/* Timeline node (the dot on the spine) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="steps-timeline-node"
        style={{
          position: 'absolute',
          left: '50%',
          top: '48px',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={isInView ? {
            scale: [1, 2.2, 1],
            opacity: [0.5, 0, 0.5]
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        {/* Core dot */}
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 20px rgba(212,168,83,0.6), 0 0 40px rgba(212,168,83,0.2)',
          position: 'relative',
          zIndex: 2
        }} />
      </motion.div>

      {/* The Card */}
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="steps-card-wrapper"
        style={{
          width: 'calc(50% - 60px)',
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid var(--hairline)',
          borderRadius: '24px',
          padding: 'clamp(28px, 4vw, 52px)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
          className="steps-card-inner"
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(212,168,83,0.25)'
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(212,168,83,0.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--hairline)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Corner ambient glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-100px',
              right: isEven ? '-100px' : 'auto',
              left: isEven ? 'auto' : '-100px',
              width: '300px',
              height: '300px',
              background: 'var(--gold-glow)',
              filter: 'blur(60px)',
              borderRadius: '50%',
              pointerEvents: 'none',
              opacity: glowOpacity
            }}
          />

          {/* Ghost number - parallax float */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '16px',
              left: 'auto',
              fontSize: 'clamp(80px, 12vw, 160px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px var(--hairline)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              y: ghostY
            }}
          >
            {step.num}
          </motion.div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Top row: step label + icon */}
            <motion.div variants={childVariants} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)'
              }}>
                Step {step.num}
              </span>

              <motion.div
                variants={iconVariants}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--gold-glow)',
                  border: '1px solid rgba(212,168,83,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'var(--gold)',
                  flexShrink: 0
                }}
              >
                <i className={step.icon}></i>
              </motion.div>
            </motion.div>

            {/* Gold accent line */}
            <motion.div
              variants={lineVariants}
              style={{
                width: '44px',
                height: '2px',
                background: 'linear-gradient(90deg, var(--gold), var(--gold-deep))',
                marginBottom: '20px',
                borderRadius: '2px',
                transformOrigin: 'left center'
              }}
            />

            {/* Title */}
            <motion.h2 variants={childVariants} className="t-h1" style={{
              marginBottom: '18px',
              lineHeight: 1.2,
            }}>
              {step.title}
            </motion.h2>

            {/* Description */}
            <motion.p variants={childVariants} className="t-body" style={{
              lineHeight: 1.85,
              marginBottom: step.link ? '28px' : '0'
            }}>
              {step.desc}
            </motion.p>

            {/* CTA Button */}
            {step.link && (
              <motion.div variants={childVariants}>
                <Link
                  to={step.link.startsWith('/') ? step.link : `/steps/${step.link.replace(/^steps\//, '')}`}
                  className="btn btn-ghost btn-sm"
                  style={{
                    borderColor: 'rgba(212,168,83,0.4)',
                    color: 'var(--gold)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverFlip text="KNOW MORE" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Connector arm from card to timeline spine */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            position: 'absolute',
            top: '52px',
            [isEven ? 'right' : 'left']: '-60px',
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(212,168,83,0.4), rgba(212,168,83,0.1))',
            transformOrigin: isEven ? 'right center' : 'left center',
            zIndex: 5
          }}
        />
      </motion.div>
    </div>
  )
}

/* ─── Animated Progress Spine ─── */
function TimelineSpine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"]
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8
  })
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      transform: 'translateX(-50%)',
      width: '2px',
      zIndex: 5
    }}>
      {/* Background spine line (subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--hairline)',
        borderRadius: '1px'
      }} />

      {/* Animated gold fill */}
      <motion.div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'linear-gradient(180deg, var(--gold) 0%, var(--gold-deep) 50%, rgba(212,168,83,0.3) 100%)',
        borderRadius: '1px',
        transformOrigin: 'top center',
        scaleY
      }} />

      {/* Glow around the progress point */}
      <motion.div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
        filter: 'blur(8px)',
        top: useTransform(smoothProgress, v => `${v * 100}%`),
        pointerEvents: 'none'
      }} />

      {/* Moving Down Arrow at the head of the progress line */}
      <motion.div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: useTransform(smoothProgress, v => `calc(${v * 100}% + 10px)`),
        color: 'var(--gold)',
        fontSize: '14px',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <motion.i
          className="fa-solid fa-chevron-down"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

export default function StepsToInvestingSuccess() {
  const timelineRef = useRef(null)
  const sectionRef = useRef(null)
  const [steps, setSteps] = useState([])
  const [pageTitle, setPageTitle] = useState('Steps to Success')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "stepsToSuccessPage"][0]{
      title,
      steps[] {
        num,
        title,
        desc,
        icon,
        link
      }
    }`).then(data => {
      if (data) {
        if (data.title) setPageTitle(data.title)
        if (data.steps) setSteps(data.steps)
      }
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  if (loading) return null;

  return (
    <>
      {/* ── Intro ── */}
      <section className="sec" style={{
        background: 'var(--void)',
        paddingTop: 'clamp(40px, 5vw, 60px)',
        paddingBottom: 'clamp(30px, 4vw, 50px)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--hairline)'
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)', zIndex: 0 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tc mb-0">
            <RevealChar as="h1" text={pageTitle} className="t-mega mb-6" style={{ lineHeight: 0.95 }} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="t-body mb-0"
              style={{ maxWidth: 800, margin: '0 auto', textAlign: 'left', lineHeight: 1.8 }}
            >
              <p className="mb-4">Dear Investor,</p>
              <p className="mb-4">Thank you for your interest in Dhanopinion's investment advisory service. On this page you will find a set of steps that you can go through in order to discover the most suitable investment avenues for yourself. This service uses the new income tax regime for all decisions and illustrations.</p>
              <p className="mb-4">Should you wish to seek a confidential, paid consulting with one of our experts, kindly click the "Personalized Investment Consulting" button below. A personalised investment consulting service is expected to be launched in the future. At this time, you will be joining a wait-list.</p>
              <p className="mb-4">We hope this advisory service provides you with the key inputs you need to move forward in your investment journey. Before proceeding, please read the Disclaimer and move forward only if you agree with the terms therein.</p>
              <p className="mb-0">We wish you a successful investing journey!</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--gold)', marginTop: '20px', cursor: 'pointer' }}
            onClick={() => {
              const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }}
          >
            <span style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Jump to Success Steps</span>
            <motion.i
              className="fa-solid fa-chevron-down"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Vertical Timeline ── */}
      <section ref={sectionRef} style={{
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)'
      }}>
        {/* Ambient background glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(212,168,83,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(212,168,83,0.03) 0%, transparent 50%)'
        }} />

        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)',
          backgroundSize: '80px 80px', opacity: 0.35
        }} />

        {/* Timeline container */}
        <div
          ref={timelineRef}
          className="steps-timeline-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            padding: '0 24px',
            zIndex: 1
          }}
        >
          {/* Animated spine */}
          <TimelineSpine containerRef={timelineRef} />

          {/* Step cards */}
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}

          {/* Final node: completion badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '20px'
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-deep))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'var(--black)',
              boxShadow: '0 0 40px rgba(212,168,83,0.4), 0 0 80px rgba(212,168,83,0.15)',
              position: 'relative',
              zIndex: 10
            }}>
              <i className="fa-solid fa-check"></i>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Desktop: alternating left/right */
        @media (min-width: 901px) {
          .steps-timeline-item:nth-child(odd) .steps-card-wrapper {
            margin-right: auto;
          }
          .steps-timeline-item:nth-child(even) .steps-card-wrapper {
            margin-left: auto;
          }
        }

        /* Tablet & Mobile: stack cards to the right of a left-aligned spine */
        @media (max-width: 900px) {
          .steps-timeline-item {
            justify-content: flex-end !important;
          }
          .steps-timeline-node {
            left: 24px !important;
            transform: none !important;
          }
          .steps-card-wrapper {
            width: calc(100% - 60px) !important;
            margin-left: auto !important;
          }
          .steps-timeline-container > div:first-child {
            left: 24px !important;
            transform: none !important;
          }
          /* Hide connector arms on mobile */
          .steps-card-wrapper > div:last-child {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .steps-timeline-node {
            left: 16px !important;
          }
          .steps-card-wrapper {
            width: calc(100% - 44px) !important;
          }
          .steps-timeline-container > div:first-child {
            left: 16px !important;
          }
          .steps-card-inner {
            padding: 20px !important;
          }
        }

        /* Hover shimmer effect */
        .steps-card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212,168,83,0.03) 50%,
            transparent 100%
          );
          transition: left 0.8s ease;
          pointer-events: none;
          z-index: 0;
        }
        .steps-card-inner:hover::before {
          left: 100%;
        }
      `}</style>
    </>
  )
}
