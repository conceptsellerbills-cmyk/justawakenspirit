import { Suspense } from 'react'
import NewThreadClient from './NewThreadClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New Thread — Forum' }

export default function NewThreadPage() {
  return (
    <div className='container' style={{ maxWidth: '680px', padding: '48px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <a href='/forum' style={{ color: '#a78bfa', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Forum</a>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '12px' }}>Start a New Thread</h1>
        <p style={{ color: '#64748b', marginTop: '6px' }}>Share a question, insight, or experience with the community.</p>
      </div>
      <Suspense fallback={<div style={{ color: '#64748b' }}>Loading...</div>}>
        <NewThreadClient />
      </Suspense>
    </div>
  )
}
