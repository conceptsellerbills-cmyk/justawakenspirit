import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | JustAwakenSpirit",
  description: "Books on anxiety, nervous system healing, and coming back to yourself. Available on Amazon.",
};

const BOOKS = [
  {
    title: "The Invisible Anxiety: Living in Constant Alert Mode",
    author: "JustAwakenSpirit",
    cover: "https://m.media-amazon.com/images/I/71Qh2pn9fML._SY466_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0GFXDL3D8",
    tag: "Anxiety & Nervous System",
    badge: "Available Now",
    shortDesc: "Do you feel tense even when nothing is wrong? Exhausted, yet unable to truly rest? Always preparing, anticipating, and holding yourself together—without knowing why?",
    longDesc: "The Invisible Anxiety explores a form of anxiety that often goes unnoticed: the constant state of alertness that lives in the nervous system long after danger has passed. This is not panic. Not overthinking alone. It is survival mode disguised as normal life. Written with clarity, depth, and compassion, this book explains why your body stays on guard even when your mind understands that you are safe—and why traditional advice like 'just relax' rarely works.",
    topics: [
      "Why alert mode becomes a baseline, not a momentary response",
      "How the nervous system learns safety through experience, not logic",
      "Why rest, calm, and stillness can feel threatening",
      "How emotional suppression keeps anxiety alive",
      "What it truly means to move from survival to living",
    ],
    forYouIf: [
      "You feel constantly on edge without a clear reason",
      "Calm feels unfamiliar or uncomfortable",
      "You are tired of managing yourself all the time",
      "You want deep understanding, not shallow motivation",
    ],
  },
  {
    title: "Beyond Fear: Reclaiming Your Life from the Shadows of Doubt",
    author: "JustAwakenSpirit",
    cover: "https://m.media-amazon.com/images/I/71QdQQv0UtL._SY466_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0GDXW3HV2",
    tag: "Fear & Emotional Resilience",
    badge: "Available Now",
    shortDesc: "What if fear didn't have to control your life anymore? What if you could learn to meet it with presence, compassion, and quiet inner strength?",
    longDesc: "Beyond Fear is a deeply human, heartfelt guide to understanding and transforming your relationship with fear. Across 30 powerful chapters, you will explore how fear shapes your identity, your relationships, your body, and your inner world — and then discover another way of living, one rooted in awareness, kindness, courage, and deep self-trust.",
    topics: [
      "Understand where your fear truly comes from",
      "Release harsh self-judgment and emotional pressure",
      "Build emotional resilience and inner stability",
      "Respond calmly instead of reacting impulsively",
      "Rediscover peace as an inner state, not an external condition",
      "Live a life guided gently by courage rather than fear",
    ],
    forYouIf: [
      "You overthink or struggle with anxiety",
      "You feel emotionally overwhelmed or stuck in self-doubt",
      "You have lived too long in fear and want freedom",
      "You are ready to grow gently, honestly, and deeply",
    ],
  },
  {
    title: "You Don't Need to Be Liked: A Guide to Inner Freedom, Self-Respect, and Emotional Independence",
    author: "JustAwakenSpirit",
    cover: "https://m.media-amazon.com/images/I/61QW3NJispL._SY466_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0GFXG1WW4",
    tag: "Emotional Freedom & Self-Respect",
    badge: "Available Now",
    shortDesc: "What if the pressure to be liked is the very thing keeping you anxious, exhausted, and disconnected from yourself?",
    longDesc: "You Don't Need to Be Liked is a calm, honest guide for anyone who feels trapped by approval, people-pleasing, over-explaining, or the fear of disappointing others. This book does not teach confidence as performance or detachment as coldness. Instead, it shows how emotional freedom grows from living in alignment with yourself—quietly, steadily, and without apology.",
    topics: [
      "Stop outsourcing your worth to others",
      "Let go of emotional over-responsibility",
      "Respond instead of react",
      "Build inner security without ego",
      "Choose truth over approval",
      "Live with calm self-respect in a loud world",
    ],
    forYouIf: [
      "You feel trapped by approval or people-pleasing",
      "You over-explain, over-apologize, or shrink yourself",
      "You are tired of performing and managing perceptions",
      "You want integrity, emotional independence, and quiet confidence",
    ],
  },
];

