import { useState, useEffect } from "react";    
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function DetalhesTime() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const timeNome = searchParams.get('time')
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
    const time = times.find(t => (
        t.nome === timeNome
    ))
    
    if (!time) {
        return <p className="text-white">Carregando...</p>
    }

    const campeonatosTime = campeonatos.filter(c => (
        c.esporte === time.esporte
    ))
    return (
            <main className="flex items-center flex-col h-screen w-full p-10 gap-3 text-white">
                <span onClick={() => {navigate(-1)}} className="fixed cursor-pointer">
                    <i className="fa-solid fa-arrow-left fixed top-3 left-19 text-4xl text-white 2xl:top-8 2xl:left-8 2xl:text-5xl"></i>
                </span>
                <span onClick={() => {navigate("/")}} className="fixed cursor-pointer">
                    <i className="fa-solid fa-house fixed top-3 left-3 text-3xl text-white 2xl:top-8 2xl:left-8 2xl:text-5xl"></i>
                </span>
                <img src={time.escudo} alt="" className="h-50 aspect-square object-contain"/>
                <h1 className="text-4xl">{time.nome}</h1>
                <h2 className="text-2xl">{time.esporte}</h2>
                <div className="grid justify-start items-start grid-cols-6 w-full px-10 gap-10">
                {campeonatosTime.map((c, i) => (
                    <span key={i} className="aspect-square cursor-pointer transition-all duration-200 hover:scale-[1.15]">
                        <img 
                            src={c.logo} 
                            alt="" 
                            className="w-full aspect-square object-contain"
                            onClick={() => {navigate(`/detalhes/campeonato?campeonato=${c.id}`)}}
                        />
                    </span>
                ))}
                </div>
            </main>
    )
}

export default DetalhesTime