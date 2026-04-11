'use client'
import { useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

interface Props { threadId: string; categorySlug: string; isLoggedIn: boolean }

export default function ReplyFormClient({ threadId, categorySlug, isLoggedIn }: Props) {
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  if (!isLoggedIn) {
    return (
      <div style={{ background: '#1a1d27', border: '1px solid #2a2d3a', borderRadius: '12px', padding: '28px', marginTop: '24px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', marginBottom: '16px' }}>Sign in to join the conversation</p>
        <a href={`/auth?next=/forum/${categorySlug}/${threadId}`} className="btn btn-primary">Sign in or Register</a>
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setLoading(true)
    setMsg('')
    const supabase = getSupabaseBrowserClient()
    if (!supabase) { setMsg('Not configured'); setLoading(false); return }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setMsg('Not logged in'); setLoading(false); return }
    const { error } = await supabase.from('replies').insert({ thread_id: threadId, body: body.trim(), author_id: user.id })
    if (error) { setMsg('Error: ' + error.message); setLoading(false); return }
    setBody('')
    setMsg('Reply posted!')
    setLoading(false)
    setTimeout(() => window.location.reload(), 800)
  }

  return (
    <form onSubmit={submit} style={{ background: '#1a1d27', border: '1px solid #2a2d3a', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
      <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px' }}>Write a Reply</label>
      <textarea
        value={body} onChange={e => setBody(e.target.value)}
        placeholder="Share your thoughts, experience, or insight..."
        rows={5} required
        style={{ width: '100%', marginBottom: '12px', resize: 'vertical' }}
      />
      {msg && <p style={{ color: msg.startsWith('Error') ? '#ef4444' : '#22c55e', fontSize: '0.85rem', marginBottom: '8px' }}>{msg}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Posting…' : '💬 Post Reply'}
      </button>
    </form>
  )
}
