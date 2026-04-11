import { getSupabaseServerClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/supabase/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forum — Spiritual Community',
  description: 'Join the JustAwakenSpirit community forum. Discuss meditation, energy healing, lucid dreaming, twin souls, and more.',
}

export default async function ForumPage() {
  const supabase = await getSupabaseServerClient()
  let threadCounts: Record<string, number> = {}
  let latestByCategory: Record<string, any> = {}

  if (supabase) {
    const { data } = await supabase
      .from('threads')
      .select('id, title, category_slug, created_at, reply_count')
      .order('created_at', { ascending: false })
      .limit(200)

    if (data) {
      data.forEach((t: any) => {
        threadCounts[t.category_slug] = (threadCounts[t.category_slug] || 0) + 1
        if (!latestByCategory[t.category_slug]) latestByCategory[t.category_slug] = t
      })
    }
  }

  return (
    <>
      <style>{`
        .forum-hero { padding: 60px 0 48px; border-bottom: 1px solid #2a2d3a; margin-bottom: 48px; }
        .forum-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
        .forum-hero p { color: #94a3b8; }
        .forum-hero-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .cat-row { display: flex; flex-direction: column; gap: 2px; }
        .cat-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 48px; }
        .cat-item { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 20px 24px; display: grid; grid-template-columns: 56px 1fr auto; gap: 16px; align-items: center; text-decoration: none; color: inherit; transition: border-color 0.2s, transform 0.15s; }
        .cat-item:hover { border-color: #a78bfa; transform: translateX(4px); }
        .cat-item-icon { font-size: 2rem; text-align: center; }
        .cat-item-name { font-size: 1rem; font-weight: 700; }
        .cat-item-desc { font-size: 0.83rem; color: #64748b; margin-top: 2px; }
        .cat-item-latest { font-size: 0.78rem; color: #94a3b8; margin-top: 6px; }
        .cat-item-stats { text-align: right; white-space: nowrap; }
        .cat-stat-num { font-size: 1.4rem; font-weight: 800; color: #a78bfa; }
        .cat-stat-label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
      `}</style>

      <div className="container">
        <div className="forum-hero">
          <div className="forum-hero-row">
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '8px' }}>Community Forum</p>
              <h1>Spiritual Conversations</h1>
              <p>Ask questions, share insights, connect with awakening souls from around the world.</p>
            </div>
            <a href="/forum/new" className="btn btn-primary">✍️ New Thread</a>
          </div>
        </div>

        <div className="cat-list">
          {CATEGORIES.map((cat) => {
            const latest = latestByCategory[cat.slug]
            return (
              <a key={cat.slug} href={`/forum/${cat.slug}`} className="cat-item">
                <div className="cat-item-icon">{cat.icon}</div>
                <div className="cat-row">
                  <div className="cat-item-name" style={{ color: cat.color }}>{cat.name}</div>
                  <div className="cat-item-desc">{cat.desc}</div>
                  {latest && (
                    <div className="cat-item-latest">
                      Latest: {latest.title.slice(0, 60)}{latest.title.length > 60 ? '…' : ''}
                    </div>
                  )}
                </div>
                <div className="cat-item-stats">
                  <div className="cat-stat-num">{threadCounts[cat.slug] ?? 0}</div>
                  <div className="cat-stat-label">threads</div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}
