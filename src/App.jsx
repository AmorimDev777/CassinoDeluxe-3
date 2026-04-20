import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cassino from './pages/Cassino'
import Configuracoes from './pages/Configuracoes'
import Transacoes from './pages/Transacoes'
import Erro404 from './pages/Erro404'
import Esportes from './pages/Esportes'
import Login from './pages/Login'
import Patrocinios from './pages/Patrocinios'
import Perfil from './pages/Perfil'
import Personalizar from './pages/Personalizar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cassino" element={<Cassino />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/transacoes" element={<Transacoes />} />
      <Route path="/esportes" element={<Esportes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patrocinios" element={<Patrocinios />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfil/personalizar" element={<Personalizar />} />
      <Route path="*" element={<Erro404 />} />  {/* rota catch-all */}
    </Routes>
  )
}

export default App