import { useState, useEffect } from "react";
import axios from "axios";

function CardEsportes({confronto, onClick}) {
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
    const time1 = times.find(time => time.nome === confronto.time1)
    const time2 = times.find(time => time.nome === confronto.time2)
    const campeonato = campeonatos.find(campeonato => campeonato.id === Number(confronto.campeonato))

    if (!time1 || !time2) {
        return <div className="flex justify-center items-center fixed">Carregando...</div>
    }

    return (
        <div 
            className="flex justify-between w-full h-20 bg-white border-2 border-zinc-400 rounded-xl cursor-pointer transition-all duration-200 
                hover:brightness-[.8]" 
            onClick={onClick}
        >       
            <div className="flex h-full">
                <div className="flex justify-center items-center flex-col h-full text-xs text-zinc-500 aspect-square">
                    <p>{confronto.data}</p>
                    <p>{confronto.hora}</p>
                </div>
                <div className="flex justify-center items-center flex-col h-full py-3 gap-1">
                    <span className="flex h-[50%] w-full gap-1">
                        <img src={time1.escudo} alt="" className="h-full aspect-square object-contain"/>
                        <h1>{time1.nome}</h1>
                    </span>
                    <span className="flex h-[50%] w-full gap-1">
                        <img src={time2.escudo} alt="" className="h-full aspect-square object-contain"/>
                        <h1>{time2.nome}</h1>
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col h-full py-3 pr-5">
                <img 
                    src={campeonato.logo} 
                    alt="" 
                    className="h-[70%] object-contain" 
                />
                <h1 className="text-sm">{campeonato.nome}</h1>
            </div>
        </div>
    )
}

export default CardEsportes