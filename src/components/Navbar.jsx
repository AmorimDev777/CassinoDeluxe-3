import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Logo from '../assets/Logo.png';
import UsuarioPadrao from '../assets/UsuarioPadrao.jpg';

function Navbar() {
    const favSportStorage = localStorage.getItem('favoriteSport')
    const [menuOpen, setMenuOpen] = useState(false)
    const [esportes, setEsportes] = useState([])
    const [logado] = useState(false)
    const [profileOptionsOpen, setProfileOptionsOpen] = useState(false)
    
    useEffect(() => {
        fetch('/db/db.json')
            .then(response => response.json())
            .then(data => setEsportes(data.esportes))
            .catch(error => console.error('Erro ao buscar esportes:', error))
    }, [])
    
    const openCloseMenuMobile = () => {
        setMenuOpen(!menuOpen)
    }
    const openCloseProfileOptions = () => {
        setProfileOptionsOpen(!profileOptionsOpen)
    }
    return (
        <header className='navBar fixed top-0 left-0 z-99'>
            <nav className='flex justify-between items-center relative h-[12vh] w-screen py-2 px-7 bg-zinc-950 border-b-3 border-zinc-900 z-99 sm:justify-around sm:px-0 min-[1500px]:py-4'>
                <span className='flex justify-center items-center h-full'>
                    <img src={Logo} alt="Logo" className='h-full aspect-square transition-all duration-200 hover:scale-[1.1]'/>
                </span>
                <ul className='hidden justify-center items-center h-full gap-5 sm:flex'>
                    <li><Link to="/" className="link flex text-lg"><i className='fa-solid fa-house'></i></Link></li>
                    <li><Link to="/esportes" className="link linkLine flex">Esportes</Link></li>
                    <li><Link to="/cassino" className="link linkLine flex">Cassino</Link></li>
                </ul>
                <span className='flex justify-center items-center relative h-full gap-8'>
                    <span className="flex justify-center items-center h-[70%] gap-2 pr-3 bg-zinc-900 text-xs overflow-hidden rounded-full min-[390px]:pr-0 sm:p-0 xl:h-[60%] min-[1500px]:h-[50%] min-[1500px]:text-lg">
                        <span className="h-full transition-all duration-200 hover:brightness-[.9]">
                            <img src={UsuarioPadrao} alt="" className="h-full rounded-full object-contain cursor-pointer"
                                onClick={() => {openCloseProfileOptions()}}
                            />
                        </span>
                        <p className="text-white">R$ 999999,99</p>
                        <Link to="/deposito" className="hidden items-center h-full px-2 bg-amber-300 transition-all duration-200 hover:brightness-[.9] min-[390px]:flex sm:flex">Depositar</Link>
                    </span>
                    <Link to="/configuracoes" className="link hidden text-xl sm:flex">
                        <i className='fa-solid fa-gear'></i>
                    </Link>
                    <span className={`${profileOptionsOpen ? 'flex' : 'hidden'} items-center flex-col absolute left-0 bottom-2 w-fit px-4 py-3 gap-2 bg-black border border-zinc-800 text-white rounded-[10px] translate-y-full`}>
                        <Link to={`${logado ? '/perfil' : ''}`} className={`linkPerfil ${logado ? 'text-white' : 'text-zinc-500 cursor-not-allowed'}`} title={logado ? '' : 'Precisa estar logado para acessar'}><i className="fa-solid fa-circle-user"></i>Perfil</Link>
                        <hr className="linePerfil"/>
                        <Link to={`${logado ? '/perfil/personalizar' : ''}`} className={`linkPerfil ${logado ? 'text-white' : 'text-zinc-500 cursor-not-allowed'}`} title={logado ? '' : 'Precisa estar logado para acessar'}><i className="fa-solid fa-palette"></i>Personalizar</Link>
                        <hr className="linePerfil"/>
                        <Link to={`${logado ? '/sair' : '/login'}`} className="linkPerfil"><i className="fa-solid fa-right-from-bracket"></i>{logado ? 'Sair' : 'Logar'}</Link>
                    </span>
                </span>
                <span className="flex justify-center items-center sm:hidden">
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} link text-2xl cursor-pointer`} onClick={() => {openCloseMenuMobile()}}></i>
                </span>
            </nav>
            <ul className={`menuMobile flex items-center flex-col absolute left-0 bottom-0 w-full gap-2 p-3 ${menuOpen ? 'translate-y-full' : '-translate-y-full'} bg-zinc-950 border-b-3 border-zinc-900 transition-all duration-200 z-98 sm:hidden`}>
                <li><Link to="/" className="link linkLine flex"><i className="fa-solid fa-house iconMobile"></i>Home</Link></li>
                <li><Link to="/esportes" className="link linkLine flex"><i className={`fa-solid fa-${esportes.find(esporte => esporte.nome === favSportStorage)?.icon} iconMobile`}></i>Esportes</Link></li>
                <li><Link to="/cassino" className="link linkLine flex"><i className="fa-solid fa-dice iconMobile"></i>Cassino</Link></li>
                <li><Link to="/depositar" className="link linkLine flex"><i className="fa-solid fa-piggy-bank iconMobile"></i>Depositar</Link></li>
                <li><Link to="/configuracoes" className="link linkLine flex"><i className="fa-solid fa-gear iconMobile"></i>Configurações</Link></li>
            </ul>
        </header>
    )
}

export default Navbar