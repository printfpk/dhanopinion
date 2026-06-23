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
				padding: "64px 0 40px",
			}}
		>
			<div className="wrap">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
						gap: 40,
						marginBottom: 64,
					}}
				>
					{/* Column 1: Logo & Socials */}
					<div>
						<div style={{ marginBottom: 24, position: 'relative', width: '250px', height: '60px', overflow: 'hidden' }}>
							<img 
								src={theme === 'dark' ? '/assets/images/dhan-logo-dark.png' : '/assets/images/dhan-logo-light.png'} 
								alt="Dhan Opinion" 
								style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-48%)', width: '250px', height: 'auto' }} 
							/>
						</div>
						<div style={{ display: 'flex', gap: 20 }}>
							<a href="#" style={{ color: 'var(--gold)', fontSize: '22px', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
								<i className="fa-brands fa-linkedin"></i>
							</a>
							<a href="#" style={{ color: 'var(--gold)', fontSize: '22px', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
								<i className="fa-brands fa-x-twitter"></i>
							</a>
						</div>
					</div>

					{/* Column 2: Quick Links */}
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<h4 style={{ color: 'var(--pure)', fontSize: '18px', marginBottom: '8px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
						{[
							{ name: 'About Us', to: '/about-us' },
							{ name: 'Disclaimer', to: '/disclaimer' },
							{ name: 'Contact Us', to: '/about-us#contact' }
						].map((link) => (
							<Link
								key={link.name}
								to={link.to}
								style={{
									fontSize: 15,
									color: "var(--smoke)",
									textDecoration: "none",
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									transition: 'color 0.2s'
								}}
								onMouseOver={e => { e.currentTarget.style.color = 'var(--gold)' }}
								onMouseOut={e => { e.currentTarget.style.color = 'var(--smoke)' }}
							>
								<i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', color: 'var(--gold)' }}></i>
								{link.name}
							</Link>
						))}
						<a
							href="mailto:response@dhanopinion.com"
							style={{
								fontSize: 15,
								color: "var(--smoke)",
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginTop: 8,
								transition: 'color 0.2s'
							}}
							onMouseOver={e => { e.currentTarget.style.color = 'var(--gold)' }}
							onMouseOut={e => { e.currentTarget.style.color = 'var(--smoke)' }}
						>
							<i className="fa-solid fa-envelope" style={{ fontSize: '12px', color: 'var(--gold)' }}></i>
							response@dhanopinion.com
						</a>
					</div>

					{/* Column 3: CTA */}
					<div>
						<h4 style={{ color: 'var(--pure)', fontSize: '18px', marginBottom: '16px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>Expert Guidance</h4>
						<p style={{ color: 'var(--smoke)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6, maxWidth: 300 }}>
							Ready to take control of your financial future? Speak with an expert advisor today for personalized strategies.
						</p>
						<Link to="/consulting-waitlist" className="btn btn-gold" style={{ display: 'inline-block', padding: '10px 18px', fontSize: '12px', letterSpacing: '0.05em' }}>
							Personalised Investment Consulting
						</Link>
					</div>
				</div>
				<div className="hairline" style={{ marginBottom: 24 }} />
				<p
					style={{
						fontSize: 11,
						color: "var(--steel)",
						letterSpacing: ".04em",
					}}
				>
					© 2026 Dhanopinion. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
}
