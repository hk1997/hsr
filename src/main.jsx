import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// If CloudFront catches a 404 for an unrelated path (e.g. a typo like /thyroid-summit-202)
// it serves this medical app's index.html. To prevent React Router from crashing due to 
// a basename mismatch, we forcefully redirect them to the correct basename.
if (!window.location.pathname.startsWith('/medanta/thyroidfna')) {
  window.location.replace('/medanta/thyroidfna');
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
