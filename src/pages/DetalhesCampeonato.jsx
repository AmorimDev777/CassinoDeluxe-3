import { useState, useEffect } from "react";    
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function DetalhesCampeonato() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const campeonatoId = searchParams.get('campeonato')
    const [times, setTimes] = useState([])
    const [campeonatos, setCampeonatos] = useState([])
    useEffect(() => {
        const getDados = async () => {
            axios.get("/db/db.json")
            .then((response) => {
                setTimes(response.data.times)
                setCampeonatos(response.data.campeonatos)
            })
            .catch((error) => {
                console.error(error);
            });
        }
        getDados()
    }, []);
    const campeonato = campeonatos.find(c => 
        c.id === Number(campeonatoId)
    )
    
    if (!campeonato) {
        return <p className="text-white">Carregando...</p>
    }
    
    const timesCampeonato = times.filter(t => 
        t.esporte === campeonato.esporte
    )
    return (
        <main className="flex items-center flex-col h-screen w-full p-10 gap-3 text-white">
            <span onClick={() => {navigate(-1)}} className="fixed cursor-pointer">
                <i className="fa-solid fa-arrow-left fixed top-3 left-19 text-4xl text-white 2xl:top-8 2xl:left-8 2xl:text-5xl"></i>
            </span>
            <span onClick={() => {navigate("/")}} className="fixed cursor-pointer">
                <i className="fa-solid fa-house fixed top-3 left-3 text-3xl text-white 2xl:top-8 2xl:left-8 2xl:text-5xl"></i>
            </span>
            <img src={campeonato.logo} alt="" className="h-50 aspect-square object-contain"/>
            <h1 className="text-4xl">{campeonato.nome}</h1>
            <h2 className="text-2xl">{campeonato.esporte}</h2>
            <span className="flex gap-1">
                <h1>De {campeonato.data_inicio}</h1>
                <p>Até</p>
                <h1>{campeonato.data_fim}</h1>
            </span>
            <div className="grid justify-start items-start grid-cols-6 w-full px-10 gap-10">
                {timesCampeonato.map((t, i) => (
                    <span key={i} className="aspect-square cursor-pointer transition-all duration-200 hover:scale-[1.15]">
                        <img 
                            src={t.escudo} 
                            alt="" 
                            className="w-full aspect-square object-contain"
                            onClick={() => {navigate(`/detalhes/time?time=${t.nome}`)}}
                        />
                    </span>
                ))}
            </div>
        </main>
    )
}

export default DetalhesCampeonato