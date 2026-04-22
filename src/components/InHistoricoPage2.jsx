import { useState } from "react"

function InTransacoesPage2({whatHistorico}) {
    const [historico, setHistorico] = useState(JSON.parse(localStorage.getItem("historico"+whatHistorico)) || [])
    console.log(historico)
    const apagarHistorico = () => {
        localStorage.removeItem("historico"+whatHistorico)
        setHistorico([])
    }
    return (
        <>
            <div className="grid justify-start content-start grid-cols-5 h-full w-full gap-5">
                {historico.map((tra, index) => (
                    <div key={index}>
                        <h1>{tra.valor}</h1>
                        <h1>{tra.tipo}</h1>
                        <h1>{tra.data}</h1>
                    </div>
                ))}
            </div>
            <div className="flex justify-center w-full ">
                <button className="p-3 bg-black text-white cursor-pointer rounded-md" onClick={() => {apagarHistorico()}}>Apagar Histórico</button>
            </div>
        </>
    )
}

export default InTransacoesPage2