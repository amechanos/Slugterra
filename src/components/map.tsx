import React, { useState } from 'react'
import data from '../data/mapData.json'
import svgData from '../data/svgData.json'
import '../styles/map.css'

type RegionData = {
  Region: string
  Capital: string
  Caverns: string[]
  Population: string[]
  Description: string
}

type InteractiveMapProps = {
  onCavernSelect: (selection: { name: string; region: string }) => void
}

const mapData: Record<string, RegionData> = data;
const svgPaths: Record<string, string> = svgData;

function InteractiveMap({ onCavernSelect }: InteractiveMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleRegionClick = (id: string) => {
    if (mapData[id]) {
      setSelectedRegion(id)
    }
  }

  const regionData = selectedRegion ? mapData[selectedRegion] : null

  return (
    <section>
      <div className="mapContainer">
        <svg viewBox="0 0 1920 1080" className="main-map">
          <path
            id="icelands"
            d={svgPaths['icelands']}
            onClick={() => handleRegionClick('icelands')}
            className="region-path"
          />
          <path
            id="jungle"
            d={svgPaths['jungle']}
            onClick={() => handleRegionClick('jungle')}
            className="region-path"
          />
          <path
            id="wetlands"
            d={svgPaths['wetlands']}
            onClick={() => handleRegionClick('wetlands')}
            className="region-path"
          />
          <path
            id="ridgelands"
            d={svgPaths['ridgelands']}
            onClick={() => handleRegionClick('ridgelands')}
            className="region-path"
          />
          <path
            id="desert"
            d={svgPaths['desert']}
            onClick={() => handleRegionClick('desert')}
            className="region-path"
          />
          <path
            id="wall"
            d={svgPaths['wall']}
            onClick={() => handleRegionClick('wall')}
            className="region-path"
          />
        </svg>
        {regionData ? (
          <div className="map-info">
            <h2>{regionData.Region}</h2>
            <p className="muted">
              Capital: <strong>{regionData.Capital}</strong>
            </p>
            <p className="description">{regionData.Description}</p>
            <h3>Caverns</h3>
            <ul className="cavernList">
              {regionData.Caverns.map((c) => (
                <li key={c} className="cavern">
                  <button
                    type="button"
                    className="cavern-link"
                    onClick={() => onCavernSelect({ name: c, region: selectedRegion! })}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            <h3>Population</h3>
            <div className="populationList">
              {regionData.Population.map((p) => (
                <span key={p} className="population">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="map-info placeholder">
            <h2>Southern Caverns</h2>
            <p className="description">
              Click a region on the map to see details about its capital, population, and caverns.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InteractiveMap
