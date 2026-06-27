import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealChar } from './Animations'

export default function PostLayout({ title, children }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      {/* Post Header — large centered title like reference site */}
      <section style={{
        background: 'var(--void)',
        padding: '4rem 0 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--hairline)'
      }}>
        <div className="wrap-narrow">
          <RevealChar
            as="h1"
            text={title}
            delay={0.05}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 300,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--post-title)',
              textAlign: 'center',
              display: 'block',
              width: '100%',
            }}
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
            {children}
          </motion.article>
        </div>
      </section>
      <style>{`
        .post-header-inner-title { display: none !important; }
        .uicore-page-title { display: none !important; }
        .uicore-animate.ui-breadcrumb { display: none !important; }
        .uicore-title { display: none !important; }
        .uicore-entry-meta { display: none !important; }
        .post-content{font-size:18px;line-height:1.8;color:var(--smoke); overflow-x: hidden; max-width: 100vw;}
        .post-content h2,.post-content h3,.post-content h4{color:var(--pure);margin-top:2em;margin-bottom:.75em;font-weight:300;font-family:var(--font-heading)}
        .post-content h2{font-size:26px;letter-spacing:-.01em}
        .post-content h3{font-size:20px;letter-spacing:-.01em}
        .post-content h4{font-size:17px}
        .post-content p{margin-bottom:1.25em}
        .post-content ul,.post-content ol{margin-bottom:1.25em;padding-left:1.5em}
        .post-content li{margin-bottom:.5em}
        .post-content p, .post-content li {
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
          -webkit-text-stroke: 0px transparent;
          transition: color 0.3s ease, text-decoration-color 0.3s ease, -webkit-text-stroke 0.2s ease;
        }
        .post-content p:hover, .post-content li:hover {
          color: var(--pure);
          -webkit-text-stroke: 0.3px currentColor;
          text-decoration-color: var(--underline-hover);
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
