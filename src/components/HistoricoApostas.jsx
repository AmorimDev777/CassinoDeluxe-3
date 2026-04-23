import { useState } from "react"

function HistoricoApostas({whatHistorico}) {
    const [historico, setHistorico] = useState(JSON.parse(localStorage.getItem(whatHistorico)) || [])
    const apagarHistorico = () => {
        localStorage.removeItem(whatHistorico)
        setHistorico([])
    }
    return (
        <>
            <div className="customScrollHistorico containerHistorico">
                {historico.map((aposta, index) => (
                    <div key={index} className={`p-3 bg-white rounded-xl shadow-md border-2 ${aposta.status === 'Perdeu' ? 'shadow-red-500 border-red-500' : 'shadow-green-500 border-green-500'}`}>
                        <h1>{aposta.valor}</h1>
                        <h1>{aposta.jogo}</h1>
                        <h1>{aposta.aposta}</h1>
                        <h1>{aposta.status}</h1>
                        <h1>{aposta.data}</h1>
                    </div>
                ))}
            </div>
            <div className="flex justify-center w-full ">
                <button className="p-3 bg-black text-white cursor-pointer rounded-md" onClick={() => {apagarHistorico()}}>Apagar Histórico</button>
            </div>
        </>
    )
}

export default HistoricoApostas