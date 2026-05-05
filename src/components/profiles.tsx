import React from 'react'
import '../styles/characters.css'

type Profile = {
    name: string
    age: number
    slugs: string[]
    description: string
    image: string
    onSlugClick?: (slug: string) => void
}

export default function ProfileCard({ name, age, description, slugs, image, onSlugClick }: Profile) {
  return (
    <article className="MC-card">
        <img src={image}/>
        <div className="info">
            <h3 className="MC-name">{name} / Age: {age}</h3>
            <div className="arsenal">
              {slugs.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="slug"
                  onClick={() => onSlugClick?.(t)}
                  aria-label={`View ${t} in slug gallery`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="MC-desc">{description}</p>
        </div>
    </article>
  )
}
