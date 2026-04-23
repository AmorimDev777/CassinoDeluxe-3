import { useEffect, useState } from "react"

function HistoricoTransacoes({whatHistorico}) {
    const [historico, setHistorico] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(whatHistorico)) || []
        setHistorico(data)
    }, [whatHistorico])

    console.log(historico)

    const apagarHistorico = () => {
        localStorage.removeItem(whatHistorico)
        setHistorico([])
    }
    return (
        <>
            <div className="customScrollHistorico containerHistorico">
                {historico.map((transacao, index) => (
                    <div key={index} className="p-3 bg-white shadow-md shadow-black rounded-xl border-2 border-black">
                        <h1>{transacao.valor}</h1>
                        <h1>{transacao.tipo}</h1>
                        <h1>{transacao.data}</h1>
                    </div>
                ))}
            </div>
            <div className="flex justify-center w-full ">
                <button className="p-3 bg-black text-white cursor-pointer rounded-md" onClick={() => {apagarHistorico()}}>Apagar Histórico</button>
            </div>
        </>
    )
}

export default HistoricoTransacoes