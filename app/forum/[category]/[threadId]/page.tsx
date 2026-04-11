import { getSupabaseServerClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/supabase/categories'
import { notFound } from 'next/navigation'
import ReplyFormClient from './ReplyFormClient'
import type { Metadata } from 'next'

interface Props { params: Promise<{ category: string; threadId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { threadId } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) return {}
  const { data } = await supabase.from('threads').select('title').eq('id', threadId).single()
  return { title: data?.title ?? 'Thread' }
}

export default async function ThreadPage({ params }: Props) {
  const { category, threadId } = await params
  const cat = CATEGORIES.find(c => c.slug === category)
  if (!cat) notFound()

  const supabase = await getSupabaseServerClient()
  if (!supabase) return <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: '#64748b' }}>Loading...</div>

  const [{ data: thread }, { data: replies }, { data: { user } }] = await Promise.all([
    supabase.from('threads').select('*, profiles(username)').eq('id', threadId).single(),
    supabase.from('replies').select('*, profiles(username)').eq('thread_id', threadId).order('created_at', { ascending: true }),
    supabase.auth.getUser(),
  ])

  if (!thread) notFound()

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
        .thread-page { max-width: 780px; margin: 0 auto; padding: 48px 24px; }
        .breadcrumb { font-size: 0.8rem; color: #64748b; margin-bottom: 20px; }
        .breadcrumb a { color: #a78bfa; text-decoration: none; }
        .thread-header { margin-bottom: 24px; }
        .thread-main { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 28px; margin-bottom: 32px; }
        .post-body { line-height: 1.8; white-space: pre-wrap; color: #d1d5db; }
        .post-meta { display: flex; gap: 16px; font-size: 0.8rem; color: #64748b; margin-top: 20px; padding-top: 16px; border-top: 1px solid #2a2d3a; }
        .replies-title { font-size: 1rem; font-weight: 700; margin-bottom: 16px; color: #94a3b8; }
        .reply-item { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 10px; padding: 20px; margin-bottom: 10px; }
        .reply-meta { font-size: 0.78rem; color: #64748b; margin-top: 12px; }
        .badge-cat { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; background: rgba(167,139,250,0.1); color: #a78bfa; margin-bottom: 12px; }
      `}</style>

      <div className="thread-page">
        <div className="breadcrumb">
          <a href="/forum">Forum</a> / <a href={`/forum/${category}`}>{cat.name}</a> / Thread
        </div>

        <div className="badge-cat">{cat.icon} {cat.name}</div>
        <div className="thread-header">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0' }}>{thread.title}</h1>
        </div>

        <div className="thread-main">
          <div className="post-body">{thread.body}</div>
          <div className="post-meta">
            <span>👤 {(thread.profiles as any)?.username ?? 'Anonymous'}</span>
            <span>🕐 {timeAgo(thread.created_at)}</span>
            <span>💬 {thread.reply_count} replies</span>
            <span>❤️ {thread.like_count}</span>
          </div>
        </div>

        {(replies ?? []).length > 0 && (
          <div>
            <div className="replies-title">💬 {replies!.length} {replies!.length === 1 ? 'Reply' : 'Replies'}</div>
            {replies!.map((r: any) => (
              <div key={r.id} className="reply-item">
                <div className="post-body" style={{ fontSize: '0.925rem' }}>{r.body}</div>
                <div className="reply-meta">
                  <span>👤 {(r.profiles as any)?.username ?? 'Anonymous'}</span>
                  {' · '}
                  <span>{timeAgo(r.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <ReplyFormClient threadId={threadId} categorySlug={category} isLoggedIn={!!user} />
      </div>
    </>
  )
}
