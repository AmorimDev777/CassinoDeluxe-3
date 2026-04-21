import { useState } from "react"


function InTransacoesPage({tipo, saldoStorage, inputValue, onChange, onClick, onClickBtn50, onClickBtn200, onClickBtn500}) {
    const [eyeOpen, setEyeOpen] = useState(true)
    
    return (
        <div className="flex flex-col w-100 gap-5">
            <span className="flex flex-col absolute left-8 top-8 gap-2">
                <h1 className="text-2xl">{tipo}</h1>
            </span>
            <h1 className="flex justify-center items-center gap-2 text-center text-2xl">
                <i className="fa-solid fa-money-bill"></i>
                Saldo Atual: R$ <span className={`${eyeOpen ? '' : 'blur-sm'}`}>{eyeOpen ? Number(saldoStorage).toFixed(2).replace('.', ',') : '0,00'}</span>
                <i 
                    className={`fa-solid ${eyeOpen ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer`}
                    onClick={() => {setEyeOpen(!eyeOpen)}}
                ></i>
            </h1>
            <span className="flex justify-center items-center gap-2 w-full">
                <h1 className="text-xl text-zinc-800">R$</h1>
                <input
                    type="number"
                    placeholder="Valor"
                    className="h-full border-b-2 border-zinc-700 text-2xl"
                    onChange={onChange}
                    value={inputValue}
                    />
            </span>
            <span className="boxBtn">
                <button className="btn" onClick={onClickBtn50}>R$ 50,00</button>
                <button className="btn" onClick={onClickBtn200}>R$ 200,00</button>
                <button className="btn" onClick={onClickBtn500}>R$ 500,00</button>
            </span>
            <button 
                className="w-full p-3 bg-zinc-800 text-white rounded-md cursor-pointer transition-all duration-300 hover:brightness-[.8]"
                onClick={onClick}
            >{tipo}</button>
        </div>
    )
}
export default InTransacoesPage