import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cassino from './pages/Cassino'
import Configuracoes from './pages/Configuracoes'
import Transacoes from './pages/Transacoes'
import Erro404 from './pages/Erro404'
import Esportes from './pages/Esportes'
import Login from './pages/Login'
import Sobre from './pages/Sobre'
import Perfil from './pages/Perfil'
import Personalizar from './pages/Personalizar'
import Roleta from './pages/JogosCassino/Roleta'
import CacaNiquel from './pages/JogosCassino/CacaNiquel'
import Jokempo from './pages/JogosCassino/Jokempo'
import BacBo from './pages/JogosCassino/BacBo'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cassino" element={<Cassino />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/transacoes" element={<Transacoes />} />
      <Route path="/esportes" element={<Esportes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfil/personalizar" element={<Personalizar />} />
      {/* Jogos Cassino */}
      <Route path="/roleta" element={<Roleta />} />
      <Route path="/cacaniquel" element={<CacaNiquel />} />
      <Route path="/jokempo" element={<Jokempo />} />
      <Route path="/bacbo" element={<BacBo />} />
      {/* Pagina não encontrada */}
      <Route path="*" element={<Erro404 />} />  {/* rota catch-all */}
    </Routes>
  )
}

export default App