import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './components/ui/color-mode'
import { Demo } from './components/Custom-component/Demo'

function App() {
  return (
    <HStack display='flex' justifyContent='space-between' boxSizing='border-box' padding='20px'>
      <ColorModeButton />
      <Button>Click me</Button>
      <Button>Click me</Button>
      <Demo />
    </HStack>
  )
}

export default App
