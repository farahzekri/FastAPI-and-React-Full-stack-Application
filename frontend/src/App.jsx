import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbars from './compoents/Navbar'
import ProductProvider from './product_contesx'
import ProductTable from './compoents/productTable'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductProvider>
    <Navbars/>
    <ProductTable/>
    </ProductProvider>
    
     <Routes>
    
     </Routes>
    </>
  )
}

export default App
