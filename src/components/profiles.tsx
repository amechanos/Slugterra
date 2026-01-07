import React from 'react'
import '../styles/characters.css'

type Profile = {
    "name": string,
    "age": number,
    "slugs": string[],
    "description": string
    "image": string
}

export default function ProfileCard({ name, age, description, slugs, image}: Profile) {
  return (
    <article className="MC-card">
        <img src={image}/>
        <div className="info">
            <h3 className="MC-name">{name} / Age: {age}</h3>
            <div className="arsenal">{slugs.map((t) => <span key={t} className="slug">{t}</span>)}</div>
            <p className="MC-desc">{description}</p>
        </div>
            
    </article>
  )
}
