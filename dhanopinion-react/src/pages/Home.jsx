import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Suspense, useRef, useEffect, useState } from "react";
import { client } from "../sanityClient";
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
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.1, margin: "60px" },
	transition: { duration: 0.55, delay: d, ease: [0.16, 1, 0.3, 1] },
});
const fadeX = (x, d = 0) => ({
	initial: { opacity: 0, x },
	whileInView: { opacity: 1, x: 0 },
	viewport: { once: true, amount: 0.1, margin: "60px" },
	transition: { duration: 0.55, delay: d, ease: [0.16, 1, 0.3, 1] },
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
	const [data, setData] = useState(null);

	useEffect(() => {
		client.fetch('*[_type == "homePage"][0]').then(res => {
			if (res) setData(res);
		}).catch(console.error);
	}, []);

	const heroTitle = data?.heroTitle || "Investing is Difficult";
	const heroSubtitle = data?.heroSubtitle || "It is difficult for large institutions, and it is even more difficult for individuals because they have less knowledge and resources. You can make it easier by evaluating our suggestions and if you are convinced, implement them.";
	const focusPills = data?.focusPills || [
		"Simple investment strategies that have a logic and can be implemented",
		"Reducing the clutter of options to a few good ones, saving you time and effort",
	];
	const sps = data?.startingPoints?.length > 0 ? data.startingPoints : startingPoints;
	const scopeTitle = data?.scopeTitle || "Scope";
	const scopeText = data?.scopeText || "The current scope covers financial assets such as mutual funds, government sponsored financial instruments and fixed deposits.";
	const expectationsTitle = data?.expectationsTitle || "What you can expect";
	const expectationsData = data?.expectations?.length > 0 ? data.expectations : [
		{ mark: "→", heading: "Better Strategy", desc: "Creation of a better match between your goals, circumstances and preferences and your investments." },
		{ mark: "→", heading: "Reduced Complexity", desc: "Reduced investing complexity and better understanding of investment choices." },
		{ mark: "→", heading: "Improved Returns", desc: "Improved returns — a little." },
		{ mark: "→", heading: "Reduced Risk", desc: "Reduced risk — a little." },
	];
	const notExpectationsTitle = data?.notExpectationsTitle || "What you should not expect";
	const notExpectationsData = data?.notExpectations?.length > 0 ? data.notExpectations : [
		{ heading: "Exponential Returns", desc: "Substantial improvement in returns." },
		{ heading: "Elimination of Risk", desc: "Elimination, or substantial reduction of the risk of loss." },
		{ heading: "Reduced Stress", desc: "Reduced stress in investing." },
	];
	const audienceTitle = data?.audienceTitle || "Who is it for?";
	const audienceParagraphsData = data?.audienceParagraphs?.length > 0 ? data.audienceParagraphs : [
		"The resources on this website will be of help to anyone interested in investing. However, the primary focus of the content is individual investors who have limited time, resources and expertise to devote to investment research and analyses.",
		"Every individual can also get some simple guidance to have a pretty good solution without knowing or learning too much about this, but everyone should learn a little bit."
	];
	const ctaTitle = data?.ctaTitle || "Personalised Consulting";
	const ctaText = data?.ctaText || "The philosophy, strategy and suggestions shared on these pages are of universal relevance and should deliver value to every investor. Should you wish to seek a confidential, one-on-one, paid consulting with one of our experts, kindly click the button below. Personalised consulting is expected to be launched in the future. At this time you will be joining a wait-list. We will reach out when the service comes on-stream and a slot becomes available to arrange a session at a mutually convenient time.";
	const ctaButtonText = data?.ctaButtonText || "I would like a personalised consulting session";
	const ctaButtonLink = data?.ctaButtonLink || "/consulting-waitlist";

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
										transition: { staggerChildren: 0.1, delayChildren: 0.1 },
									}
								}}
								style={{ flex: "1 1 min(100%, 450px)" }}
							>
								{/* Staggered text animation with blur */}
								<h1
									className="no-split"
									style={{
										fontSize: "clamp(40px, 5vw, 72px)",
										fontWeight: 300,
										fontFamily: "var(--font-heading)",
										lineHeight: 1.2,
										color: "var(--pure)",
										marginBottom: "0px",
										letterSpacing: "-0.01em",
									}}
								>
									<div style={{ overflow: "hidden", paddingBottom: "10px", paddingTop: "5px" }}>
										<motion.span
											variants={{
												hidden: { y: "100%", opacity: 0 },
												visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
											}}
											style={{ display: "inline-block" }}
										>
											{heroTitle}
										</motion.span>
									</div>
								</h1>

								<motion.p
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
									className="no-split"
									style={{
										fontSize: "18px",
										lineHeight: 1.7,
										color: "var(--smoke)",
										maxWidth: "500px",
										fontWeight: 400,
										margin: "12px 0 0 0",
									}}
								>
									{heroSubtitle}
								</motion.p>
							</motion.div>

							{/* ── RIGHT: We Focus On — Premium Card ── */}
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
								style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", alignItems: "stretch", gap: "10px", marginTop: "80px" }}
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
								{focusPills.map((text, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.55 + i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
										<p className="no-split" style={{ margin: 0, fontSize: "clamp(15px, 1.5vw, 17px)", fontWeight: 300, fontFamily: "var(--font-heading)", color: "var(--pure)", lineHeight: 1.55, letterSpacing: "0.01em" }}>
											{text}
										</p>
									</motion.div>
								))}


							</motion.div>
						</div>

						{/* ══════ STARTING POINTS (MOVED TO BOTTOM OF HERO) ══════ */}
						<div style={{ paddingTop: "40px", paddingBottom: "20px", width: "100%" }}>
							<RevealChar
								as="h2"
								text="Choose your starting point"
								className="t-display mb-4 tc no-split"
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
									items={sps}
									cols={4}
									className="g-4"
									renderCard={(s) => (
										<Link to={s.to}
											className="card"
											style={{
												textDecoration: "none",
												color: "inherit",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												justifyContent: "center",
												textAlign: "center",
												height: "100%",
												minHeight: "auto",
												padding: "20px 16px",
												gap: "12px",
											}}>
											{/* Icon circle */}
											<div
												style={{
													width: 56,
													height: 56,
													borderRadius: "50%",
													background: "linear-gradient(145deg, #fef9f0, #f3e8cd)",
													border: "2px solid rgba(212,168,83,0.3)",
													boxShadow: "0 0 0 5px rgba(212,168,83,0.06), 0 6px 20px rgba(212,168,83,0.1)",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 24,
													color: "#b08930",
													flexShrink: 0,
												}}
											>
												{s.icon}
											</div>

											{/* Title */}
											<h3
												className="no-split"
												style={{
													margin: "0",
													fontSize: "clamp(14px, 1.2vw, 16px)",
													fontWeight: 400,
													fontFamily: "var(--font-heading)",
													color: "#1a1714",
													lineHeight: 1.35,
													letterSpacing: "0.01em",
													flex: 1,
													display: "flex",
													alignItems: "center",
												}}
											>
												{s.label}
											</h3>

											{/* Explore pill button */}
											<span
												style={{
													fontSize: 10,
													fontWeight: 700,
													letterSpacing: ".16em",
													textTransform: "uppercase",
													color: "#9a7a2e",
													border: "1px solid rgba(212,168,83,0.35)",
													borderRadius: "100px",
													padding: "6px 16px",
													background: "transparent",
													flexShrink: 0,
													whiteSpace: "nowrap",
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
						text={scopeTitle}
						className="t-h1 mb-5 tc"
						style={{ justifyContent: "center" }}
						delay={0}
					/>
					<motion.p
						{...fade(0)}
						className="t-body tc no-split"
						style={{ maxWidth: 680, margin: "0 auto" }}
					>
						{scopeText}
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
								text={expectationsTitle}
								className="t-h1"
								delay={0}
							/>
						</div>
						<div>
							{expectationsData.map((b, i) => (
								<motion.div
									key={i}
									{...fadeX(20, i * 0.07 + 0.1)}
									className="expect-row"
									style={{
										padding: "20px 0",
										borderBottom: "1px solid var(--hairline)",
									}}
								>
									<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
										<span style={{ color: "var(--gold)", fontSize: 16, fontWeight: 700, paddingTop: 2, flexShrink: 0 }}>
											{b.mark || "→"}
										</span>
										<div>
											<span className="expect-row-heading no-split" style={{ color: "var(--mist)", fontSize: 15 }}>
												{b.heading}
											</span>
											<p className="expect-row-desc no-split">{b.desc}</p>
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
								text={notExpectationsTitle}
								highlight="not"
								className="t-h1"
								delay={0}
							/>
						</div>
						<div>
							{notExpectationsData.map((b, i) => (
								<motion.div
									key={i}
									{...fadeX(20, i * 0.07 + 0.1)}
									className="expect-row"
									style={{
										padding: "20px 0",
										borderBottom: "1px solid var(--hairline)",
									}}
								>
									<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
										<span style={{ color: "var(--ash)", fontSize: 14, paddingTop: 3, flexShrink: 0 }}>✕</span>
										<div>
											<span className="expect-row-heading no-split" style={{ color: "var(--smoke)", fontSize: 15 }}>
												{b.heading}
											</span>
											<p className="expect-row-desc no-split">{b.desc}</p>
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
								text={audienceTitle}
								className="t-h1 mb-6"
								delay={0}
							/>
							{audienceParagraphsData.map((p, i) => (
								<p key={i} className={`t-body no-split ${i !== audienceParagraphsData.length - 1 ? 'mb-5' : ''}`} style={{ maxWidth: 560 }}>
									{p}
								</p>
							))}
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
						text={ctaTitle}
						className="t-display mb-5"
						style={{ color: "var(--pure)", justifyContent: "center" }}
						delay={0}
					/>
					<p
						className="no-split"
						style={{
							fontSize: 16,
							color: "var(--smoke)",
							marginBottom: 32,
							maxWidth: 800,
							margin: "0 auto 32px",
							lineHeight: 1.7,
						}}
					>
						{ctaText}
					</p>
					<motion.div {...fade(0.5)}>
						<Link to={ctaButtonLink} className="btn btn-white" style={{ padding: "14px 28px" }} target="_blank" rel="noopener noreferrer">
							<HoverFlip text={ctaButtonText} />
						</Link>
					</motion.div>
				</div>
			</section>
		</>
	);
}
