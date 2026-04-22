import { useState } from "react"
import Card from "./CardHistoricoApostas"

function InTransacoesPage({whatHistorico}) {
    const [historico, setHistorico] = useState(JSON.parse(localStorage.getItem("historico"+whatHistorico)) || [])
    console.log(historico)
    const apagarHistorico = () => {
        localStorage.removeItem("historico"+whatHistorico)
        setHistorico([])
    }
    return (
        <>
            <div className="grid justify-start content-start grid-cols-5 h-full w-full gap-5">
                {historico.map((aposta, index) => (
                    <Card key={index} aposta={aposta} />
                ))}
            </div>
            <div className="flex justify-center w-full ">
                <button className="p-3 bg-black text-white cursor-pointer rounded-md" onClick={() => {apagarHistorico()}}>Apagar Histórico</button>
            </div>
        </>
    )
}

export default InTransacoesPage