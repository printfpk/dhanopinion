import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealChar } from './Animations'

export default function PostLayout({ title, children }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <section style={{ minHeight: '45vh', display: 'flex', alignItems: 'center', background: 'var(--black)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="t-overline mb-5"
          >ARTICLE</motion.p>
          <RevealChar as="h1" text={title} className="t-h1" style={{ maxWidth: 700 }} delay={0.1} />
        </div>
      </section>
      <section className="sec" style={{ background: 'var(--void)' }}>
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
        .post-content{font-size:16px;line-height:1.8;color:var(--smoke)}
        .post-content h2,.post-content h3,.post-content h4{color:var(--pure);margin-top:2em;margin-bottom:.75em;font-weight:600}
        .post-content h2{font-size:26px;letter-spacing:-.02em}
        .post-content h3{font-size:20px;letter-spacing:-.01em}
        .post-content h4{font-size:17px}
        .post-content p{margin-bottom:1.25em}
        .post-content ul,.post-content ol{margin-bottom:1.25em;padding-left:1.5em}
        .post-content li{margin-bottom:.5em}
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
