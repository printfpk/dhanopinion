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
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: 40,
						marginBottom: 48,
					}}
				>
					<div>
						<div style={{ marginBottom: 16, position: 'relative', width: '250px', height: '60px', overflow: 'hidden' }}>
							<img 
								src={theme === 'dark' ? '/assets/images/dhan-logo-dark.png' : '/assets/images/dhan-logo-light.png'} 
								alt="Dhan Opinion" 
								style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-48%)', width: '250px', height: 'auto' }} 
							/>
						</div>
						<p
							style={{
								fontSize: 13,
								color: "var(--ash)",
								lineHeight: 1.6,
								maxWidth: 280,
							}}
						>
							Simplifying investing for individuals through research-backed
							guidance.
						</p>
					</div>
					<div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
						<Link
							to="/disclaimer"
							style={{
								fontSize: 15,
								color: "var(--smoke)",
								textDecoration: "none",
							}}
						>
							Disclaimer
						</Link>
						<Link
							to="/about-us#contact"
							style={{
								fontSize: 15,
								color: "var(--gold)",
								textDecoration: "none",
							}}
						>
							Contact Us
						</Link>
						<a
							href="mailto:response@dhanopinion.com"
							style={{
								fontSize: 15,
								color: "var(--smoke)",
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								gap: 7,
							}}
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<rect x="2" y="4" width="20" height="16" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
							response@dhanopinion.com
						</a>
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
