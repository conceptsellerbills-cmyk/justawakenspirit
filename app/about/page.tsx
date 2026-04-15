import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — Just Awaken Spirit", description: "Learn about Just Awaken Spirit, our mission, and the team behind the site." };
export default function AboutPage() {
  return (
    <>
      <style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:#09080f;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
  a{color:#a78bfa;text-decoration:none}
  a:hover{text-decoration:underline}
  .page-wrap{max-width:800px;margin:0 auto;padding:56px 24px 100px}
  .page-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:10px}
  .page-title{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:16px;color:#e4e8f4}
  .page-subtitle{font-size:1rem;color:#7a82a0;margin-bottom:40px;line-height:1.7;max-width:600px}
  .page-divider{border:none;border-top:1px solid #1e2535;margin:36px 0}
  h2{font-size:1.2rem;font-weight:700;color:#e4e8f4;margin:32px 0 12px}
  p{color:#9ca3af;line-height:1.8;margin-bottom:16px}
  ul{color:#9ca3af;margin:0 0 16px 20px;line-height:1.9}
  li{margin-bottom:4px}
  .contact-form{display:flex;flex-direction:column;gap:16px;margin-top:24px}
  .form-group{display:flex;flex-direction:column;gap:6px}
  .form-group label{font-size:0.85rem;font-weight:600;color:#c8cad8}
  .form-group input,.form-group textarea,.form-group select{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 16px;color:#e4e8f4;font-size:0.95rem;font-family:inherit;outline:none;transition:border-color 0.15s;resize:vertical}
  .form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:#a78bfa}
  .form-group input::placeholder,.form-group textarea::placeholder{color:#4b5563}
  .form-submit{background:#a78bfa;color:#fff;border:none;border-radius:10px;padding:13px 32px;font-size:1rem;font-weight:700;cursor:pointer;align-self:flex-start;transition:opacity 0.15s}
  .form-submit:hover{opacity:0.85}
  .info-card{background:rgba(255,255,255,0.03);border:1px solid #1e2535;border-radius:12px;padding:24px 28px;margin-bottom:20px}
  .info-card h3{font-size:1rem;font-weight:700;color:#e4e8f4;margin-bottom:8px}
  .info-card p{margin:0;font-size:0.9rem}
  .highlight-box{background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.25);border-radius:12px;padding:24px 28px;margin:28px 0}
  .highlight-box p{margin:0;color:#c8cad8}
`}</style>
      <div className="page-wrap">
        <div className="page-eyebrow">About Us</div>
        <h1 className="page-title">About Just Awaken Spirit</h1>
        <p className="page-subtitle">We're a team of passionate writers and researchers dedicated to covering spirituality and mindful living — helping our readers make smarter decisions with honest, in-depth content.</p>
        <hr className="page-divider" />
        <h2>Our Mission</h2>
        <p>Just Awaken Spirit was created with a single goal: to cut through the noise and give readers clear, trustworthy information about spirituality and mindful living. We research, test, and compare so you don't have to.</p>
        <h2>What We Cover</h2>
        <p>We publish in-depth reviews, comparison guides, how-tos, and roundups on spirituality and mindful living. Every article is written with accuracy and reader value in mind — no filler, no fluff.</p>
        <h2>Our Editorial Standards</h2>
        <p>All our content is independently researched and written. We follow strict editorial guidelines to ensure accuracy, fairness, and transparency. When we earn commissions from recommendations, we disclose it clearly.</p>
        <h2>Contact Us</h2>
        <p>Have a question, suggestion, or want to work with us? <a href="/contact">Reach out here</a> — we read every message.</p>
      </div>
    </>
  );
}
