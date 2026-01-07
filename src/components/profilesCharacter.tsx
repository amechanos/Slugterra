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
                    <ProfileCard 
                        key={p.name} // Added a key for React optimization
                        name={p.name} 
                        age={p.age} 
                        description={p.description} 
                        slugs={p.slugs} 
                        // Resolve the image path here:
                        image={new URL(`../assets/${p.image}`, import.meta.url).href} 
                    />
                ))}
            </div>
        </section>
    )
}