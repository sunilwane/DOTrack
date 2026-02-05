import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App'
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
