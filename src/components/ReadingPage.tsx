import React, { useEffect, useState, useRef } from 'react'
import { marked } from 'marked'
import '../styles/reading-page.css'

// Load all markdown files in src/content as raw strings (Vite)
const mdModules = (import.meta as any).glob('../content/*.md', { as: 'raw', eager: true }) as Record<string, string>

function parseMdModules(mods: Record<string, string>) {
  return Object.entries(mods).map(([path, raw]) => {
    const filename = path.split('/').pop()?.replace(/\.md$/, '') ?? path
    // Prefer first H1 as title, fall back to filename
    const titleMatch = raw.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : filename.replace(/[-_]/g, ' ')
    const html = marked.parse(raw)
    return { id: filename, title, html }
  }).sort((a, b) => {
    // Prologue comes first
    if (a.id === 'Prologue') return -1
    if (b.id === 'Prologue') return 1
    // Then sort chapters numerically
    return a.id.localeCompare(b.id, undefined, { numeric: true })
  })
}

export default function ReadingPage() {
  const [toc, setToc] = useState(() => parseMdModules(mdModules))
  const [current, setCurrent] = useState(toc[0] ?? null)
  const articleRef = useRef<HTMLArticleElement>(null)

  // Function to scroll to the top of the article
  const scrollToTop = () => {
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Scrolled window to top');

  }

  // Automatically scroll to top whenever the 'current' chapter changes
  useEffect(() => {
    scrollToTop()
  }, [current])

  const handleNavigation = (chapter: any) => {
    setCurrent(chapter)
  }

  const prevChapter = () => {
    const currentIndex = toc.findIndex(c => c.id === current.id)
    if (currentIndex > 0) {
      setCurrent(toc[currentIndex - 1])
    }
  }

  const nextChapter = () => {
    const currentIndex = toc.findIndex(c => c.id === current.id)
    if (currentIndex < toc.length - 1) {
      setCurrent(toc[currentIndex + 1])
    }
  }

  useEffect(() => {
    // ensure current remains valid if toc changes
    if (!toc.find(c => c.id === current?.id)) setCurrent(toc[0] ?? null)
  }, [toc, current?.id])

  if (!toc || toc.length === 0) {
    return (
      <section id="reading-page" className="reading-page">
        <div className="reading-inner">
          <h2>Reading Page</h2>
          <p>No chapters found. Add markdown files to <code>src/content/*.md</code>.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="reading-page" className="reading-page">
      <div className="reading-inner reader-grid">
        <aside className="toc" aria-label="Table of contents">
          <h3>Contents</h3>
          <ul>
            {toc.map(ch => (
              <li key={ch.id}>
                <button
                  className={`toc-link ${current && current.id === ch.id ? 'active' : ''}`}
                  onClick={() => handleNavigation(ch)}
                  aria-pressed={current && current.id === ch.id}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="toc-mobile">
            <button
              onClick={prevChapter}
              disabled={toc.findIndex(c => c.id === current.id) <= 0}
              aria-label="Previous chapter"
            >
              ‹
            </button>
            <select
              value={current.id}
              onChange={(e) => handleNavigation(toc.find(c => c.id === e.target.value))}
              aria-label="Select chapter"
            >
              {toc.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
            <button
              onClick={nextChapter}
              disabled={toc.findIndex(c => c.id === current.id) >= toc.length - 1}
              aria-label="Next chapter"
            >
              ›
            </button>
          </div>
        </aside>

        <article className="chapter" aria-live="polite" ref={articleRef}>
          <h2>{current.title}</h2>
          <div className="chapter-body" dangerouslySetInnerHTML={{ __html: current.html }} />

          <nav className="chapter-controls" aria-label="Chapter navigation">
            <button
              onClick={() => handleNavigation(toc[Math.max(0, toc.findIndex(c => c.id === current.id) - 1)])}
              disabled={toc.findIndex(c => c.id === current.id) <= 0}
            >
              ← Prev
            </button>

            {/* Back to top button is now always visible */}
            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              ↑ Top
            </button>

            <button
              onClick={() => handleNavigation(toc[Math.min(toc.length - 1, toc.findIndex(c => c.id === current.id) + 1)])}
              disabled={toc.findIndex(c => c.id === current.id) >= toc.length - 1}
            >
              Next →
            </button>
          </nav>
        </article>
      </div>
    </section>
  )
}