import React from 'react'

const link = "https://slugterra.fandom.com/wiki/"

type Slug = {
  "Name": string
  "Original?": string
  "Element": string
  "Ghoul Form": string
  "Description": string
}

export default function SlugCard({ slug, selected = false, onInteract }: { slug: Slug, selected?: boolean, onInteract?: () => void }) {
  const isOriginal = String(slug['Original?']).toLowerCase() === 'yes'
  const wikiUrl = `${link}${encodeURIComponent(slug.Name)}`
  const slugId = slug.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <article id={slugId} className={`slug-card${selected ? ' selected' : ''}`} onClick={onInteract}>
      <div className="slug-card-body">
        {isOriginal ? (
          <a href={wikiUrl} target="_blank" rel="noopener noreferrer" className="slugContainer">
            <h3 className="slug-name">{slug.Name} / {slug['Ghoul Form']}</h3>
            <p className="slug-meta"><strong>Element:</strong> {slug.Element} <br /> <strong>Canon to show:</strong> {slug['Original?']}</p>
            <p className="slug-desc">{slug.Description}</p>
          </a>
        ) : (
          <a className="slugContainer">
            <h3 className="slug-name">{slug.Name} / {slug['Ghoul Form']}</h3>
            <p className="slug-meta"><strong>Element:</strong> {slug.Element} <br /> <strong>Canon to show:</strong> {slug['Original?']}</p>
            <p className="slug-desc">{slug.Description}</p>
          </a>
        )}
      </div>
    </article>
  )
}
