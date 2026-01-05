import React from 'react'
import InteractiveMap from './map'
import '../styles/map.css'

export default function MapPage() {
  return (
    <section className="map-page">
      <div className="map-page-inner">
        <h2 style={{textAlign:'center'}}>World Map</h2>
        <InteractiveMap />
      </div>
    </section>
  )
}
