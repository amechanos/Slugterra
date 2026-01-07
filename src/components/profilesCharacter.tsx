import React from 'react'
import { characters } from "../data/characters"
import ProfileCard from './profiles'
import '../styles/characters.css'

export default function CharacterList() {
    return (
        <section className="characters">
            <h2> Meet the protagonists </h2>
            <div className="characterGrid">
                {characters.map((p) => (
                    <ProfileCard name={p.name} age={p.age} description={p.description} slugs={p.slugs} />
                ))}
            </div>
        </section>
    )
}