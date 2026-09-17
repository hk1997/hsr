import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ConferenceSummit from './ConferenceSummit'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ConferenceSummit />} />
      </Routes>
    </HashRouter>
  )
}

export default App