export default function BooksPage() {
  return (
    <>
      <style>{`
        .books-hero {
          text-align: center;
          padding: 60px 0 44px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 56px;
        }
        .books-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 16px;
        }
        .books-hero h1 {
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .books-hero p {
          color: var(--muted);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .book-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 48px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px;
          margin-bottom: 40px;
          position: relative;
        }
        .book-card:hover { border-color: rgba(167,139,250,0.5); }
        @media (max-width: 620px) {
          .book-card { grid-template-columns: 1fr; gap: 28px; padding: 24px; }
          .book-cover-col { display: flex; justify-content: center; }
        }
        .book-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .book-cover {
          width: 100%;
          max-width: 200px;
          border-radius: 10px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 4px 20px rgba(167,139,250,0.2);
          display: block;
        }
        .book-tag {
          display: inline-block;
          font-size: 0.72rem;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(167,139,250,0.1);
          border: 1px solid rgba(167,139,250,0.25);
          color: #a78bfa;
          margin-bottom: 12px;
        }
        .book-title {
          font-size: clamp(1.25rem, 3vw, 1.65rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin-bottom: 6px;
        }
        .book-author {
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .book-desc {
          color: #b8bcd0;
          font-size: 0.93rem;
          line-height: 1.8;
          margin-bottom: 20px;
          font-style: italic;
        }
        .book-long-desc {
          color: #9da2b8;
          font-size: 0.88rem;
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .book-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 10px;
        }
        .book-topics {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
        }
        .book-topics li {
          font-size: 0.855rem;
          color: var(--muted);
          padding: 4px 0 4px 20px;
          position: relative;
          line-height: 1.5;
        }
        .book-topics li::before {
          content: "✦";
          position: absolute;
          left: 0;
          color: #a78bfa;
          font-size: 0.55rem;
          top: 9px;
        }
        .buy-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #111;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 14px 30px;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(245,158,11,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .buy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245,158,11,0.45);
          color: #111;
        }
        .buy-note {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 10px;
        }
        .coming-soon-box {
          text-align: center;
          padding: 48px 24px;
          background: linear-gradient(135deg, rgba(167,139,250,0.05), rgba(124,58,237,0.03));
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 16px;
          margin-top: 8px;
        }
        .coming-soon-box h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }
        .coming-soon-box p {
          color: var(--muted);
          font-size: 0.9rem;
          margin-bottom: 24px;
          max-width: 360px;
          margin-left: auto;
          margin-right: auto;
        }
        .notify-form {
          display: flex;
          gap: 10px;
          max-width: 380px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }
        .notify-input {
          flex: 1;
          min-width: 190px;
          padding: 11px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-size: 0.88rem;
        }
        .notify-input::placeholder { color: var(--muted); }
        .notify-input:focus { outline: none; border-color: #a78bfa; }
        .notify-btn {
          padding: 11px 22px;
          background: #a78bfa;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.15s;
        }
        .notify-btn:hover { background: #7c3aed; }
      `}</style>

      <section className="books-hero">
        <div className="books-eyebrow">Our Books</div>
        <h1>Words That Help You<br />Come Back to Yourself</h1>
        <p>Written for those who carry too much — quietly, invisibly, and without knowing why.</p>
      </section>

      <section>
        {BOOKS.map((book, i) => (
          <div key={i} className="book-card">
            <div className="book-cover-col">
              <img src={book.cover} alt={book.title} className="book-cover" />
            </div>
            <div>
              <div className="book-badge">{book.badge}</div>
              <div className="book-tag">{book.tag}</div>
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">by {book.author}</p>

              <p className="book-desc">{book.shortDesc}</p>
              <p className="book-long-desc">{book.longDesc}</p>

              <div className="book-section-label">What you will learn</div>
              <ul className="book-topics">
                {book.topics.map((t, j) => <li key={j}>{t}</li>)}
              </ul>

              <div className="book-section-label">This book is for you if</div>
              <ul className="book-topics" style={{ marginBottom: 32 }}>
                {book.forYouIf.map((t, j) => <li key={j}>{t}</li>)}
              </ul>

              <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="buy-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.047-.871-1.234-1.276-1.808-2.107-1.731 1.767-2.956 2.297-5.199 2.297-2.652 0-4.716-1.637-4.716-4.909 0-2.558 1.388-4.296 3.361-5.148 1.712-.754 4.104-.887 5.931-1.093v-.41c0-.753.06-1.64-.384-2.292-.385-.578-1.124-.817-1.774-.817-1.205 0-2.279.618-2.54 1.897-.054.285-.261.567-.549.582l-3.076-.333c-.259-.058-.548-.267-.473-.663C5.908 2.268 8.948 1.2 11.659 1.2c1.39 0 3.205.37 4.3 1.42 1.39 1.299 1.258 3.032 1.258 4.916v4.452c0 1.338.556 1.925 1.078 2.647.183.257.224.564-.01.754l-2.141 1.406z"/>
                </svg>
                Buy on Amazon
              </a>
              <p className="buy-note">Paperback &amp; Kindle available · Opens amazon.com</p>
            </div>
          </div>
        ))}

        <div className="coming-soon-box">
          <h3>More books coming soon</h3>
          <p>Join the list and be the first to know when new titles arrive.</p>
          <form className="notify-form" action="#" method="get">
            <input type="email" name="email" placeholder="your@email.com" className="notify-input" />
            <button type="submit" className="notify-btn">Notify Me</button>
          </form>
        </div>
      </section>
    </>
  );
}
