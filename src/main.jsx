import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>

// The production build ships prerendered HTML. The dev server starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
