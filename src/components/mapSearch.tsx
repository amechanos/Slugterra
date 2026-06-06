import React, { useEffect, useMemo, useState } from 'react'
import { mapData } from '../data/cavernData'

type CavernDetails = {
  description: string
  slugs: string[]
}

type CavernData = Record<string, Record<string, CavernDetails>>

type CavernEntry = {
  name: string
  region: string
  details: CavernDetails
}

type CavernSearchProps = {
  cavernData?: CavernData
  title?: string
  selectedCavernOverride?: { name: string; region: string } | null
  onSlugClick?: (slugName: string) => void
}

export default function CavernSearch({
  cavernData = mapData,
  title = 'Cavern Explorer',
  selectedCavernOverride = null,
  onSlugClick,
}: CavernSearchProps) {
  const regions = useMemo(() => Object.keys(cavernData), [cavernData])
  const [region, setRegion] = useState('none')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCavern, setSelectedCavern] = useState<CavernEntry | null>(null)

  useEffect(() => {
    if (selectedCavernOverride) {
      setRegion(selectedCavernOverride.region)
      setSearchTerm('')
      const overrideDetails = cavernData[selectedCavernOverride.region]?.[selectedCavernOverride.name]
      if (overrideDetails) {
        setSelectedCavern({
          name: selectedCavernOverride.name,
          region: selectedCavernOverride.region,
          details: overrideDetails,
        })
      }
    }
  }, [selectedCavernOverride, cavernData])

  const filteredCaverns = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const allEntries = region === 'none'
      ? Object.entries(cavernData).flatMap(([regionKey, caverns]) =>
          Object.entries(caverns).map(([name, details]) => ({ name, details, region: regionKey }))
        )
      : Object.entries(cavernData[region] || {}).map(([name, details]) => ({ name, details, region }))

    return allEntries
      .filter(({ name, details, region: cavernRegion }) => {
        if (!query) return true
        return (
          name.toLowerCase().includes(query) ||
          details.description.toLowerCase().includes(query) ||
          details.slugs.some((slug) => slug.toLowerCase().includes(query)) ||
          cavernRegion.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [cavernData, region, searchTerm])

  useEffect(() => {
    if (filteredCaverns.length === 0) {
      setSelectedCavern(null)
      return
    }

    if (
      !selectedCavern ||
      !filteredCaverns.some(
        (entry) => entry.name === selectedCavern.name && entry.region === selectedCavern.region
      )
    ) {
      setSelectedCavern(filteredCaverns[0])
    }
  }, [filteredCaverns, selectedCavern])

  const cavernDetails = selectedCavern?.details || null

  return (
    <section className="cavern-search-panel">
        <div className="panel-header">
            <h3>{title}</h3>
            <p>Use region filters and search to find caverns quickly, then view the description, region, and slug list.</p>
        </div>

        <div className="cavern-details">
            {cavernDetails ? (
            <>
                <div className="detail-header">
                <h4>{selectedCavern?.name}</h4>
                <p className="region-tag">
                    Region: {selectedCavern?.region ? selectedCavern.region.charAt(0).toUpperCase() + selectedCavern.region.slice(1) : ''}
                </p>
                </div>
                <p className="detail-description">{cavernDetails.description}</p>
                <div className="slug-section">
                <h5>Slugs</h5>
                <div className="slug-badges">
                    {cavernDetails.slugs.map((slug, index) => (
                    <button
                        key={`${selectedCavern?.name}-${slug}-${index}`}
                        type="button"
                        className="slug-badge slug-link"
                        onClick={() => onSlugClick?.(slug)}
                    >
                        {slug}
                    </button>
                    ))}
                </div>
                </div>
            </>
            ) : (
            <div className="placeholder-message">
                <h4>Select a cavern to reveal details.</h4>
                <p>Filtered caverns appear here with region, description, and slug list.</p>
            </div>
            )}
        </div>

{/*===================Search and filter controls====================*/}

        <div className="search-controls">
            <label className="control-field">
            Region
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
                <option value="none">All Regions</option>
                {regions.map((regionKey) => (
                <option key={regionKey} value={regionKey}>
                    {regionKey.charAt(0).toUpperCase() + regionKey.slice(1)}
                </option>
                ))}
            </select>
            </label>

            <label className="search-field">
            Search
            <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search caverns, descriptions, or slugs"
            />
            </label>
        </div>

        <div className="panel-body">
            <div className="cavern-list">
            <div className="list-header">
                <h4>Available Caverns</h4>
                <span>{filteredCaverns.length} found</span>
            </div>

            {filteredCaverns.length > 0 ? (
                <ul>
                {filteredCaverns.map((entry) => (
                    <li key={`${entry.region}-${entry.name}`}>
                    <button
                        type="button"
                        className={
                        selectedCavern?.name === entry.name && selectedCavern?.region === entry.region
                            ? 'cavern-button active'
                            : 'cavern-button'
                        }
                        onClick={() => setSelectedCavern(entry)}
                    >
                        {entry.name}
                        {region === 'none' ? (
                        <span className="small-region-label">
                            
                        </span>
                        ) : null}
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="empty-state">No caverns matched your search.</p>
            )}
            </div>
        </div>
        </section>
    )
    }


