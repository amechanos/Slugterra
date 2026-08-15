import React, { useState } from 'react'
import InteractiveMap from './map'
import CavernSearch from './mapSearch'
import '../styles/map.css'

type MapPageProps = {
  setView: (view: string) => void
  setSelectedSlugId: (slugId: string | null) => void
}

export default function MapPage({ setView, setSelectedSlugId }: MapPageProps) {
  const [selectedCavernFromMap, setSelectedCavernFromMap] = useState<{ name: string; region: string } | null>(null)

  const normalizeSlugId = (slug: string) => slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const handleSlugClick = (slug: string) => {
    const slugId = normalizeSlugId(slug)
    setSelectedSlugId(slugId)
    setView('gallery')
    if (typeof window !== 'undefined') {
      window.location.hash = slugId
    }
  }

  return (
    <section className="map-page">
      <div className="map-page-inner">
        <h1 style={{ marginTop: '1rem', textAlign: 'center' }}>World Map</h1>
        <InteractiveMap onCavernSelect={setSelectedCavernFromMap} />
        <CavernSearch
          selectedCavernOverride={selectedCavernFromMap}
          onSlugClick={handleSlugClick}
        />
      </div>
    </section>
  )
}
