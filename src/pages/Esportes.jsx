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
    let time = []
    useEffect(() => {
        const getDados = async () => {
            axios.get("/db/db.json")
            .then((response) => {
                setConfrontos(response.data.confrontos)
                setTimes(response.data.times)
            })
            .catch((error) => {
                console.error(error);
            });
        }
        getDados()
    }, []);
    times.map((t, i) => {
        if (t.id != 1) return
        return console.log(t.id)
    })
    return (
        <main className="flex flex-col h-screen w-screen p-10 pt-[16vh] gap-10 bg-black">
            <Navbar saldo={Number(saldo)}/>
            {confrontos.map((confronto, index) => (
                <CardEsportes 
                key={index}
                time1={confronto.time1}
                time2={confronto.time2}
                onClick={() => {
                    navigate(`/jogo?confronto=${confronto.id}&time1=${confronto.time1}&time2=${confronto.time2}`)
                }}/>
            ))}
        </main>
    )
}

export default Esportes