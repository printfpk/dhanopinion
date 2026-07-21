import { useState } from 'react'
import PostLayout from '../components/PostLayout'

export default function ConsultingWaitlist() {
	const [submitted, setSubmitted] = useState(false)
	const [formData, setFormData] = useState({ name: '', email: '', remarks: '' })
	const [status, setStatus] = useState('idle')

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData(prev => ({ ...prev, [id]: value }));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('submitting');
		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					access_key: "45d867a9-e12a-4f89-964d-560ed247d05a",
					subject: "New Consulting Waitlist Submission",
					...formData
				}),
			});
			const result = await response.json();
			if (result.success) {
				setSubmitted(true);
			} else {
				console.error("Submission failed", result);
			}
			setStatus('idle');
		} catch (error) {
			console.error("Error!", error);
			setStatus('idle');
		}
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
							<input type="text" id="name" value={formData.name} onChange={handleChange} required style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", fontFamily: "var(--font-body)" }} />
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
							<label htmlFor="email" style={{ color: "var(--pure)", fontSize: 14 }}>Email ID:</label>
							<input type="email" id="email" value={formData.email} onChange={handleChange} required style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", fontFamily: "var(--font-body)" }} />
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
							<label htmlFor="remarks" style={{ color: "var(--pure)", fontSize: 14 }}>Remarks:</label>
							<textarea id="remarks" rows="4" value={formData.remarks} onChange={handleChange} style={{ padding: "12px 16px", borderRadius: 8, background: "var(--ghost-bg)", border: "1px solid var(--ghost-border)", color: "var(--pure)", outline: "none", width: "100%", resize: "vertical", fontFamily: "var(--font-body)" }} />
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
							{status === 'submitting' ? 'Submitting...' : 'Put me on the waitlist'}
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
