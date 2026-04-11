'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AuthClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = searchParams.get('next') ?? '/forum'

  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMsg(''); setIsError(false)
    const supabase = getSupabaseBrowserClient()
    if (!supabase) { setMsg('Not configured'); setIsError(true); setLoading(false); return }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setMsg(error.message); setIsError(true); setLoading(false); return }
    router.push(next)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMsg(''); setIsError(false)
    const supabase = getSupabaseBrowserClient()
    if (!supabase) { setMsg('Not configured'); setIsError(true); setLoading(false); return }
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username: username || email.split('@')[0] } }
    })
    if (error) { setMsg(error.message); setIsError(true); setLoading(false); return }
    setMsg('Check your email to confirm your account!')
    setLoading(false)
  }

  const tabStyle = (active: boolean) => ({
    flex: 1, padding: '10px', background: active ? '#a78bfa' : 'transparent',
    color: active ? '#fff' : '#64748b', border: 'none', borderRadius: '6px',
    fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
  })

  return (
    <div style={{ background: '#1a1d27', border: '1px solid #2a2d3a', borderRadius: '16px', padding: '32px' }}>
      <div style={{ display: 'flex', gap: '4px', background: '#0f1117', borderRadius: '8px', padding: '4px', marginBottom: '28px' }}>
        <button style={tabStyle(tab === 'login')} onClick={() => { setTab('login'); setMsg('') }}>Sign In</button>
        <button style={tabStyle(tab === 'register')} onClick={() => { setTab('register'); setMsg('') }}>Register</button>
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></div>
          <div><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></div>
          {msg && <p style={{ color: isError ? '#ef4444' : '#22c55e', fontSize: '0.85rem' }}>{msg}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1, width: '100%', justifyContent: 'center' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
            No account? <button type="button" onClick={() => setTab('register')} style={{ color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Register here</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label>Username (optional)</label><input value={username} onChange={e => setUsername(e.target.value)} placeholder="soul_seeker" /></div>
          <div><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></div>
          <div><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" /></div>
          {msg && <p style={{ color: isError ? '#ef4444' : '#22c55e', fontSize: '0.85rem' }}>{msg}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1, width: '100%', justifyContent: 'center' }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
      )}
    </div>
  )
}
