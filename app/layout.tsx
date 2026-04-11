import type { Metadata } from 'next'
import './globals.css'
import NavbarClient from './components/NavbarClient'

export const metadata: Metadata = {
  title: { default: 'JustAwakenSpirit', template: '%s | JustAwakenSpirit' },
  description: 'A spiritual community for awakening souls. Explore meditation, energy healing, lucid dreaming, and conscious living.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarClient />
        <main>{children}</main>
        <footer style={{ borderTop: '1px solid #2a2d3a', padding: '40px 0', marginTop: '80px' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '4px' }}>JustAwakenSpirit</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>A community for conscious souls</p>
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <a href="/forum" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>Forum</a>
              <a href="https://creativebooks.net/books" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>Books</a>
            </nav>
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>© {new Date().getFullYear()} JustAwakenSpirit</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
