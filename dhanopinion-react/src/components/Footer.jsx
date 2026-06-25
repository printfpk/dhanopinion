import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function Footer() {
	const { theme } = useTheme();
	return (
		<footer
			className="site-footer"
			style={{
				background: "var(--void)",
				borderTop: "1px solid var(--hairline)",
				padding: "80px 0 40px",
			}}
		>
			<div className="wrap">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "64px",
						marginBottom: 64,
					}}
				>
					{/* Brand Section */}
					<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
						<Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative', width: '210px', height: '56px', overflow: 'hidden', flexShrink: 0 }}>
							<img
								src={theme === 'dark' ? '/assets/images/dhan-logo-dark.png' : '/assets/images/dhan-logo-light.png'}
								alt="Dhan Opinion"
								style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-48%)', width: '210px', height: 'auto' }}
							/>
						</Link>
						<div style={{ display: 'flex', gap: 12, marginTop: "8px" }}>
							{/* X / Twitter */}
							<a href="#" style={{ color: 'var(--smoke)', width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--smoke)'; e.currentTarget.style.transform = 'translateY(0)' }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
							</a>
							{/* Instagram */}
							<a href="#" style={{ color: 'var(--smoke)', width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--smoke)'; e.currentTarget.style.transform = 'translateY(0)' }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
							</a>
							{/* LinkedIn */}
							<a href="#" style={{ color: 'var(--smoke)', width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--smoke)'; e.currentTarget.style.transform = 'translateY(0)' }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
							</a>
						</div>
					</div>

					{/* Navigation */}
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<h4 style={{ color: 'var(--pure)', fontSize: '13px', letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: '8px', fontWeight: 700 }}>Navigation</h4>
						{[
							{ name: 'Home', to: '/' },
							{ name: 'About Us', to: '/about-us' },
							{ name: 'Disclaimer', to: '/disclaimer' },
						].map((link) => (
							<Link
								key={link.name}
								to={link.to}
								className="footer-link-hover"
							>
								<span className="dot"></span>
								<span className="text">{link.name}</span>
							</Link>
						))}
					</div>

					{/* Contact & Consulting */}
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<h4 style={{ color: 'var(--pure)', fontSize: '13px', letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: '8px', fontWeight: 700 }}>Connect</h4>
						<a
							href="mailto:response@dhanopinion.com"
							className="footer-link-hover"
						>
							<span className="dot"></span>
							<span className="text" style={{ display: "flex", alignItems: "center", gap: 10 }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
								response@dhanopinion.com
							</span>
						</a>
						
						<div style={{ marginTop: "16px" }}>
							<Link to="/consulting-waitlist" className="btn btn-gold" style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.05em' }}>
								Personalised Consulting
							</Link>
						</div>
					</div>
				</div>
				
				<div className="hairline" style={{ marginBottom: 32 }} />
				
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
					<p style={{ fontSize: 13, color: "var(--steel)", letterSpacing: ".02em", margin: 0 }}>
						© 2026 Dhanopinion. All Rights Reserved.
					</p>
				</div>
			</div>
			<style>{`
				.footer-link-hover {
					display: flex;
					align-items: center;
					color: var(--ash);
					text-decoration: none;
					font-size: 15px;
					width: max-content;
					transition: color 0.3s ease;
				}
				.footer-link-hover .dot {
					width: 6px;
					height: 6px;
					background-color: currentColor;
					border-radius: 50%;
					opacity: 0;
					transform: scale(0);
					transition: all 0.3s ease;
					margin-right: 0px;
				}
				.footer-link-hover .text {
					transition: transform 0.3s ease;
				}
				.footer-link-hover:hover {
					color: var(--pure);
				}
				.footer-link-hover:hover .dot {
					opacity: 1;
					transform: scale(1);
					margin-right: 8px;
				}
				.footer-link-hover:hover .text {
					transform: translateX(4px);
				}
			`}</style>
		</footer>
	);
}
