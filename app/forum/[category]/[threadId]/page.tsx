import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/supabase/categories';
import ThreadActions from './ThreadActions';
import RepliesClient from './RepliesClient';

export const revalidate = 0;

interface Props {
  params: Promise<{ category: string; threadId: string }>;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

export default async function ThreadPage({ params }: Props) {
  const { category, threadId } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const supabase = await getSupabaseServerClient();
  if (!supabase) notFound();

  const { data: thread } = await supabase
    .from('threads')
    .select('*, profiles(username)')
    .eq('id', threadId)
    .single();

  if (!thread) notFound();

  const { data: replies } = await supabase
    .from('replies')
    .select('id, body, author_id, created_at, profiles(username)')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  const { data: { user } } = await supabase.auth.getUser();
  const currentUserId = user?.id ?? null;

  let isLiked = false;
  if (currentUserId) {
    const { data: likeRow } = await supabase
      .from('likes')
      .select('id')
      .eq('thread_id', threadId)
      .eq('user_id', currentUserId)
      .maybeSingle();
    isLiked = !!likeRow;
  }

  const authorName = (thread.profiles as { username: string } | null)?.username ?? 'anonymous';

  return (
    <div className="thread-page">
      <nav className="breadcrumb">
        <Link href="/forum">Forum</Link>
        <span> / </span>
        <Link href={'/forum/' + cat.slug}>{cat.name}</Link>
        <span> / </span>
        <span>{thread.title}</span>
      </nav>

      <article className="thread-article">
        <header className="thread-header">
          <span className="thread-cat-badge" style={{ background: cat.color }}>
            {cat.icon} {cat.name}
          </span>
          <h1 className="thread-title">{thread.title}</h1>
          <div className="thread-meta">
            <span>By <strong>{authorName}</strong></span>
            <span>{timeAgo(thread.created_at)}</span>
            <span>{thread.reply_count} replies</span>
          </div>
        </header>

        <ThreadActions
          threadId={thread.id}
          authorId={thread.author_id}
          initialLikeCount={thread.like_count}
          initialBody={thread.body}
          title={thread.title}
          currentUserId={currentUserId}
          isLiked={isLiked}
        />
      </article>

      <RepliesClient
        threadId={thread.id}
        initialReplies={replies ?? []}
        currentUserId={currentUserId}
        isLoggedIn={!!user}
      />
    </div>
  );
}
