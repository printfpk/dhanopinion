import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
	HoverFlip,
	RevealChar,
	ScrollFillText,
	ScrollCharRevealText,
} from "../components/Animations";
import { SpreadCards } from "../components/SpreadCards";
import ParticleSphere from "../components/ParticleSphere";

const AnimatedParagraph = ({ text, style, delay = 0.5 }) => {
	const pRef = useRef(null);
	useGSAP(() => {
		if (!pRef.current) return;

		// Split into lines and words. Lines become the overflow mask.
		const split = new SplitType(pRef.current, { types: "lines, words" });

		// Make lines act as hidden overflow containers
		gsap.set(split.lines, { overflow: "hidden", verticalAlign: "top" });

		// Animate words inside each line together, staggered by line index
		split.lines.forEach((line, index) => {
			const words = line.querySelectorAll(".word");
			gsap.from(words, {
				y: "100%",
				opacity: 0,
				duration: 1.2,
				ease: "power3.out",
				delay: delay + index * 0.25,
			});
		});

		return () => {
			split.revert();
		};
	}, { scope: pRef });

	return (
		<p ref={pRef} style={style}>
			{text}
		</p>
	);
};

const fade = (d = 0) => ({
	initial: { opacity: 0, y: 40 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
});
const fadeX = (x, d = 0) => ({
	initial: { opacity: 0, x },
	whileInView: { opacity: 1, x: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
});

const startingPoints = [
	{
		icon: "🏆",
		label: "Easy Wins",
		desc: "Quick actions with no downside to improve your investment outcomes immediately.",
		to: "/easy-wins",
	},
	{
		icon: "⚡",
		label: "Strategy",
		desc: "A straightforward approach to building a portfolio that works.",
		to: "/simple-investment-strategy",
	},
	{
		icon: "◆",
		label: "Philosophy",
		desc: "Core principles behind every sound investment decision.",
		to: "/investment-philosophy",
	},
	{
		icon: "▣",
		label: "Learn",
		desc: "Deepen your knowledge with our research-backed articles.",
		to: "/information-centre",
	},
	{
		icon: "📈",
		label: "Steps to Success",
		desc: "Follow the key steps in our investing strategy, starting with the evaluation of debt.",
		to: "/steps-to-investing-success",
	},
];

export default function Home() {
	return (
		<>
			<div style={{ position: "relative" }}>
				<section
					className="home-hero"
					style={{
						minHeight: "100vh",
						display: "flex",
						alignItems: "center",
						position: "sticky",
						top: 0,
						overflow: "hidden",
						background: "var(--void)",
						zIndex: 0,
					}}
				>
					{/* Modern Mesh + Video Background */}
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: -1,
						}}
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							src="https://dhanopinion.com/wp-content/uploads/2023/09/Market-Loop-Background-Video-High-Resolution.mp4"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: "var(--video-opacity)",
								mixBlendMode: "var(--video-blend)",
							}}
						/>
						{/* Floating Glowing Orbs */}
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.3, 0.5, 0.3],
								x: [0, 50, 0],
								y: [0, -50, 0],
							}}
							transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
							style={{
								position: "absolute",
								width: "40vw",
								height: "40vw",
								borderRadius: "50%",
								background: "var(--hero-orb-1)",
								top: "-10vw",
								right: "10vw",
								filter: "blur(80px)",
							}}
						/>
						<motion.div
							animate={{
								scale: [1, 1.3, 1],
								opacity: [0.2, 0.4, 0.2],
								x: [0, -30, 0],
								y: [0, 30, 0],
							}}
							transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
							style={{
								position: "absolute",
								width: "40vw",
								height: "40vw",
								borderRadius: "50%",
								background: "var(--hero-orb-2)",
								bottom: "-10vw",
								left: "-5vw",
								filter: "blur(80px)",
							}}
						/>
						{/* Base Gradient Overlay */}
						<div
							style={{
								position: "absolute",
								inset: 0,
								background: "var(--hero-grad)",
							}}
						/>
					</div>

					<div
						className="wrap"
						style={{ position: "relative", zIndex: 1, width: "100%" }}
					>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: "5rem",
								alignItems: "center",
								minHeight: "100vh",
								padding: "120px 0 60px",
							}}
						>
							{/* ── LEFT: text ── */}
							<motion.div
								initial="hidden"
								animate="visible"
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: { staggerChildren: 0.15, delayChildren: 0.2 },
									}
								}}
								style={{ flex: "1 1 450px" }}
							>
								{/* Staggered text animation with blur */}
								<h1
									style={{
										fontSize: "clamp(56px, 7vw, 96px)",
										fontWeight: 700,
										lineHeight: 1.05,
										color: "var(--pure)",
										marginBottom: "24px",
										letterSpacing: "-0.03em",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<div style={{ overflow: "hidden", paddingBottom: "10px" }}>
										<motion.span
											variants={{
												hidden: { y: "100%", opacity: 0, filter: "blur(10px)" },
												visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", damping: 20, stiffness: 80 } }
											}}
											style={{ display: "inline-block" }}
										>
											Investing is
										</motion.span>
									</div>
									<div style={{ overflow: "hidden", paddingBottom: "20px" }}>
										<motion.span
											variants={{
												hidden: { y: "100%", opacity: 0, filter: "blur(10px)" },
												visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", damping: 20, stiffness: 80 } }
											}}
											style={{
												display: "inline-block",
												background: "var(--hero-text-grad)",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
											}}
										>
											Difficult
										</motion.span>
									</div>
								</h1>

								<AnimatedParagraph
									text="It is difficult for large institutions, and it is even more difficult for individuals because they have less knowledge and resources. You can make it easier by evaluating our suggestions and if you are convinced, implement them."
									delay={0.8}
									style={{
										fontSize: "18px",
										lineHeight: 1.7,
										color: "var(--smoke)",
										maxWidth: "500px",
										fontWeight: 400,
										margin: 0,
									}}
								/>
							</motion.div>

							{/* ── RIGHT: Focus points (Floating Glass Bento Cards) ── */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 1, delay: 0.5 }}
								style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "24px", perspective: "1000px" }}
							>
								{/* Premium Bento Card Header */}
								<motion.div
									initial={{ opacity: 0, y: 20, rotateX: 20 }}
									animate={{ opacity: 1, y: 0, rotateX: 0 }}
									transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "16px",
										background: "var(--hero-glass)",
										backdropFilter: "blur(24px)",
										border: "1px solid var(--hero-glass-border)",
										borderRadius: "24px",
										padding: "20px 32px",
										width: "fit-content",
										boxShadow: "var(--shadow-nav)",
									}}
								>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
									>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#paint0_linear)" />
											<defs>
												<linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
													<stop stopColor="var(--gold, #a78bfa)" />
													<stop offset="1" stopColor="var(--orange, #60a5fa)" />
												</linearGradient>
											</defs>
										</svg>
									</motion.div>
									<h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "var(--pure)", letterSpacing: "0.02em" }}>
										We focus on
									</h2>
								</motion.div>

								<div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "10%" }}>
									{[
										"Simple investment strategies based on logic, reducing the clutter of options to a few good ones, saving you time and effort in implementation."
									].map((text, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, x: 30 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.8, delay: 0.9 + i * 0.2, type: "spring", stiffness: 80 }}
											whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
											style={{
												background: "var(--hero-glass-strong)",
												backdropFilter: "blur(24px)",
												border: "1px solid var(--hero-glass-border)",
												borderTop: "1px solid var(--hero-glass-border)",
												borderLeft: "1px solid var(--hero-glass-border)",
												borderRadius: "32px",
												padding: "32px 40px",
												boxShadow: "var(--shadow-bento)",
												position: "relative",
												overflow: "hidden",
											}}
										>
											{/* Ambient glow inside the card */}
											<div style={{
												position: "absolute",
												top: "-20px",
												left: "-20px",
												width: "100px",
												height: "100px",
												background: i === 0 ? "var(--gold-glow, rgba(96, 165, 250, 0.2))" : "var(--violet-glow, rgba(167, 139, 250, 0.2))",
												filter: "blur(40px)",
												borderRadius: "50%",
											}} />

											<p style={{ margin: 0, color: "var(--pure)", fontSize: "17px", fontWeight: 400, lineHeight: 1.6, position: "relative", zIndex: 1 }}>
												{text}
											</p>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* ══════ THE CHALLENGE ══════ */}
				<section
					className="sec"
					style={{
						background: "var(--charcoal)",
						position: "relative",
						zIndex: 1,
						boxShadow: "var(--shadow-section)",
					}}
				>
					<div className="wrap">
						<div className="g-2" style={{ alignItems: "center" }}>
							<div>
								<p className="t-overline mb-5">THE CHALLENGE</p>
								<RevealChar
									as="h2"
									text="Investment strategy is hard"
									highlight="hard"
									className="t-display mb-5"
									delay={0.1}
								/>
								<p className="t-body" style={{ maxWidth: 440 }}>
									It is difficult for large institutions, and it is even more
									difficult for individuals because they lack resources,
									expertise, and time.
								</p>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
								{[
									{
										num: "01",
										title: "Complex Choices",
										desc: "Tens of thousands of possible choices to make.",
									},
									{
										num: "02",
										title: "Uncertain Results",
										desc: "Chance and luck play a role in every outcome.",
									},
									{
										num: "03",
										title: "Limited Resources",
										desc: "Individuals lack what institutions have.",
									},
								].map((item, i) => (
									<motion.div
										key={i}
										{...fade(i * 0.1 + 0.3)}
										className="list-row"
										style={{
											padding: "28px 0",
											borderBottom: "1px solid var(--hairline)",
											display: "flex",
											gap: 24,
											alignItems: "flex-start",
										}}
									>
										<span
											style={{
												fontFamily: "var(--font-mono)",
												fontSize: 13,
												color: "var(--gold)",
												fontWeight: 600,
												minWidth: 28,
											}}
										>
											{item.num}
										</span>
										<div>
											<h3 className="t-h3" style={{ marginBottom: 4 }}>
												<HoverFlip text={item.title} />
											</h3>
											<p className="t-caption">{item.desc}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>

			<div style={{ position: "relative" }}>


				{/* ══════ STARTING POINTS ══════ */}
				<section
					className="sec wave-top"
					style={{
						background: "var(--path-bg)",
						color: "var(--path-text)",
						position: "relative",
						zIndex: 1,
						boxShadow: "var(--shadow-section-light)",
						"--wave-fill": "var(--charcoal)",
					}}
				>
					<div className="wrap">
						<p
							className="t-overline mb-3 tc"
							style={{ color: "var(--path-text)", marginTop: 12 }}
						>
							GET STARTED
						</p>
						<RevealChar
							as="h2"
							text="Choose your path"
							className="t-display mb-8 tc"
							style={{ justifyContent: "center", color: "var(--path-text)" }}
							delay={0.1}
						/>
						<div style={{ marginTop: 40 }}>
							<SpreadCards
								items={startingPoints}
								cols={4}
								className="g-4"
								renderCard={(s) => (
									<Link
										to={s.to}
										className="card"
										style={{
											textDecoration: "none",
											color: "inherit",
											display: "flex",
											flexDirection: "column",
											height: "100%",
											minHeight: 220,
										}}
									>
										<span
											style={{
												fontSize: 28,
												marginBottom: 20,
												display: "block",
												color: "var(--orange)",
											}}
										>
											{s.icon}
										</span>
										<h3 className="t-h3" style={{ marginBottom: 8 }}>
											<HoverFlip text={s.label} />
										</h3>
										<p className="t-caption" style={{ flex: 1, opacity: 0.9 }}>
											{s.desc}
										</p>
										<span
											style={{
												fontSize: 11,
												fontWeight: 700,
												letterSpacing: ".12em",
												textTransform: "uppercase",
												color: "var(--orange)",
												marginTop: 20,
											}}
										>
											<HoverFlip text="EXPLORE →" />
										</span>
									</Link>
								)}
							/>
						</div>
					</div>
				</section>
			</div>

			{/* ══════ WHAT YOU CAN EXPECT ══════ */}
			<section
				className="sec"
				style={{
					background: "var(--black)",
					borderTop: "1px solid var(--hairline)",
				}}
			>
				<div className="wrap">
					<div className="g-2" style={{ alignItems: "center" }}>
						<div>
							<p className="t-overline mb-5">BENEFITS</p>
							<RevealChar
								as="h2"
								text="What you can expect"
								className="t-h1"
								delay={0.1}
							/>
						</div>
						<div>
							{[
								{
									mark: "→",
									text: "A better match between your goals and your strategy",
								},
								{ mark: "→", text: "Reduced complexity in investment choices" },
								{ mark: "→", text: "Improved returns — a little" },
							].map((b, i) => (
								<motion.div
									key={i}
									{...fadeX(30, i * 0.1 + 0.3)}
									className="list-row"
									style={{
										display: "flex",
										gap: 16,
										padding: "20px 0",
										borderBottom: "1px solid var(--hairline)",
										alignItems: "center",
									}}
								>
									<span
										style={{
											color: "var(--gold)",
											fontSize: 16,
											fontWeight: 700,
										}}
									>
										{b.mark}
									</span>
									<span style={{ color: "var(--mist)", fontSize: 15 }}>
										{b.text}
									</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ══════ WHAT YOU SHOULD NOT EXPECT ══════ */}
			<section
				className="sec"
				style={{
					background: "var(--void)",
					borderTop: "1px solid var(--hairline)",
				}}
			>
				<div className="wrap">
					<div className="g-2" style={{ alignItems: "center" }}>
						<div>
							<p className="t-overline mb-5">REALISTIC EXPECTATIONS</p>
							<RevealChar
								as="h2"
								text="What you should not expect"
								highlight="not"
								className="t-h1"
								delay={0.1}
							/>
						</div>
						<div>
							{[
								"Market-beating returns consistently",
								"Timing the market perfectly",
								"Zero risk or guaranteed outcomes",
								"Complex trading strategies",
							].map((t, i) => (
								<motion.div
									key={i}
									{...fadeX(30, i * 0.1 + 0.3)}
									className="list-row"
									style={{
										display: "flex",
										gap: 16,
										padding: "18px 0",
										borderBottom: "1px solid var(--hairline)",
										alignItems: "center",
									}}
								>
									<span style={{ color: "var(--ash)", fontSize: 14 }}>✕</span>
									<span style={{ color: "var(--smoke)", fontSize: 15 }}>
										{t}
									</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ══════ WHO IS IT FOR ══════ */}
			<section
				className="sec"
				style={{
					background: "var(--black)",
					borderTop: "1px solid var(--hairline)",
				}}
			>
				<div className="wrap">
					<p className="t-overline mb-5 tc">TARGET AUDIENCE</p>
					<RevealChar
						as="h2"
						text="Who is it for?"
						className="t-h1 mb-7 tc"
						style={{ justifyContent: "center" }}
						delay={0.1}
					/>
					<p
						className="t-body tc mb-7"
						style={{ maxWidth: 560, margin: "0 auto var(--sp-7)" }}
					>
						Anyone interested in investing. However, particularly individuals
						looking for guidance on:
					</p>
					<div className="g-4">
						{[
							"Financial Planning",
							"Asset Allocation",
							"Fund Selection",
							"Tax Optimization",
						].map((t, i) => (
							<motion.div
								key={i}
								{...fade(i * 0.08 + 0.4)}
								style={{
									padding: "32px 24px",
									border: "1px solid var(--hairline)",
									textAlign: "center",
								}}
							>
								<h3 className="t-h3">
									<HoverFlip text={t} />
								</h3>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ══════ FEATURED: NPS ══════ */}
			<section className="sec" style={{ background: "var(--black)", borderTop: "1px solid var(--hairline)" }}>
				<div className="wrap">
					<motion.div
						{...fade(0.2)}
						style={{
							background: "linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(0, 0, 0, 0) 100%)",
							border: "1px solid rgba(212, 168, 83, 0.3)",
							borderRadius: 24, padding: "48px", textAlign: "center", position: "relative", overflow: "hidden"
						}}
					>
						<div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "var(--gold)", filter: "blur(100px)", opacity: 0.1 }} />
						<p className="t-overline mb-4" style={{ color: "var(--gold)" }}>ESSENTIAL GUIDE</p>
						<h2 className="t-h1 mb-4" style={{ color: "var(--pure)" }}>The National Pension System (NPS)</h2>
						<p className="t-body mb-8" style={{ maxWidth: 600, margin: "0 auto 32px" }}>
							One of the most powerful tools for retirement planning. Discover our in-depth analysis on how to utilize the NPS to secure your financial future effectively.
						</p>
						<Link to="/2023/08/20/national-pension-system-nps/" className="btn btn-white" style={{ background: "var(--gold)", color: "var(--black)", border: "none" }}>
							<HoverFlip text="Read the NPS Guide" />
						</Link>
					</motion.div>
				</div>
			</section>

			{/* ══════ CTA — Waitlist ══════ */}
			<section className="teal-band" style={{ "--wave-fill": "var(--black)" }}>
				<div className="wrap tc">
					<p className="t-overline mb-3" style={{ color: "var(--gold)" }}>1-ON-1 CONSULTING</p>
					<RevealChar
						as="h2"
						text="Join the Waitlist"
						className="t-display mb-5"
						style={{ color: "var(--pure)", justifyContent: "center" }}
						delay={0.1}
					/>
					<p
						style={{
							fontSize: 16,
							color: "var(--smoke)",
							marginBottom: 32,
							maxWidth: 400,
							margin: "0 auto 32px",
						}}
					>
						Due to high demand, our personal consulting is currently at capacity. Secure your spot in line today.
					</p>
					<motion.div {...fade(0.5)}>
						<a href="mailto:response@dhanopinion.com?subject=Join Consulting Waitlist" className="btn btn-white">
							<HoverFlip text="Get on the Waitlist" />
						</a>
					</motion.div>
				</div>
			</section>
		</>
	);
}
