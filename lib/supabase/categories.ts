export const CATEGORIES = [
  { slug: 'meditation', name: 'Meditation & Mindfulness', icon: '🧘', desc: 'Share techniques, experiences, and insights about meditation practice', color: '#6366f1' },
  { slug: 'energy', name: 'Energy Healing & Chakras', icon: '⚡', desc: 'Discuss chakras, Reiki, energy work, and healing practices', color: '#eab308' },
  { slug: 'awakening', name: 'Spiritual Awakening', icon: '💫', desc: 'Share your awakening journey, insights, and questions', color: '#a78bfa' },
  { slug: 'dreams', name: 'Lucid Dreaming & Astral', icon: '🌙', desc: 'Explore lucid dreams, astral projection, and the dream state', color: '#3b82f6' },
  { slug: 'twin-souls', name: 'Twin Souls & Connections', icon: '💞', desc: 'Discuss soulmates, twin flames, and soul connections', color: '#ec4899' },
  { slug: 'conscious-living', name: 'Conscious Living', icon: '🌿', desc: 'Mindful lifestyle, slow living, and intentional choices', color: '#22c55e' },
  { slug: 'shadow-work', name: 'Shadow Work', icon: '🌑', desc: 'Inner work, healing patterns, and shadow integration', color: '#94a3b8' },
  { slug: 'books', name: 'Books & Resources', icon: '📚', desc: 'Recommend books, courses, and spiritual resources', color: '#f97316' },
] as const

export type CategorySlug = typeof CATEGORIES[number]['slug']
export type Category = typeof CATEGORIES[number]
