import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Teste from './pages/Teste'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/catalog" element={<Catalog />}/>
      <Route path="/produtos/:id" element={<ProductDetail />} />
      <Route path="/teste" element={<Teste />}/>
    </Routes>
  )
}
