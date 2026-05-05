import React, { useEffect, useState } from 'react'
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

const mapData: Record<string, RegionData> = data;
const svgPaths: Record<string, string> = svgData;

function InteractiveMap() {
    const [selected, setSelected] = useState<RegionData | null>(null);

    const handleRegionClick = (id: string) => {
    if (mapData[id]) {
      setSelected(mapData[id]);
    }};

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
            {selected ? (
              <div className="map-info">
                <h2>{selected.Region}</h2>
                <p className="muted">Capital: <strong>{selected.Capital}</strong></p>
                <p className="description">{selected.Description}</p>
                <h3> Caverns </h3>
                <ul className="cavernList">{selected.Caverns.map((c) => <li key={c} className="cavern">{c}</li>)}</ul>
                <h3> Population </h3>
                <div className="populationList">{selected.Population.map((p) => <span key={p} className="population">{p}</span>)}</div>
              </div>
            ) : (
              <div className="map-info placeholder">
                <h2>Southern Caverns</h2>
                <p className="description">Click a region on the map to see details about its capital, population, and caverns.</p>
              </div>
            )}
            </div>
        </section>
    )
}

export default InteractiveMap
