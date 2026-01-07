import React from 'react'
import '../styles/characters.css'

type Profile = {
    "name": string,
    "age": number,
    "slugs": string[],
    "description": string
}

export default function ProfileCard({ name, age, description, slugs}: Profile) {
  return (
    <article className="MC-card">
        <img src="https://thumbs.dreamstime.com/b/default-placeholder-businessman-half-length-portr-default-placeholder-businessman-half-length-portrait-photo-avatar-man-gray-color-113622420.jpg"/>
        <div className="info">
            <h3 className="MC-name">{name} / Age: {age}</h3>
            <div className="arsenal">{slugs.map((t) => <span key={t} className="slug">{t}</span>)}</div>
            <p className="MC-desc">{description}</p>
        </div>
            
    </article>
  )
}
