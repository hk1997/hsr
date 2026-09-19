import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ConferenceSummit from './ConferenceSummit'
import RegistrationForm from './RegistrationForm'
import Dashboard from './Dashboard'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ConferenceSummit />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  )
}

export default App
