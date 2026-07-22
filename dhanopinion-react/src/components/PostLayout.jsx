import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HoverFlip, RevealChar } from './Animations'

export default function PostLayout({ title, preTitle, prevLink, nextLink, hideHeader = false, children }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      {/* Post Header — large centered title like reference site */}
      {!hideHeader && (
        <section style={{
          background: 'var(--void)',
          padding: '2.5rem 0 2rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--hairline)'
        }}>
        <div className="wrap-narrow">
          {preTitle && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)',
                display: 'block',
                marginBottom: '1.5rem'
              }}
            >
              {preTitle}
            </motion.span>
          )}
          <RevealChar
            key={title}
            as="h1"
            text={title}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 300,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--post-title)',
              textAlign: 'center',
              width: '100%',
              margin: 0,
              justifyContent: 'center'
            }}
          />
        </div>
      </section>
      )}

      <section className="post-content-sec" style={{ background: 'var(--void)', paddingTop: hideHeader ? '2rem' : '2rem', paddingBottom: 'var(--sp-9)' }}>
        <div className="wrap-narrow">
          <motion.article
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="post-content"
          >
            {children}
            
            {(prevLink || nextLink) && (
              <div className="post-nav-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--hairline)' }}>
                {prevLink ? (
                  <Link to={prevLink} className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(212,168,83,0.4)', color: 'var(--gold)' }}>
                    <HoverFlip text="PREVIOUS STEP" />
                  </Link>
                ) : <div />}
                {nextLink ? (
                  <Link to={nextLink} className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(212,168,83,0.4)', color: 'var(--gold)' }}>
                    <HoverFlip text="NEXT STEP" />
                  </Link>
                ) : <div />}
              </div>
            )}
          </motion.article>
        </div>
      </section>
      {!hideHeader && (
        <style>{`
          .post-header-inner-title { display: none !important; }
          .uicore-page-title { display: none !important; }
          .uicore-animate.ui-breadcrumb { display: none !important; }
          .uicore-title { display: none !important; }
          .uicore-entry-meta { display: none !important; }
        `}</style>
      )}
      <style>{`
        .post-content { 
          font-family: var(--font-body);
          font-size: 17px; 
          font-weight: 400;
          line-height: 1.8; 
          color: var(--smoke); 
          overflow-x: hidden; 
          max-width: 100vw; 
        }
        
        /* Heading Defaults */
        .post-content h1, .post-content h2, .post-content h3, 
        .post-content h4, .post-content h5, .post-content h6 {
          font-family: var(--font-heading);
          color: var(--pure);
          font-weight: 400;
          line-height: 1.3;
          margin-top: 2em;
          margin-bottom: 0.75em;
        }
        .post-content h1 { font-size: clamp(26px, 4vw, 32px); letter-spacing: -0.01em; }
        .post-content h2 { font-size: clamp(24px, 3vw, 28px); letter-spacing: -0.01em; }
        .post-content h3 { font-size: clamp(20px, 2.5vw, 24px); letter-spacing: -0.01em; }
        .post-content h4 { font-size: clamp(18px, 2vw, 20px); }
        
        /* Reduce gap when subheadings immediately follow main headings */
        .post-content h2 + h3, 
        .post-content h3 + h4 {
          margin-top: 0.5em;
        }
        
        /* Paragraphs */
        .post-content p {
          margin-bottom: 1.5em;
          font-size: 17px;
        }
        
        /* Date formatting */
        .post-content .post-date {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 14px;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 1.5em;
          margin-top: 0;
          border-bottom: 1px solid var(--hairline);
          padding-bottom: 0.75em;
          display: inline-block;
        }

        /* Prevent double margins when a heading immediately follows the date */
        .post-content .post-date + h1,
        .post-content .post-date + h2,
        .post-content .post-date + h3,
        .post-content .post-date + h4,
        .post-content .post-date + h5,
        .post-content .post-date + h6 {
          margin-top: 0;
        }

        /* Lists */
        .post-content ul, .post-content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
        .post-content li { margin-bottom: 0.5em; }
        
        /* Hover underline only — no color change */
        .post-content .line {
          border-bottom: 1px solid transparent;
          padding-bottom: 1px;
          transition: border-color 0.3s ease;
          width: fit-content;
        }
        .post-content p:not(.post-date):hover .line {
          border-color: var(--underline-hover);
          color: var(--pure);
        }
        .post-content p:not(.post-date):hover {
          color: var(--pure);
        }
        /* Fallback for paragraphs without SplitType .line children */
        .post-content p:not(.post-date):not(:has(.line)) {
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
          transition: text-decoration-color 0.3s ease, color 0.3s ease;
        }
        .post-content p:not(.post-date):not(:has(.line)):hover {
          text-decoration-color: var(--underline-hover);
          color: var(--pure);
        }
        /* List items */
        .post-content li {
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
          transition: text-decoration-color 0.3s ease;
        }
        .post-content li:hover {
          text-decoration-color: var(--underline-hover);
        }
        .post-content strong { color: var(--pure); font-weight: 600; }
        .post-content a { color: var(--gold); text-decoration: underline; text-decoration-color: rgba(212,168,83,0.3); text-underline-offset: 3px; transition: text-decoration-color 0.2s; }
        .post-content a:hover { text-decoration-color: var(--gold); }
        .post-content blockquote { border-left: 2px solid var(--gold); padding-left: 1.5em; margin: 1.5em 0; color: var(--smoke); font-style: italic; }
        
        /* Tables */
        .post-content .table-container { overflow-x: auto; margin: 2em 0; border-radius: 12px; border: 1px solid var(--hairline); background: rgba(255,255,255,0.02); }
        .post-content table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .post-content th, .post-content td { padding: 14px 16px; border-bottom: 1px solid var(--hairline); text-align: left; font-size: 15px; }
        .post-content th { color: var(--pure); font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.04); }
        .post-content tr:last-child td { border-bottom: none; }
      `}</style>
    </>
  )
}
