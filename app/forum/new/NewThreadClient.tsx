'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { CATEGORIES } from '@/lib/supabase/categories'

export default function NewThreadClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [category, setCategory] = useState(searchParams.get('category') ?? 'awakening')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setLoading(true)
    setError('')
    const supabase = getSupabaseBrowserClient()
    if (!supabase) { setError('Not configured'); setLoading(false); return }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth?next=/forum/new'); return }
    const { data, error: err } = await supabase
      .from('threads')
      .insert({ category_slug: category, title: title.trim(), body: body.trim(), author_id: user.id })
      .select('id')
      .single()
    if (err) { setError(err.message); setLoading(false); return }
    router.push(`/forum/${category}/${data.id}`)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
        </select>
      </div>
      <div>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's your question or topic?" required maxLength={200} />
      </div>
      <div>
        <label>Body</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Share your thoughts, experience, or question in detail..." rows={8} required style={{ resize: 'vertical' }} />
      </div>
      {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1, alignSelf: 'flex-start' }}>
        {loading ? 'Posting…' : '✍️ Post Thread'}
      </button>
    </form>
  )
}
