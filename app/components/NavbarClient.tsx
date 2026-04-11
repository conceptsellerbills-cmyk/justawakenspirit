"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function NavbarClient() {
  const [username, setUsername] = useState<string | null>(null)
  const [unread, setUnread] = useState(0)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user.email?.split("@")[0] ?? "user"
        setUsername(u)
        fetchUnread(session.user.id)
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        const u = session.user.email?.split("@")[0] ?? "user"
        setUsername(u)
        fetchUnread(session.user.id)
      } else {
        setUsername(null)
        setUnread(0)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchUnread(userId: string) {
    if (!supabase) return
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false)
    setUnread(count ?? 0)
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="nav-brand">✨ JustAwakenSpirit</Link>
        <div className="nav-links">
          <Link href="/forum" className="nav-link">🌐 Forum</Link>
          {username ? (
            <>
              <Link href="/notifications" className="nav-notif-btn" title="Notifications">
                🔔{unread > 0 && <span className="notif-badge">{unread > 9 ? "9+" : unread}</span>}
              </Link>
              <Link href="/profile" className="nav-username">{username}</Link>
              <button onClick={signOut} className="btn btn-outline nav-signout">Sign out</button>
            </>
          ) : (
            <Link href="/auth" className="btn btn-primary">Join</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
