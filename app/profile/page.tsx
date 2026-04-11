import { redirect } from "next/navigation"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const revalidate = 0

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + "m ago"
  const h = Math.floor(m / 60)
  if (h < 24) return h + "h ago"
  return Math.floor(h / 24) + "d ago"
}

export default async function ProfilePage() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) redirect("/auth")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth")

  const username = user.email?.split("@")[0] ?? "user"

  const { data: threads } = await supabase
    .from("threads")
    .select("id, title, category_slug, reply_count, like_count, created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })

  const { data: replies } = await supabase
    .from("replies")
    .select("id, body, created_at, thread_id, threads(title, category_slug)")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{username[0].toUpperCase()}</div>
        <div className="profile-info">
          <h1 className="profile-username">{username}</h1>
          <p className="profile-stats">
            {threads?.length ?? 0} posts · {replies?.length ?? 0} replies
          </p>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2 className="profile-section-title">My Posts</h2>
          {threads && threads.length > 0 ? (
            <div className="profile-threads-list">
              {threads.map((t) => (
                <Link
                  key={t.id}
                  href={"/forum/" + t.category_slug + "/" + t.id}
                  className="profile-thread-item"
                >
                  <div className="profile-thread-title">{t.title}</div>
                  <div className="profile-thread-meta">
                    <span>{t.category_slug}</span>
                    <span>❤️ {t.like_count}</span>
                    <span>💬 {t.reply_count}</span>
                    <span>{timeAgo(t.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="profile-empty">No posts yet. <Link href="/forum/new">Start a discussion</Link></p>
          )}
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">My Replies</h2>
          {replies && replies.length > 0 ? (
            <div className="profile-replies-list">
              {replies.map((r) => {
                const thread = r.threads as { title: string; category_slug: string } | null
                return (
                  <Link
                    key={r.id}
                    href={thread ? "/forum/" + thread.category_slug + "/" + r.thread_id : "/forum"}
                    className="profile-reply-item"
                  >
                    <div className="profile-reply-body">{r.body.slice(0, 120)}{r.body.length > 120 ? "…" : ""}</div>
                    <div className="profile-reply-meta">
                      <span>in {thread?.title ?? "thread"}</span>
                      <span>{timeAgo(r.created_at)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="profile-empty">No replies yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
