import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function Footer() {
	const { theme } = useTheme(); // kept for imports compatibility
	return (
		<footer
			className="site-footer"
			style={{
				background: "linear-gradient(to bottom, #000000 0%, #000000 10px, transparent 100px), radial-gradient(circle at 100% 150px, rgba(212, 168, 83, 0.15), transparent 60%), #000000",
				borderTop: "none",
				padding: "40px 0 40px",
				position: "relative",
				overflow: "hidden"
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
						<Link to="/" className="footer-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative', width: '330px', height: '80px', overflow: 'hidden', flexShrink: 0, marginLeft: '-16px', marginTop: '-12px' }}>
							<img
								className="footer-logo-img"
								src="/assets/images/dhan-logo-dark.png"
								alt="Dhan Opinion"
								style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-48%)', width: '330px', height: 'auto' }}
							/>
						</Link>

					</div>

					{/* Navigation */}
					<div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 12 }}>
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
					<div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 12 }}>
						<Link to="/about-us#contact" className="footer-link-hover">
							<span className="dot"></span>
							<span className="text">Connect</span>
						</Link>
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
							<Link to="/consulting-waitlist" className="btn footer-consulting-btn" style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.05em' }}>
								Personalised Consulting
							</Link>
						</div>
					</div>
				</div>

				<div className="hairline" style={{ marginBottom: 32, background: 'rgba(255,255,255,0.1)' }} />

				<div className="footer-bottom-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
					<p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: ".02em", margin: 0 }}>
						© 2026 Dhanopinion. All Rights Reserved.
					</p>
				</div>
			</div>
			<style>{`
				.footer-link-hover {
					display: flex;
					align-items: center;
					color: rgba(255,255,255,0.6);
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
					color: #ffffff;
				}
				.footer-link-hover:hover .dot {
					opacity: 1;
					transform: scale(1);
					margin-right: 8px;
				}
				.footer-link-hover:hover .text {
					transform: translateX(4px);
				}
                
                .footer-consulting-btn {
                    background: #ffffff;
                    color: #000000;
                    border: none;
                    transition: all 0.3s ease;
                }
                .footer-consulting-btn:hover {
                    background: #e6e6e6;
                    color: #000000;
                    transform: translateY(-2px);
                }
			`}</style>
		</footer>
	);
}
