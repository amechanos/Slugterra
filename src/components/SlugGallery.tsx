import React, { useEffect, useMemo, useState } from 'react'
import slugData from '../data/slugProfiles.json'
import SlugCard from './SlugCard'
import '../styles/slug-gallery.css'

type Slug = {
  "Name": string
  "Original?": string
  "Element": string
  "Ghoul Form": string
  "Description": string
}

type SlugGalleryProps = {
  selectedSlugId?: string | null
  onClearSelectedSlug?: () => void
}

const normalizeSlugId = (slug: string) => slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function SlugGallery({ selectedSlugId, onClearSelectedSlug }: SlugGalleryProps) {
  const [order, setOrder] = useState<'asc' | 'desc' | 'element'>('asc')
  const [activeSlugId, setActiveSlugId] = useState<string | null>(null)
  const slugs = slugData as Slug[]

  const sorted = useMemo(() => {
    const data = [...slugs]
    if (order === 'element') {
      return data.sort((a,b) => {
        const elementCompare = a.Element.localeCompare(b.Element);
        if (elementCompare !== 0) return elementCompare
        return a.Name.localeCompare(b.Name)

      })
    }

    const factor = order === 'asc' ? 1 : -1
    return data.sort((a, b) => factor * a.Name.localeCompare(b.Name, undefined, { sensitivity: 'base' }))
  }, [order, slugs])

  useEffect(() => {
    const slugId = selectedSlugId ?? (typeof window !== 'undefined' ? window.location.hash.slice(1) : '')
    if (!slugId) {
      setActiveSlugId(null)
      return
    }

    setActiveSlugId(slugId)
    const target = document.getElementById(slugId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedSlugId, sorted])

  const clearActiveSlug = () => {
    setActiveSlugId(null)
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    onClearSelectedSlug?.()
  }

  return (
    <section id="slug-gallery" className="slug-gallery" onClick={clearActiveSlug}>
      <div className="gallery-header">
        <h2>Slug Gallery of the Southern Caverns</h2>
        <div className="gallery-controls">
          <button onClick={() => { setOrder('element'); clearActiveSlug() }} aria-pressed={order === 'element'}>Sort by Element</button>
          <button onClick={() => { setOrder('asc'); clearActiveSlug() }} aria-pressed={order === 'asc'}>Sort A→Z</button>
          <button onClick={() => { setOrder('desc'); clearActiveSlug() }} aria-pressed={order === 'desc'}>Sort Z→A</button>
        </div>
      </div>

      <div className="slug-grid">
        {sorted.map((s, i) => (
          <SlugCard
            key={s.Name ?? i}
            slug={s}
            selected={normalizeSlugId(s.Name) === activeSlugId}
            onInteract={clearActiveSlug}
          />
        ))}
      </div>
    </section>
  )
}
