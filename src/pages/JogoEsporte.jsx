import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import SaldoCassino from "../components/SaldoCassino"
import SetaVoltar from "../components/SetaVoltar"

function JogoEsporte() {
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [confrontos, setConfrontos] = useState([])
    const [times, setTimes] = useState([])
    const [campeonatos, setCampeonatos] = useState([])
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const confrontoId = searchParams.get('confronto')
    const time1Nome = searchParams.get('time1')
    const time2Nome = searchParams.get('time2')
    const esporteNome = searchParams.get('esporte')
    const campeonatoId = searchParams.get('campeonato')
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
    const confronto = confrontos.find(c => 
        c.id === Number(confrontoId)
    )
    const campeonato = campeonatos.find(c => 
        c.id === Number(campeonatoId)
    )
    const time1 = times.find(t => (
        t.nome === time1Nome && t.esporte === esporteNome
    ))
    const time2 = times.find(t => (
        t.nome === time2Nome && t.esporte === esporteNome
    ))
    return (
        <>
            <SetaVoltar to="/esportes" />  
            <SaldoCassino value={`R$ ${Number(saldo).toFixed(2).replace('.', ',')}`} />
            {confrontos.map((c, index) => {
                if (c.id != confrontoId) return
                return (
                    <main key={index} className="flex justify-center items-center flex-col pt-15 gap-5">
                        <div className="w-[70%] bg-zinc-300 rounded-xl overflow-hidden">
                            <span className="flex justify-center items-center p-2 gap-2 bg-white">
                                <img 
                                    src={campeonato.logo} 
                                    alt="" 
                                    className="h-5 aspect-square object-contain cursor-pointer" 
                                    onClick={() => {navigate(`/detalhes/campeonato?campeonato=${campeonato.id}`)}}
                                />
                                <h1>{campeonato.nome}</h1>
                                <h1 className="text-zinc-800">{confronto.data}</h1>
                                <h1 className="text-zinc-800">{confronto.hora}</h1>
                            </span>
                            <span className="flex justify-between items-center p-4">
                                <span className="flex justify-center items-center gap-3">
                                    <img src={time1.escudo} alt="" className="w-15 cursor-pointer" onClick={() => {navigate(`/detalhes/time?time=${time1.nome}&esporte=${time1.esporte}`)}}/>
                                    <h1>{time1.nome}</h1>
                                </span>
                                <i className="fa-solid fa-xmark"></i>
                                <span className="flex justify-center items-center gap-3">
                                    <h1>{time2.nome}</h1>
                                    <img src={time2.escudo} alt="" className="w-15 cursor-pointer" onClick={() => {navigate(`/detalhes/time?time=${time2.nome}&esporte=${time2.esporte}`)}}/>
                                </span>
                            </span>
                        </div>

                        <div className="flex flex-col w-[70%] p-5 gap-3 bg-zinc-300 rounded-xl overflow-hidden">
                            <div className="flex justify-center flex-col w-full h-10 p-3 bg-white shadow-md shadow-black/40 rounded-md">
                                <span className="flex justify-between items-center">
                                    <h1>Resultado Final</h1>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            </div>
                            <div className="flex justify-center flex-col w-full h-10 p-3 bg-white shadow-md shadow-black/40 rounded-md">
                                <span className="flex justify-between items-center">
                                    <h1>Ambas Marcam</h1>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            </div>
                            <div className="flex justify-center flex-col w-full h-10 p-3 bg-white shadow-md shadow-black/40 rounded-md">
                                <span className="flex justify-between items-center">
                                    <h1>Total Gols</h1>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            </div>
                        </div>
                    </main>
                )
            })}
        </>
    )
}

export default JogoEsporte