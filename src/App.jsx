import { useState } from 'react'
import SlugGallery from './components/SlugGallery'
import Header from './components/header'
import ReadingPage from './components/ReadingPage'
import MapPage from './components/MapPage'
import CharacterList from './components/profilesCharacter'
import Home from './components/Home'
import Footer from './components/footer'
import './App.css'

function App() {
  const [view, setView] = useState('home')
  const [selectedSlugId, setSelectedSlugId] = useState(null);
  const clearSelectedSlugId = () => setSelectedSlugId(null)

  return (
    <>
      <Header view={view} setView={setView} />
      <main>
        {view === 'home' && <Home setView={setView} />}
        {view === 'gallery' && <SlugGallery selectedSlugId={selectedSlugId} onClearSelectedSlug={clearSelectedSlugId} />}
        {view === 'reading' && <ReadingPage />}
        {view === 'map' && <MapPage setView={setView} setSelectedSlugId={setSelectedSlugId} />}
        {view === 'characters' && <CharacterList setView={setView} setSelectedSlugId={setSelectedSlugId} />}
      </main>
      <Footer/>
    </>
  )
}

export default App
