import { getSupabaseServerClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/supabase/categories'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES.find(c => c.slug === category)
  if (!cat) return {}
  return { title: `${cat.name} — Forum`, description: cat.desc }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORIES.find(c => c.slug === category)
  if (!cat) notFound()

  const supabase = await getSupabaseServerClient()
  let threads: any[] = []

  if (supabase) {
    const { data } = await supabase
      .from('threads')
      .select('id, title, body, reply_count, like_count, created_at, profiles(username)')
      .eq('category_slug', category)
      .order('created_at', { ascending: false })
      .limit(50)
    threads = data ?? []
  }

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <>
      <style>{`
        .cat-header { padding: 48px 0 36px; border-bottom: 1px solid #2a2d3a; margin-bottom: 32px; }
        .cat-header-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 12px; }
        .breadcrumb a { color: #a78bfa; text-decoration: none; }
        .thread-row { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 10px; padding: 18px 22px; text-decoration: none; color: inherit; display: block; transition: border-color 0.2s; margin-bottom: 8px; }
        .thread-row:hover { border-color: #a78bfa; }
        .thread-row-title { font-size: 0.975rem; font-weight: 600; margin-bottom: 6px; }
        .thread-row-meta { display: flex; gap: 16px; font-size: 0.78rem; color: #64748b; }
        .empty-state { text-align: center; padding: 80px 0; color: #64748b; }
        .empty-state p { font-size: 1.1rem; margin-bottom: 16px; }
      `}</style>

      <div className="container">
        <div className="cat-header">
          <div className="breadcrumb"><a href="/forum">Forum</a> / {cat.name}</div>
          <div className="cat-header-row">
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>{cat.icon}</span>
                <span style={{ color: cat.color }}>{cat.name}</span>
              </h1>
              <p style={{ color: '#94a3b8', marginTop: '6px' }}>{cat.desc}</p>
            </div>
            <a href={`/forum/new?category=${category}`} className="btn btn-primary">✍️ New Thread</a>
          </div>
        </div>

        {threads.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{cat.icon}</div>
            <p>No threads yet in this category.</p>
            <a href={`/forum/new?category=${category}`} className="btn btn-primary">Start the first conversation</a>
          </div>
        ) : (
          <div>
            {threads.map((t: any) => (
              <a key={t.id} href={`/forum/${category}/${t.id}`} className="thread-row">
                <div className="thread-row-title">{t.title}</div>
                <div className="thread-row-meta">
                  <span>👤 {(t.profiles as any)?.username ?? 'Anonymous'}</span>
                  <span>💬 {t.reply_count} replies</span>
                  <span>❤️ {t.like_count}</span>
                  <span>🕐 {timeAgo(t.created_at)}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
