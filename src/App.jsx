import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Erro404 from './pages/Erro404'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Erro404 />} />  {/* rota catch-all */}
    </Routes>
  )
}

export default App