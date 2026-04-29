import { useState, useEffect } from "react";

function CardEsportes({confronto, time1, time2, campeonato, onClick}) {
    if (!time1 || !time2) {
        return <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-full text-9xl text-amber-400 backdrop-blur-lg"><i class="fa-solid fa-spinner animate-[spin_0.5s_linear_infinite]"></i></div>
    }

    return (
        <div 
            className="flex justify-between w-full h-20 bg-white border-2 border-zinc-400 rounded-xl cursor-pointer transition-all duration-200 
                hover:brightness-[.8]" 
            onClick={onClick}
        >       
            <div className="flex h-full">
                <div className="flex justify-center items-center flex-col h-full text-xs text-zinc-500 aspect-square">
                    <p>{confronto?.data}</p>
                    <p>{confronto?.hora}</p>
                </div>
                <div className="flex justify-center items-center flex-col h-full py-3 gap-1">
                    <span className="flex h-[50%] w-full gap-1">
                        <img src={time1?.escudo} alt="" className="h-full aspect-square object-contain"/>
                        <h1>{time1?.nome}</h1>
                    </span>
                    <span className="flex h-[50%] w-full gap-1">
                        <img src={time2?.escudo} alt="" className="h-full aspect-square object-contain"/>
                        <h1>{time2?.nome}</h1>
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col h-full py-3 pr-5">
                <img 
                    src={campeonato?.logo} 
                    alt="" 
                    className="h-[70%] object-contain" 
                />
                <h1 className="text-sm">{campeonato?.nome}</h1>
            </div>
        </div>
    )
}

export default CardEsportes