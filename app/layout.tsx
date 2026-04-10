const SITE_NAME = "JustAwakenSpirit";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template:  },
  description: "Transformative books on anxiety, emotional freedom, overthinking, and inner wealth. Available on Amazon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="site-brand">{SITE_NAME}</a>
          </div>
        </header>
        <main className="container main-content">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
