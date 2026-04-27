import { useState } from "react"
import CardEsportes from "../components/CardEsportes"
import Navbar from "../components/Navbar"
import JogoEsporte from "./JogoEsporte"

function Esportes() {
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [page, setPage] = useState('Inicio')
    const [confronto, setConfronto] = useState('')
    if (page == 'Jogo') {
        return (
            <JogoEsporte confronto={confronto} />
        )
    }   
    else {
        return (
            <main className="h-screen w-screen p-10 pt-[16vh] bg-black">
                <Navbar saldo={Number(saldo)}/>
                <CardEsportes onClick={() => {
                    setConfronto('Vasco-Al Nassr')
                    setPage('Jogo')
                }}/>
            </main>
        )
    }
}

export default Esportes