import { useState } from 'react'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'
import './App.css'
import {Accordion, AccordionItem} from "@heroui/react";
import { AppRouter } from './router';

function App() {
  const [count, setCount] = useState(0)
   return <AppRouter />;
}

export default App
