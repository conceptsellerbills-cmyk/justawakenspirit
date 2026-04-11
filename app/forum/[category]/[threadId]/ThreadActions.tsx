"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  threadId: string;
  authorId: string | null;
  initialLikeCount: number;
  initialBody: string;
  title: string;
  currentUserId: string | null;
  isLiked: boolean;
}

export default function ThreadActions({
  threadId,
  authorId,
  initialLikeCount,
  initialBody,
  title,
  currentUserId,
  isLiked: initLiked,
}: Props) {
  const supabase = createClient();
  const [liked, setLiked] = useState(initLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(initialBody);
  const [editBody, setEditBody] = useState(initialBody);
  const [editTitle, setEditTitle] = useState(title);
  const [saving, setSaving] = useState(false);

  const isAuthor = currentUserId && currentUserId === authorId;

  async function toggleLike() {
    if (!currentUserId) {
      window.location.href = "/auth";
      return;
    }
    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("thread_id", threadId)
        .eq("user_id", currentUserId);
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      await supabase
        .from("likes")
        .insert({ thread_id: threadId, user_id: currentUserId });
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  }

  async function saveEdit() {
    if (!editBody.trim() || !editTitle.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from("threads")
      .update({ body: editBody.trim(), title: editTitle.trim(), updated_at: new Date().toISOString() })
      .eq("id", threadId);
    if (!error) {
      setBody(editBody.trim());
      setEditing(false);
    }
    setSaving(false);
  }

  return (
    <div className="thread-actions-wrapper">
      {editing ? (
        <div className="edit-form">
          <input
            className="edit-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Thread title"
          />
          <textarea
            className="edit-body-textarea"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={8}
          />
          <div className="edit-actions">
            <button onClick={saveEdit} disabled={saving} className="btn-save">
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => { setEditing(false); setEditBody(body); setEditTitle(title); }} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="thread-body-text">{body}</div>
      )}

      <div className="thread-meta-actions">
        <button
          onClick={toggleLike}
          className={`like-btn ${liked ? "liked" : ""}`}
          title={liked ? "Unlike" : "Like"}
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
        {isAuthor && !editing && (
          <button onClick={() => setEditing(true)} className="edit-btn">
            ✏️ Edit
          </button>
        )}
      </div>
    </div>
  );
}
