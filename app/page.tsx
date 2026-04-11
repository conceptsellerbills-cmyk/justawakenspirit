import { getSupabaseServerClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/supabase/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JustAwakenSpirit — Awaken Your Spirit, Discover Inner Peace',
  description: 'A spiritual community for meditation, energy healing, lucid dreaming, twin souls, and conscious living.',
}

const FEATURED_BOOKS = [
  { title: 'The Invisible Anxiety', cover: 'https://m.media-amazon.com/images/I/71Qh2pn9fML._SY466_.jpg', tag: 'Anxiety & Nervous System' },
  { title: 'Your Vibration Attracts Your Reality', cover: 'https://m.media-amazon.com/images/I/71G+MF0aAPL._SY466_.jpg', tag: 'Vibration & Conscious Living' },
  { title: 'Karma and Life Lessons', cover: 'https://m.media-amazon.com/images/I/71zJkwyhxQL._SY466_.jpg', tag: 'Karma & Spiritual Growth' },
]

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()
  let recentThreads: any[] = []
  let threadCounts: Record<string, number> = {}

  if (supabase) {
    const { data: threads } = await supabase
      .from('threads')
      .select('id, title, category_slug, reply_count, created_at, profiles(username)')
      .order('created_at', { ascending: false })
      .limit(6)
    recentThreads = threads ?? []

    const { data: counts } = await supabase
      .from('threads')
      .select('category_slug')
    if (counts) {
      counts.forEach((t: any) => {
        threadCounts[t.category_slug] = (threadCounts[t.category_slug] || 0) + 1
      })
    }
  }

  return (
    <>
      <style>{`
        .hero { text-align: center; padding: 100px 0 80px; position: relative; overflow: hidden; }
        .hero::before {
          content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a78bfa; margin-bottom: 20px; }
        .hero h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 24px; }
        .hero h1 span { color: #a78bfa; }
        .hero p { font-size: 1.1rem; color: #94a3b8; max-width: 520px; margin: 0 auto 36px; line-height: 1.7; }
        .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin: 64px 0; }
        .stat-card { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 24px; text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 800; color: #a78bfa; }
        .stat-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }
        .section { padding: 64px 0; }
        .section-header { margin-bottom: 40px; }
        .section-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a78bfa; margin-bottom: 8px; }
        .section-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; }
        .section-sub { color: #94a3b8; margin-top: 8px; }
        .categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .cat-card { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; transition: all 0.2s; display: block; }
        .cat-card:hover { border-color: var(--accent-color); transform: translateY(-2px); }
        .cat-icon { font-size: 2rem; margin-bottom: 12px; }
        .cat-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 6px; }
        .cat-desc { font-size: 0.8rem; color: #64748b; line-height: 1.5; }
        .cat-count { font-size: 0.75rem; color: #94a3b8; margin-top: 12px; }
        .threads-list { display: flex; flex-direction: column; gap: 12px; }
        .thread-item { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 10px; padding: 16px 20px; text-decoration: none; color: inherit; display: flex; align-items: center; gap: 16px; transition: border-color 0.2s; }
        .thread-item:hover { border-color: #a78bfa; }
        .thread-cat-badge { font-size: 0.7rem; padding: 3px 10px; border-radius: 20px; background: rgba(167,139,250,0.15); color: #a78bfa; white-space: nowrap; flex-shrink: 0; }
        .thread-title { font-weight: 600; font-size: 0.95rem; flex: 1; }
        .thread-meta { font-size: 0.78rem; color: #64748b; white-space: nowrap; flex-shrink: 0; }
        .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
        .book-card { text-decoration: none; color: inherit; }
        .book-card img { width: 100%; border-radius: 8px; display: block; margin-bottom: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.4); transition: transform 0.2s; }
        .book-card:hover img { transform: scale(1.02); }
        .book-tag { font-size: 0.72rem; color: #a78bfa; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
        .book-title { font-size: 0.875rem; font-weight: 600; margin-top: 4px; line-height: 1.3; }
        .newsletter { background: linear-gradient(135deg, #1a1d27 0%, #1e1a35 100%); border: 1px solid #3730a3; border-radius: 16px; padding: 48px; text-align: center; }
        .newsletter h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 12px; }
        .newsletter p { color: #94a3b8; margin-bottom: 24px; }
        .newsletter form { display: flex; gap: 8px; max-width: 420px; margin: 0 auto; }
        .newsletter input { flex: 1; padding: 12px 16px; background: rgba(255,255,255,0.05); border: 1px solid #3730a3; border-radius: 8px; color: #e2e8f0; }
        .newsletter button { padding: 12px 24px; background: #a78bfa; color: #fff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; white-space: nowrap; }
        @media(max-width: 640px) {
          .newsletter form { flex-direction: column; }
          .thread-meta { display: none; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="container">
          <p className="hero-eyebrow">✨ Conscious Living Community</p>
          <h1>Awaken Your Spirit<br /><span>Discover Inner Peace</span></h1>
          <p>Guided practices for meditation, mindfulness, energy healing, and spiritual growth. Begin the journey to a more conscious, meaningful life.</p>
          <div className="hero-actions">
            <a href="/forum" className="btn btn-primary">🌐 Join the Community</a>
            <a href="https://creativebooks.net/books" target="_blank" rel="noopener noreferrer" className="btn btn-outline">📚 Browse Books</a>
          </div>
        </div>
      </div>

      <div className="container">

        {/* STATS */}
        <div className="stats">
          <div className="stat-card"><div className="stat-num">50+</div><div className="stat-label">Books Published</div></div>
          <div className="stat-card"><div className="stat-num">8</div><div className="stat-label">Forum Categories</div></div>
          <div className="stat-card"><div className="stat-num">100%</div><div className="stat-label">Authentic</div></div>
          <div className="stat-card"><div className="stat-num">Daily</div><div className="stat-label">New Content</div></div>
        </div>

        {/* CATEGORIES */}
        <div className="section">
          <div className="section-header">
            <div className="section-eyebrow">Community Forum</div>
            <h2 className="section-title">Explore Topics</h2>
            <p className="section-sub">Join conversations on spirituality, healing, and conscious living</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <a key={cat.slug} href={`/forum/${cat.slug}`} className="cat-card" style={{ '--accent-color': cat.color } as any}>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name" style={{ color: cat.color }}>{cat.name}</div>
                <div className="cat-desc">{cat.desc}</div>
                <div className="cat-count">{threadCounts[cat.slug] ?? 0} threads</div>
              </a>
            ))}
          </div>
        </div>

        {/* RECENT THREADS */}
        {recentThreads.length > 0 && (
          <div className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <div className="section-eyebrow">Latest Conversations</div>
              <h2 className="section-title">From the Community</h2>
            </div>
            <div className="threads-list">
              {recentThreads.map((t: any) => {
                const cat = CATEGORIES.find(c => c.slug === t.category_slug)
                return (
                  <a key={t.id} href={`/forum/${t.category_slug}/${t.id}`} className="thread-item">
                    <span className="thread-cat-badge">{cat?.icon} {cat?.name}</span>
                    <span className="thread-title">{t.title}</span>
                    <span className="thread-meta">💬 {t.reply_count} replies</span>
                  </a>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <a href="/forum" className="btn btn-outline">View all discussions →</a>
            </div>
          </div>
        )}

        {/* BOOKS */}
        <div className="section" style={{ paddingTop: recentThreads.length > 0 ? 0 : undefined }}>
          <div className="section-header">
            <div className="section-eyebrow">Our Collection</div>
            <h2 className="section-title">Transformative Books</h2>
            <p className="section-sub">50+ books on spirituality, healing, and conscious living</p>
          </div>
          <div className="books-grid">
            {FEATURED_BOOKS.map((b) => (
              <a key={b.title} href="https://creativebooks.net/books" target="_blank" rel="noopener noreferrer" className="book-card">
                <img src={b.cover} alt={b.title} loading="lazy" />
                <div className="book-tag">{b.tag}</div>
                <div className="book-title">{b.title}</div>
              </a>
            ))}
            <a href="https://creativebooks.net/books" target="_blank" rel="noopener noreferrer"
              style={{ background: '#1a1d27', border: '1px dashed #3730a3', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textDecoration: 'none', color: '#a78bfa', gap: '8px', minHeight: '200px' }}>
              <span style={{ fontSize: '2rem' }}>📚</span>
              <span style={{ fontWeight: 700 }}>47 more books</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>creativebooks.net</span>
            </a>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="newsletter">
            <h2>Join the Awakening</h2>
            <p>Weekly insights on spirituality, healing, and conscious living — directly in your inbox.</p>
            <form action="#" method="get">
              <input type="email" name="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}
