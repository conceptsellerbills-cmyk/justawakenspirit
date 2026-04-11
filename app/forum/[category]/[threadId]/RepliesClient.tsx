"use client";
import { useState, useRef } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface Reply {
  id: string;
  body: string;
  author_id: string | null;
  created_at: string;
  profiles: { username: string } | null;
}

interface Props {
  threadId: string;
  initialReplies: Reply[];
  currentUserId: string | null;
  isLoggedIn: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

function ReplyItem({
  reply,
  currentUserId,
  onReplyTo,
  onDelete,
}: {
  reply: Reply;
  currentUserId: string | null;
  onReplyTo: (username: string) => void;
  onDelete: (id: string) => void;
}) {
  const supabase = getSupabaseBrowserClient()!;
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(reply.body);
  const [body, setBody] = useState(reply.body);
  const [saving, setSaving] = useState(false);

  const isAuthor = currentUserId && currentUserId === reply.author_id;
  const username = reply.profiles?.username ?? "anonymous";

  async function saveEdit() {
    if (!editBody.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("replies")
      .update({ body: editBody.trim() })
      .eq("id", reply.id);
    if (!error) {
      setBody(editBody.trim());
      setEditing(false);
    }
    setSaving(false);
  }

  async function deleteReply() {
    if (!confirm("Delete this reply?")) return;
    const { error } = await supabase.from("replies").delete().eq("id", reply.id);
    if (!error) onDelete(reply.id);
  }

  return (
    <div className="reply-item" id={`reply-${reply.id}`}>
      <div className="reply-header">
        <span className="reply-author">{username}</span>
        <span className="reply-time">{timeAgo(reply.created_at)}</span>
      </div>

      {editing ? (
        <div className="reply-edit-form">
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={4}
            className="reply-edit-textarea"
          />
          <div className="reply-edit-actions">
            <button onClick={saveEdit} disabled={saving} className="btn-save">
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => { setEditing(false); setEditBody(body); }} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="reply-body">{body}</div>
      )}

      <div className="reply-actions">
        {currentUserId && (
          <button
            onClick={() => onReplyTo(username)}
            className="reply-to-btn"
          >
            ↩ Reply
          </button>
        )}
        {isAuthor && !editing && (
          <>
            <button onClick={() => setEditing(true)} className="edit-btn">
              ✏️ Edit
            </button>
            <button onClick={deleteReply} className="delete-btn">
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function RepliesClient({
  threadId,
  initialReplies,
  currentUserId,
  isLoggedIn,
}: Props) {
  const supabase = getSupabaseBrowserClient()!;
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function focusReplyBox(prefix?: string) {
    if (prefix) {
      setReplyBody((prev) => {
        const base = prev.trim();
        return base ? base + "\n" + prefix + " " : prefix + " ";
      });
    }
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyBody.trim()) return;
    setSubmitting(true);
    setError("");

    const { data, error: err } = await supabase
      .from("replies")
      .insert({ thread_id: threadId, body: replyBody.trim(), author_id: currentUserId })
      .select("id, body, author_id, created_at, profiles(username)")
      .single();

    if (err) {
      setError("Failed to post reply. Please try again.");
    } else {
      setReplies((prev) => [...prev, data as Reply]);
      setReplyBody("");
    }
    setSubmitting(false);
  }

  function handleDelete(id: string) {
    setReplies((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <section className="replies-section">
      <h2 className="replies-heading">{replies.length} {replies.length === 1 ? "Reply" : "Replies"}</h2>

      {replies.length === 0 && (
        <p className="no-replies">No replies yet. Be the first to share your thoughts.</p>
      )}

      <div className="replies-list">
        {replies.map((reply) => (
          <ReplyItem
            key={reply.id}
            reply={reply}
            currentUserId={currentUserId}
            onReplyTo={(username) => focusReplyBox("@" + username)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isLoggedIn ? (
        <form onSubmit={submitReply} className="reply-form">
          <h3 className="reply-form-heading">Add a Reply</h3>
          {error && <p className="form-error">{error}</p>}
          <textarea
            ref={textareaRef}
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            placeholder="Share your thoughts…"
            rows={5}
            className="reply-textarea"
            required
          />
          <button type="submit" disabled={submitting} className="reply-submit-btn">
            {submitting ? "Posting…" : "Post Reply"}
          </button>
        </form>
      ) : (
        <div className="login-cta">
          <p>
            <a href="/auth">Sign in</a> to join the conversation.
          </p>
        </div>
      )}
    </section>
  );
}
