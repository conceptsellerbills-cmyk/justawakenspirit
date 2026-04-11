'use client'
import { useEffect, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function NavbarClient() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav style={{ borderBottom: '1px solid #2a2d3a', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ color: '#a78bfa', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          ✨ JustAwakenSpirit
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="/forum" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>🌐 Forum</a>
          <a href="https://creativebooks.net/books" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>📚 Books</a>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{user.email?.split('@')[0]}</span>
              <button onClick={signOut} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Sign out</button>
            </div>
          ) : (
            <a href="/auth" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Join</a>
          )}
        </div>
      </div>
    </nav>
  )
}
