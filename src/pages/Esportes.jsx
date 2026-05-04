import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardEsportes from "../components/CardEsportes"
import Navbar from "../components/Navbar"
import ImgLoading from "../assets/ImgLoading.png"
import Loading from "../components/Loading";

function Esportes() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [confrontos, setConfrontos] = useState([])
    const [times, setTimes] = useState([])
    const [campeonatos, setCampeonatos] = useState([])
    useEffect(() => {
        const getDados = async () => {
            try {
                const response = await axios.get("/db/db.json")
            
                setConfrontos(response.data.confrontos)
                setTimes(response.data.times)
                setCampeonatos(response.data.campeonatos)
            } catch (error) {
                console.error("Erro no fetch:", error.message)
            } finally {
                setIsLoading(false)
            }
        }
    
        getDados()
    }, [])
    if (isLoading) {
        return <Loading />
    }
    return (
        <main className="flex flex-col w-full p-10 pt-[16vh] gap-5 bg-black">
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
                return (
                    <CardEsportes 
                        key={index}
                        confronto={confronto}
                        time1={time1}
                        time2={time2}
                        campeonato={campeonato}
                        onClick={() => {
                            navigate(`/jogo?confronto=${confronto.id}&time1=${confronto.time1}&time2=${confronto.time2}&esporte=${confronto.esporte}&campeonato=${confronto.campeonato}`)
                        }}
                    />
                )
            })}
        </main>
    )
}

export default Esportes