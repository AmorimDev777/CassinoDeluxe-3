import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cassino from './pages/Cassino'
import Configuracoes from './pages/Configuracoes'
import Deposito from './pages/Deposito'
import Erro404 from './pages/Erro404'
import Esportes from './pages/Esportes'
import Login from './pages/Login'
import Patrocinios from './pages/Patrocinios'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cassino" element={<Cassino />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/deposito" element={<Deposito />} />
      <Route path="/esportes" element={<Esportes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patrocinios" element={<Patrocinios />} />
      <Route path="*" element={<Erro404 />} />  {/* rota catch-all */}
    </Routes>
  )
}

export default App