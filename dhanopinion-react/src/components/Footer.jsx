import { Link } from "react-router-dom";

export default function Footer() {
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
						<div style={{ marginBottom: 16 }}>
							<span
								style={{
									fontWeight: 800,
									fontSize: 16,
									color: "var(--pure)",
									letterSpacing: "-.02em",
								}}
							>
								DHAN
							</span>
							<span
								style={{
									fontWeight: 300,
									fontSize: 16,
									color: "var(--gold)",
									letterSpacing: "-.02em",
									marginLeft: 4,
								}}
							>
								OPINION
							</span>
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
						<a
							href="mailto:response@dhanopinion.com"
							style={{
								fontSize: 15,
								color: "var(--gold)",
								textDecoration: "none",
							}}
						>
							Contact Us
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
