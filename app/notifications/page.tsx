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

const TYPE_ICON: Record<string, string> = {
  like_thread: "❤️",
  reply_thread: "💬",
}

export default async function NotificationsPage() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) redirect("/auth")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth")

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*, threads(id, category_slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false)

  return (
    <div className="notif-page">
      <h1 className="notif-page-title">🔔 Notifications</h1>

      {!notifications || notifications.length === 0 ? (
        <div className="notif-empty">
          <p>No notifications yet.</p>
          <p>You will get notified when someone likes or replies to your posts.</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifications.map((n) => {
            const thread = n.threads as { id: string; category_slug: string } | null
            const href = thread ? "/forum/" + thread.category_slug + "/" + thread.id : "/forum"
            return (
              <Link
                key={n.id}
                href={href}
                className={"notif-item" + (n.read ? "" : " notif-unread")}
              >
                <span className="notif-icon">{TYPE_ICON[n.type as string] ?? "🔔"}</span>
                <div className="notif-content">
                  <p className="notif-message">{n.message}</p>
                  <span className="notif-time">{timeAgo(n.created_at)}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
