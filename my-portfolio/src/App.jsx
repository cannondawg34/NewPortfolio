// src/App.jsx
import './App.css'
import './GameSite/css/styles.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Games from './pages/Games'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="games" element={<Games />} />
        {/* catch-all to home (optional) */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
