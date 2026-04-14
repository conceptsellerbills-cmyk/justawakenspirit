import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories — Just Awaken Spirit",
  description: "Browse all categories on Just Awaken Spirit. Find expert guides and reviews organized by topic.",
};

const CATEGORIES: { icon: string; label: string; desc: string; href: string }[] = [{"icon":"✨","label":"Manifestation","desc":"Law of attraction & intention","href":"/category/manifestation"},{"icon":"🔢","label":"Angel Numbers","desc":"111, 222, 333 & meanings","href":"/category/angel-numbers"},{"icon":"🃏","label":"Tarot","desc":"Card meanings & readings","href":"/category/tarot"},{"icon":"💎","label":"Crystal Healing","desc":"Crystals, chakras & energy","href":"/category/crystals"},{"icon":"🔯","label":"Numerology","desc":"Life path & destiny numbers","href":"/category/numerology"},{"icon":"🌿","label":"Mindfulness","desc":"Meditation & present living","href":"/category/mindfulness"},{"icon":"🌬️","label":"Breathwork","desc":"Pranayama & breathing techniques","href":"/category/breathwork"},{"icon":"💬","label":"Affirmations","desc":"Daily positive affirmations","href":"/category/affirmations"},{"icon":"🎵","label":"Sound Healing","desc":"Binaural beats & frequencies","href":"/category/sound-healing"},{"icon":"🧒","label":"Inner Child Healing","desc":"Reparenting & shadow work","href":"/category/inner-child"},{"icon":"🙏","label":"Gratitude Practice","desc":"Journals & daily rituals","href":"/category/gratitude"},{"icon":"🧘","label":"Yoga & Spirituality","desc":"Kundalini, hatha & more","href":"/category/yoga"},{"icon":"🌟","label":"Near-Death Experiences","desc":"NDE stories & afterlife","href":"/category/nde"},{"icon":"♊","label":"Astrology","desc":"Zodiac signs & birth charts","href":"/category/astrology"},{"icon":"🌱","label":"Plant Medicine","desc":"Herbs, adaptogens & healing","href":"/category/plant-medicine"}];

export default function CategoriesPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#0f0d1a;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
        a{text-decoration:none;color:inherit}
        .cats-wrap{max-width:1100px;margin:0 auto;padding:48px 24px 80px}
        .cats-header{margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1e2535}
        .cats-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:8px}
        .cats-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;letter-spacing:-0.03em;color:#e4e8f4}
        .cats-subtitle{font-size:0.95rem;color:#7a82a0;margin-top:10px;line-height:1.6}
        .cats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
        .cat-card{background:#14101f;border:1px solid #1e2535;border-radius:12px;padding:28px 22px;display:block;transition:border-color 0.15s,transform 0.15s,box-shadow 0.15s}
        .cat-card:hover{border-color:#a78bfa;transform:translateY(-3px);box-shadow:0 10px 32px rgba(0,0,0,0.35)}
        .cat-icon{font-size:2.2rem;margin-bottom:14px;display:block;line-height:1}
        .cat-label{font-weight:700;font-size:1rem;margin-bottom:6px;color:#e4e8f4}
        .cat-desc{font-size:0.8rem;color:#7a82a0;line-height:1.55}
        .cat-arrow{display:block;margin-top:14px;font-size:0.8rem;font-weight:600;color:#a78bfa;opacity:0;transition:opacity 0.15s}
        .cat-card:hover .cat-arrow{opacity:1}
        @media(max-width:500px){.cats-grid{grid-template-columns:repeat(2,1fr)}}
      `}</style>
      <div className="cats-wrap">
        <div className="cats-header">
          <div className="cats-eyebrow">Browse</div>
          <h1 className="cats-title">All Categories</h1>
          <p className="cats-subtitle">{CATEGORIES.length} categories — pick a topic and dive in.</p>
        </div>
        <div className="cats-grid">
          {CATEGORIES.map((c) => (
            <a href={c.href} className="cat-card" key={c.href}>
              <span className="cat-icon">{c.icon}</span>
              <div className="cat-label">{c.label}</div>
              <div className="cat-desc">{c.desc}</div>
              <span className="cat-arrow">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
