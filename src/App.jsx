import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Vitrine from './pages/Vitrine.jsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Vitrine />} />
        {/* Le site tient en une page et toute sa navigation passe par des
            ancres : aucune 404 légitime n'existe. Sans cette route, une URL
            mal recopiée rendait un écran entièrement vide, sans logo ni
            moyen de revenir. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
