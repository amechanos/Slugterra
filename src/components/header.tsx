import React from 'react'
import '../styles/header.css'
import logoUrl from '../assets/logo.png';

export default function Header({ view, setView }: { view: 'home' | 'characters' | 'reading' | 'gallery' | 'map', setView: (v: 'home' | 'characters' | 'reading' | 'gallery' | 'map') => void }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-logo" role="img" aria-label="Slugterra Woto logo"><a href="/"><img src={logoUrl} alt="Logo" id="logo"/></a></div>

        <nav className="nav-controls" aria-label="Main navigation">
          <button onClick={() => setView('characters')} aria-pressed={view === 'characters'}>Characters</button>
          <button onClick={() => setView('reading')} aria-pressed={view === 'reading'}>Reading</button>
          <button onClick={() => setView('gallery')} aria-pressed={view === 'gallery'}>Gallery</button>
          <button onClick={() => setView('map')} aria-pressed={view === 'map'}>Map</button>
        </nav>
      </div>
    </header>
  )
}
