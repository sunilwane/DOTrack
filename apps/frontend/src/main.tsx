import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App'
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HeroUIProvider>
          <main className="light text-foreground bg-background">
            <App />
          </main>
        </HeroUIProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
