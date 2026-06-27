import { useState } from 'react'
import PostLayout from '../components/PostLayout'

export default function ConsultingWaitlist() {
	const [submitted, setSubmitted] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		// Fake submission
		setSubmitted(true)
	}

	return (
		<PostLayout title="Personalised Investment Consulting">
			{!submitted ? (
				<>
					<p>
						Personalised investment consulting is yet to be launched. Please leave your name and contact email ID here so that we may reach out to you for booking a session with a Dhanopinion expert when the service is launched and a slot becomes available. The charges for the same will be advised to you before the session is booked and you will have the right to accept or reject the same when Dhanopinion reaches out to you in future.
					</p>

					<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: "2rem", maxWidth: "600px", margin: "2rem auto 0" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
							<label htmlFor="name" style={{ color: "var(--pure)", fontSize: 14 }}>Name:</label>
							<input type="text" id="name" required style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", fontFamily: "var(--font-body)" }} />
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
							<label htmlFor="email" style={{ color: "var(--pure)", fontSize: 14 }}>Email ID:</label>
							<input type="email" id="email" required style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", fontFamily: "var(--font-body)" }} />
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
							<label htmlFor="remarks" style={{ color: "var(--pure)", fontSize: 14 }}>Remarks:</label>
							<textarea id="remarks" rows="4" style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", resize: "vertical", fontFamily: "var(--font-body)" }} />
						</div>

						<button type="submit" style={{ 
							marginTop: 10, 
							alignSelf: "flex-start", 
							padding: "14px 28px", 
							borderRadius: "8px", 
							background: "#000000", 
							color: "#ffffff", 
							border: "none", 
							fontWeight: 700, 
							cursor: "pointer", 
							transition: "all 0.2s ease"
						}}
							onMouseEnter={e => { e.currentTarget.style.background = "#333333"; }}
							onMouseLeave={e => { e.currentTarget.style.background = "#000000"; }}
						>
							Put me on the waitlist
						</button>
					</form>
				</>
			) : (
				<div style={{ padding: 40, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", borderRadius: 16, textAlign: "center", marginTop: "2rem" }}>
					<h3 style={{ color: "var(--gold)", marginBottom: 10 }}>Thank You!</h3>
					<p style={{ color: "var(--smoke)", margin: 0 }}>You have been successfully added to the waitlist. We will be in touch.</p>
				</div>
			)}
		</PostLayout>
	)
}
