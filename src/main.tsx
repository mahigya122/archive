import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ArchiveProvider} from "./context/postContext.tsx";
import { IconContext } from "@phosphor-icons/react";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconContext.Provider value={{ color: "currentColor", size: "1.5em" }}>
    <ArchiveProvider>
      <App />
    </ArchiveProvider>
    </IconContext.Provider>
  </StrictMode>,
)