import React from 'react'
import '../styles/home.css'

export default function Home({ setView }: { setView: (v: 'home'|'characters'|'reading'|'gallery'|'map') => void }) {
  return (
    <section className="home">
        <div className="welcome">
          <h1>Welcome to the Southern Caverns</h1>
          <p className="lead" style={{width: "60%"}}>Explore jhxu's Slugterra: Wrath of the Outback. This is a fanmade project, where rightful owners of Slugterra are Wildbrain Ltd. and DHX Media/Nerdcorps</p>
        </div>

        <div className="tabs">
          <div
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setView('reading')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setView('reading') }}
            aria-label="Go to reading"
          >
            <h3>Read</h3>
            <p>Dive into the latest chapter.</p>
          </div>

          <div
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setView('characters')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setView('characters') }}
            aria-label="Go to characters"
          >
            <h3>Characters</h3>
            <p>Meet the Watchers.</p>
          </div>

          <div
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setView('map')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setView('map') }}
            aria-label="Open map"
          >
            <h3>Map</h3>
            <p>See the full world map and explore regions.</p>
          </div>

          <div
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setView('gallery')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setView('gallery') }}
            aria-label="Open gallery"
          >
            <h3>Gallery</h3>
            <p>Meet the slugs and see profiles.</p>
          </div>
        </div>
    </section>
  )
}
