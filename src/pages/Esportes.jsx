import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardEsportes from "../components/CardEsportes"
import Navbar from "../components/Navbar"

function Esportes() {
    const navigate = useNavigate()

    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [confrontos, setConfrontos] = useState([])
    const [times, setTimes] = useState([])
    const [campeonatos, setCampeonatos] = useState([])
    useEffect(() => {
        const getDados = async () => {
            axios.get("/db/db.json")
            .then((response) => {
                setConfrontos(response.data.confrontos)
                setTimes(response.data.times)
                setCampeonatos(response.data.campeonatos)
            })
            .catch((error) => {
                console.error(error);
            });
        }
        getDados()
    }, []);
    return (
        <main className="flex flex-col h-screen w-screen p-10 pt-[16vh] gap-5 bg-black">
            <Navbar saldo={Number(saldo)}/>
            {confrontos.map((confronto, index) => {
                const time1 = times.find(t => (
                    t.nome === confronto.time1
                ))
                const time2 = times.find(t => (
                    t.nome === confronto.time2
                ))
                const campeonato = campeonatos.find(c => (
                    c.id === confronto.campeonato
                ))
                return <CardEsportes 
                key={index}
                confronto={confronto}
                time1={time1}
                time2={time2}
                campeonato={campeonato}
                onClick={() => {
                    navigate(`/jogo?confronto=${confronto.id}&time1=${confronto.time1}&time2=${confronto.time2}&esporte=${confronto.esporte}&campeonato=${confronto.campeonato}`)
                }}/>
            })}
        </main>
    )
}

export default Esportes