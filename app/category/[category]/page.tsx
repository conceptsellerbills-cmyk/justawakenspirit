import { getAllPosts } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ category: string }> }

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  'manifestation':      { label: 'Manifestation',          desc: 'Law of attraction, scripting & manifestation techniques', keywords: ['manifestation','law of attraction','scripting','369','visualiz','attract'] },
  'angel-numbers':      { label: 'Angel Numbers',           desc: 'Meaning of 1111, 222, 444, 555 & repeating numbers',    keywords: ['angel number','1111','222','333','444','555','777','888','999'] },
  'tarot':              { label: 'Tarot',                   desc: 'Tarot card meanings, spreads & how to read the cards',  keywords: ['tarot','tarot card','major arcana','minor arcana','tarot spread'] },
  'crystals':           { label: 'Crystal Healing',         desc: 'Healing crystals, gemstones & how to use them',         keywords: ['crystal','amethyst','rose quartz','obsidian','selenite','citrine','gemstone'] },
  'numerology':         { label: 'Numerology',              desc: 'Life path numbers, name numerology & meanings',         keywords: ['numerology','life path','master number','angel number','birth number'] },
  'mindfulness':        { label: 'Mindfulness',             desc: 'Mindfulness exercises, presence & awareness practices', keywords: ['mindfulness','present','awareness','mindful','grounding','attention'] },
  'breathwork':         { label: 'Breathwork',              desc: 'Pranayama, Wim Hof, box breathing & healing breath',    keywords: ['breathwork','pranayama','wim hof','box breathing','4-7-8','kapalabhati','breath'] },
  'affirmations':       { label: 'Affirmations',            desc: 'Positive affirmations, mirror work & belief reprogramming', keywords: ['affirmation','positive affirmation','mirror work','mantra','self-talk','belief'] },
  'sound-healing':      { label: 'Sound Healing',           desc: 'Singing bowls, binaural beats, solfeggio & mantras',   keywords: ['sound healing','singing bowl','binaural','solfeggio','528','mantra','chant','gong'] },
  'inner-child':        { label: 'Inner Child Healing',     desc: 'Inner child work, reparenting & childhood wound healing', keywords: ['inner child','reparenting','childhood wound','shadow','trauma','wounded child'] },
  'gratitude':          { label: 'Gratitude Practice',      desc: 'Gratitude journaling, prompts & daily gratitude habits', keywords: ['gratitude','gratitude journal','thankful','appreciation','prompts','blessings'] },
  'yoga':               { label: 'Yoga & Spirituality',     desc: 'Yoga philosophy, chakra yoga, kundalini & yoga nidra', keywords: ['yoga','kundalini','yin yoga','yoga nidra','pranayama','asana','chakra yoga'] },
  'nde':                { label: 'Near-Death Experiences',  desc: 'NDE stories, research, afterlife & consciousness',     keywords: ['near death','nde','afterlife','out of body','obe','consciousness after death'] },
  'astrology':          { label: 'Astrology',               desc: 'Birth charts, zodiac signs, planets & cosmic cycles',  keywords: ['astrology','birth chart','zodiac','horoscope','rising sign','moon sign','natal'] },
  'plant-medicine':     { label: 'Plant Medicine',          desc: 'Ayahuasca, psilocybin, sacred plants & healing journeys', keywords: ['plant medicine','ayahuasca','psilocybin','mushroom','entheogen','ceremony','sacred plant'] },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) return {}
  return {
    title: `${cat.label} — JustAwakenSpirit Guides`,
    description: cat.desc,
    alternates: { canonical: `/category/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) notFound()

  const all = getAllPosts()
  const kw = cat.keywords
  const matched = all.filter((p) => {
    const text = ((p.keyword || '') + ' ' + (p.title || '') + ' ' + (p.slug || '')).toLowerCase()
    return kw.some((k) => text.includes(k))
  })
  const posts = matched.length > 0 ? matched : all

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#0f0d1a;color:#e2e0f0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
        a{text-decoration:none;color:inherit}
        .container{max-width:1100px;margin:0 auto;padding:0 24px}
        .cat-hero{padding:60px 24px 48px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(167,139,250,0.12) 0%,transparent 70%)}
        .cat-badge{display:inline-block;padding:5px 16px;border-radius:20px;background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px}
        .cat-hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:12px}
        .cat-hero p{color:#64748b;font-size:1rem;max-width:560px;margin:0 auto 24px}
        .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#64748b;justify-content:center;margin-bottom:32px}
        .breadcrumb a{color:#a78bfa}
        .post-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding-bottom:80px}
        .post-card{background:#1a1d27;border:1px solid #2a2d3a;border-radius:12px;padding:28px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .post-card:hover{border-color:#a78bfa;transform:translateY(-2px)}
        .post-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.2);color:#a78bfa;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px}
        .post-card h2{font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:10px}
        .post-card h2 a:hover{color:#a78bfa}
        .post-card p{color:#64748b;font-size:0.87rem;line-height:1.65;flex:1;margin-bottom:18px}
        .post-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #2a2d3a}
        .post-date{font-size:0.72rem;color:#64748b}
        .post-link{font-size:0.82rem;color:#a78bfa;font-weight:600}
        .empty{text-align:center;padding:80px 0;color:#64748b}
        @media(max-width:600px){.post-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="cat-hero">
        <div className="cat-badge">Spiritual Guide</div>
        <h1>{cat.label}</h1>
        <p>{cat.desc}</p>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{cat.label}</span>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p className="empty">No articles yet — check back soon!</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.keyword && <span className="post-tag">{post.keyword}</span>}
                <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
                <p>{post.description}</p>
                <div className="post-footer">
                  <span className="post-date">{post.date}</span>
                  <a href={`/${post.slug}`} className="post-link">Read →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
