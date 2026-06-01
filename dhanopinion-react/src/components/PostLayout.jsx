import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealChar } from './Animations'

export default function PostLayout({ title, children }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <section className="post-header">
        <div className="wrap post-header-wrap">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="t-overline mb-5"
            style={{ color: 'var(--gold-deep)' }}
          >ARTICLE</motion.p>
          <RevealChar 
            as="h1" 
            text={title} 
            className="t-h1" 
            style={{ 
              maxWidth: 900, 
              lineHeight: 1.25, 
              fontWeight: 500, 
              letterSpacing: '-0.015em',
              color: 'var(--white)',
              textWrap: 'balance'
            }} 
            delay={0.1} 
          />
        </div>
      </section>
      <section className="sec post-content-sec" style={{ background: 'var(--void)' }}>
        <div className="wrap-narrow">
          <motion.article
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="post-content"
          >
            <div className="hairline-gold mb-7" />
            {children}
          </motion.article>
        </div>
      </section>
      <style>{`
        .post-header {
          min-height: 45vh;
          display: flex;
          align-items: center;
          background: var(--black);
          border-bottom: 1px solid var(--hairline);
        }
        .post-header-wrap {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }
        @media (max-width: 768px) {
          .post-header {
            min-height: auto;
          }
          .post-header-wrap {
            padding-top: 7rem;
            padding-bottom: 2rem;
          }
          .post-content-sec {
            padding-top: 2rem !important;
          }
        }
        .post-content{font-size:18px;line-height:1.8;color:var(--smoke)}
        .post-content h2,.post-content h3,.post-content h4{color:var(--pure);margin-top:2em;margin-bottom:.75em;font-weight:600}
        .post-content h2{font-size:26px;letter-spacing:-.02em}
        .post-content h3{font-size:20px;letter-spacing:-.01em}
        .post-content h4{font-size:17px}
        .post-content p{margin-bottom:1.25em}
        .post-content ul,.post-content ol{margin-bottom:1.25em;padding-left:1.5em}
        .post-content li{margin-bottom:.5em}
        .post-content p, .post-content li {
          transition: color 0.3s ease, text-decoration-color 0.3s ease;
          text-decoration: underline transparent;
          text-underline-offset: 4px;
        }
        .post-content p:hover, .post-content li:hover {
          text-decoration-color: var(--gold);
          color: var(--pure);
        }
        .post-content strong{color:var(--pure);font-weight:600}
        .post-content a{color:var(--gold);text-decoration:underline;text-decoration-color:rgba(212,168,83,.3);text-underline-offset:3px;transition:text-decoration-color .2s}
        .post-content a:hover{text-decoration-color:var(--gold)}
        .post-content blockquote{border-left:2px solid var(--gold);padding-left:1.5em;margin:1.5em 0;color:var(--smoke);font-style:italic}
        .post-content table{width:100%;border-collapse:collapse;margin:1.5em 0}
        .post-content th,.post-content td{padding:12px 16px;border-bottom:1px solid var(--hairline);text-align:left;font-size:14px}
        .post-content th{color:var(--pure);font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase}
      `}</style>
    </>
  )
}
