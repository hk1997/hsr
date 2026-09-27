import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Program from './Program'
import RegistrationForm from './RegistrationForm'
import Dashboard from './Dashboard'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  )
}

export default App
