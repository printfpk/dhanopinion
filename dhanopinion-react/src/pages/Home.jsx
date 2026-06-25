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
	TypewriterText,
} from "../components/Animations";
import { SpreadCards } from "../components/SpreadCards";
import ParticleSphere from "../components/ParticleSphere";
import MediaSkeleton from "../components/MediaSkeleton";

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
		label: "Simple Investment Strategy",
		desc: "A straightforward approach to building a portfolio that works.",
		to: "/simple-investment-strategy",
	},
	{
		icon: "◆",
		label: "Investment Philosophy",
		desc: "Core principles behind every sound investment decision.",
		to: "/investment-philosophy",
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
						minHeight: "calc(100vh - 72px)",
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
						<MediaSkeleton
							type="video"
							preload="none"
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
								gap: "1.5rem",
								alignItems: "flex-start",
								padding: "10px 0 0px", /* Removed bottom padding */
								marginTop: "0"
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
										fontSize: "clamp(40px, 5vw, 72px)",
										fontWeight: 300,
										fontFamily: "var(--font-heading)",
										lineHeight: 1.05,
										color: "var(--pure)",
										marginBottom: "0px",
										letterSpacing: "-0.01em",
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
											Investing is Difficult
										</motion.span>
									</div>
								</h1>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
									style={{
										fontSize: "18px",
										lineHeight: 1.7,
										color: "var(--smoke)",
										maxWidth: "500px",
										fontWeight: 400,
										margin: "12px 0 0 0",
									}}
								>
									It is difficult for large institutions, and it is even more difficult for individuals because they have less knowledge and resources. You can make it easier by evaluating our suggestions and if you are convinced, implement them.
								</motion.p>
							</motion.div>

							{/* ── RIGHT: We Focus On — Premium Card ── */}
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
								style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", alignItems: "stretch", gap: "10px" }}
							>
								{/* ── We focus on: label ── */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.65, duration: 0.6 }}
									style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
								>
									<motion.span
										animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
										transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
										style={{ fontSize: 16, color: "var(--orange)", lineHeight: 1 }}
									>✦</motion.span>
									<span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--pure)", opacity: 0.5, fontFamily: "var(--font-body)" }}>
										We focus on
									</span>
								</motion.div>

								{/* ── 2 Separate pill cards ── */}
								{[
									"Simple investment strategies that have a logic and can be implemented",
									"Reducing the clutter of options to a few good ones, saving you time and effort",
								].map((text, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.8 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
										whileHover={{ y: -3, boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)" }}
										style={{
											background: "var(--hero-glass-strong)",
											backdropFilter: "blur(32px)",
											WebkitBackdropFilter: "blur(32px)",
											borderRadius: "999px",
											border: "1px solid var(--hero-glass-border)",
											padding: "12px 20px",
											boxShadow: "0 12px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
											textAlign: "center",
										}}
									>
										<p style={{ margin: 0, fontSize: "clamp(15px, 1.5vw, 17px)", fontWeight: 300, fontFamily: "var(--font-heading)", color: "var(--pure)", lineHeight: 1.55, letterSpacing: "0.01em" }}>
											<TypewriterText text={text} delay={0.8 + i * 0.2 + 0.3} />
										</p>
									</motion.div>
								))}

								{/* ── NPS Promo Card ── */}
								<Link to="/2023/08/20/national-pension-system-nps/" style={{ textDecoration: "none", display: "block" }}>
									<motion.div
										initial={{ opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
										whileHover={{ y: -3, boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)" }}
										style={{
											background: "var(--hero-glass-strong)",
											backdropFilter: "blur(32px)",
											WebkitBackdropFilter: "blur(32px)",
											borderRadius: "999px",
											border: "1px solid var(--hero-glass-border)",
											padding: "8px 8px 8px 24px",
											boxShadow: "0 12px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											gap: "20px"
										}}
									>
										<p style={{ margin: 0, fontSize: "clamp(15px, 1.5vw, 17px)", fontWeight: 300, fontFamily: "var(--font-heading)", color: "var(--pure)", lineHeight: 1.55, letterSpacing: "0.01em" }}>
											<TypewriterText text="National Pension System (NPS)" delay={1.5} />
										</p>
										<div
											style={{
												flexShrink: 0,
												width: 40,
												height: 40,
												borderRadius: "50%",
												background: "var(--pure)",
												color: "var(--void)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
											}}
										>
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M5 12h14"></path>
												<path d="M12 5l7 7-7 7"></path>
											</svg>
										</div>
									</motion.div>
								</Link>
							</motion.div>
						</div>

						{/* ══════ STARTING POINTS (MOVED TO BOTTOM OF HERO) ══════ */}
						<div style={{ paddingTop: "40px", paddingBottom: "20px", width: "100%" }}>
							<RevealChar
								as="h2"
								text="Choose your starting point"
								className="t-display mb-4 tc"
								style={{
									justifyContent: "center",
									color: "var(--pure)",
									fontWeight: 300,
									fontFamily: "var(--font-heading)",
									letterSpacing: "0.01em"
								}}
								delay={0.1}
							/>
							<div style={{ marginTop: 24 }}>
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
												alignItems: "center",
												justifyContent: "space-between",
												textAlign: "center",
												height: "100%",
												minHeight: "auto",
												gap: 0,
												padding: "16px 12px",
											}}
										>
											{/* Icon — double ring circle */}
											<div
												style={{
													width: 48,
													height: 48,
													borderRadius: "50%",
													background: "linear-gradient(145deg, #fef9f0, #f3e8cd)",
													border: "2px solid rgba(212,168,83,0.3)",
													boxShadow: "0 0 0 5px rgba(212,168,83,0.06), 0 6px 20px rgba(212,168,83,0.1)",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 20,
													flexShrink: 0,
													marginBottom: 8,
												}}
											>
												{s.icon}
											</div>

											{/* Gold separator */}
											<div style={{
												width: 32,
												height: 1,
												background: "linear-gradient(90deg, transparent, #d4a853, transparent)",
												marginBottom: 8,
												flexShrink: 0,
											}} />

											{/* Title */}
											<h3
												style={{
													margin: 0,
													fontSize: "clamp(14px, 1.2vw, 16px)",
													fontWeight: 400,
													fontFamily: "var(--font-heading)",
													color: "#1a1714",
													lineHeight: 1.3,
													letterSpacing: "0.01em",
													flex: 1,
													display: "flex",
													alignItems: "center",
												}}
											>
												<HoverFlip text={s.label} />
											</h3>

											{/* Explore pill button */}
											<span
												style={{
													marginTop: 8,
													fontSize: 10,
													fontWeight: 700,
													letterSpacing: ".16em",
													textTransform: "uppercase",
													color: "#9a7a2e",
													border: "1px solid rgba(212,168,83,0.35)",
													borderRadius: "100px",
													padding: "6px 16px",
													background: "linear-gradient(135deg, rgba(212,168,83,0.06), rgba(212,168,83,0.02))",
													flexShrink: 0,
												}}
											>
												<HoverFlip text="EXPLORE →" />
											</span>
										</Link>
									)}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* ══════ SCOPE ══════ */}
			<section
				className="sec"
				style={{
					background: "var(--teal)",
					borderTop: "1px solid var(--hairline)",
				}}
			>
				<div className="wrap tc">

					<RevealChar
						as="h2"
						text="Scope"
						className="t-h1 mb-5 tc"
						style={{ justifyContent: "center" }}
						delay={0.1}
					/>
					<motion.p
						{...fade(0.3)}
						className="t-body tc"
						style={{ maxWidth: 680, margin: "0 auto" }}
					>
						The current scope covers financial assets such as mutual funds, government sponsored financial instruments and fixed deposits.
					</motion.p>
				</div>
			</section>

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
									heading: "Better Strategy",
									desc: "Creation of a better match between your goals, circumstances and preferences and your investments.",
								},
								{
									mark: "→",
									heading: "Reduced Complexity",
									desc: "Reduced investing complexity and better understanding of investment choices.",
								},
								{
									mark: "→",
									heading: "Improved Returns",
									desc: "Improved returns — a little.",
								},
								{
									mark: "→",
									heading: "Reduced Risk",
									desc: "Reduced risk — a little.",
								},
							].map((b, i) => (
								<motion.div
									key={i}
									{...fadeX(30, i * 0.1 + 0.3)}
									className="expect-row"
									style={{
										padding: "20px 0",
										borderBottom: "1px solid var(--hairline)",
									}}
								>
									<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
										<span style={{ color: "var(--gold)", fontSize: 16, fontWeight: 700, paddingTop: 2, flexShrink: 0 }}>
											{b.mark}
										</span>
										<div>
											<span className="expect-row-heading" style={{ color: "var(--mist)", fontSize: 15 }}>
												{b.heading}
											</span>
											<p className="expect-row-desc">{b.desc}</p>
										</div>
									</div>
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
					background: "var(--teal)",
					borderTop: "1px solid var(--hairline)",
				}}
			>
				<div className="wrap">
					<div className="g-2" style={{ alignItems: "center" }}>
						<div>

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
								{
									heading: "Exponential Returns",
									desc: "Substantial improvement in returns.",
								},
								{
									heading: "Elimination of Risk",
									desc: "Elimination, or substantial reduction of the risk of loss.",
								},
								{
									heading: "Reduced Stress",
									desc: "Reduced stress in investing.",
								},
							].map((b, i) => (
								<motion.div
									key={i}
									{...fadeX(30, i * 0.1 + 0.3)}
									className="expect-row"
									style={{
										padding: "20px 0",
										borderBottom: "1px solid var(--hairline)",
									}}
								>
									<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
										<span style={{ color: "var(--ash)", fontSize: 14, paddingTop: 3, flexShrink: 0 }}>✕</span>
										<div>
											<span className="expect-row-heading" style={{ color: "var(--smoke)", fontSize: 15 }}>
												{b.heading}
											</span>
											<p className="expect-row-desc">{b.desc}</p>
										</div>
									</div>
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
					<div className="g-2" style={{ alignItems: "center", gap: "4rem" }}>
						{/* Left: Content */}
						<div>

							<RevealChar
								as="h2"
								text="Who is it for?"
								className="t-h1 mb-6"
								delay={0.1}
							/>
							<p className="t-body mb-5" style={{ maxWidth: 560 }}>
								The resources on this website will be of help to anyone interested in investing. However, the primary focus of the content is individual investors who have limited time, resources and expertise to devote to investment research and analyses.
							</p>
							<p className="t-body" style={{ maxWidth: 560 }}>
								Every individual can also get some simple guidance to have a pretty good solution without knowing or learning too much about this, but everyone should learn a little bit.
							</p>
						</div>

						{/* Right: Image */}
						<motion.div {...fade(0.4)} style={{ position: "relative" }}>
							<div
								style={{
									position: "relative",
									borderRadius: 24,
									overflow: "hidden",
									boxShadow: "var(--shadow-bento)",
									aspectRatio: "4/3",
								}}
							>
								<MediaSkeleton
									type="img"
									loading="lazy"
									src="https://dhanopinion.com/wp-content/uploads/2023/09/pexels-ketut-subiyanto-4308025.jpg"
									alt="Target Audience"
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block",
									}}
								/>
								<div
									style={{
										position: "absolute",
										inset: 0,
										background: "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 50%)",
										pointerEvents: "none"
									}}
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>


			{/* ══════ CTA — Waitlist ══════ */}
			<section className="teal-band" style={{ "--wave-fill": "var(--black)" }}>
				<div className="wrap tc">

					<RevealChar
						as="h2"
						text="Personalised Consulting"
						className="t-display mb-5"
						style={{ color: "var(--pure)", justifyContent: "center" }}
						delay={0.1}
					/>
					<p
						style={{
							fontSize: 16,
							color: "var(--smoke)",
							marginBottom: 32,
							maxWidth: 800,
							margin: "0 auto 32px",
							lineHeight: 1.7,
						}}
					>
						The philosophy, strategy and suggestions shared on these pages are of universal relevance and should deliver value to every investor. Should you wish to seek a confidential, one-on-one, paid consulting with one of our experts, kindly click the button below. Personalised consulting is expected to be launched in the future. At this time you will be joining a wait-list. We will reach out when the service comes on-stream and a slot becomes available to arrange a session at a mutually convenient time.
					</p>
					<motion.div {...fade(0.5)}>
						<Link to="/consulting-waitlist" className="btn btn-white" style={{ padding: "14px 28px" }}>
							<HoverFlip text="I would like a personalised consulting session" />
						</Link>
					</motion.div>
				</div>
			</section>
		</>
	);
}
