import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ConferenceSummit from './ConferenceSummit'
import RegistrationForm from './RegistrationForm'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ConferenceSummit />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </HashRouter>
  )
}

export default App
