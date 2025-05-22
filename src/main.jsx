import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Expand from './assets/components/Expand.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<App/>} />
      <Route path='/details' element={<Expand />} />
    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
