import { useEffect, useState, TouchEvent } from 'react';
import { characters } from "../data/characters";
import ProfileCard from './profiles';
import '../styles/characters.css';

const useIsMobile = (breakpoint: number) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const documentChangeHandler = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQueryList.addEventListener('change', documentChangeHandler);
        setIsMobile(mediaQueryList.matches);

        return () => {
            mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
    }, [breakpoint]);

    return isMobile;
};

export default function CharacterList() {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    const isMobile = useIsMobile(930);
    const minSwipeDistance = 50;
    const p = characters[index];

    // Navigation Helper
    const handleMove = (direction: number) => {
        setIndex((prev) => {
            const nextIndex = prev + direction;
            if (nextIndex < 0) return 0;
            if (nextIndex >= characters.length) return characters.length - 1;
            return nextIndex;
        });
    };

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance; // Must be negative

        if (isLeftSwipe) {
            handleMove(1);
        } else if (isRightSwipe) {
            handleMove(-1);
        }
    };

    return (
        <section className="characters">
            <h2> Meet the protagonists </h2>
            {isMobile ? (
                <div className="mobileView">
                    <p> Swipe to see who's next. </p>
                    <div 
                        className="characterStack"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        style={{ touchAction: 'pan-y' }} // Allows vertical scroll, blocks horizontal interference
                    >
                        <ProfileCard 
                            key={p.name}
                            name={p.name} 
                            age={p.age} 
                            description={p.description} 
                            slugs={p.slugs} 
                            image={new URL(`../assets/${p.image}`, import.meta.url).href} 
                        />
                    </div>
                    <p className="index-indicator">{index + 1} / {characters.length}</p>
                </div>
            ) : (
                <div className="characterGrid">
                    {characters.map((char) => (
                        <ProfileCard 
                            key={char.name}
                            name={char.name} 
                            age={char.age} 
                            description={char.description} 
                            slugs={char.slugs} 
                            image={new URL(`../assets/${char.image}`, import.meta.url).href} 
                        />
                    ))}
                </div>
            )}
        </section>
    );
}