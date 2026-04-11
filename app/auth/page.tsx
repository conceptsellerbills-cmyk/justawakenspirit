import { Suspense } from 'react'
import AuthClient from './AuthClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign In — JustAwakenSpirit' }

export default function AuthPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✨</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Join the Community</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Connect with awakening souls around the world</p>
        </div>
        <Suspense fallback={<div style={{ color: '#64748b', textAlign: 'center' }}>Loading...</div>}>
          <AuthClient />
        </Suspense>
      </div>
    </div>
  )
}
