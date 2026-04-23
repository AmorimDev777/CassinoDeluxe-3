import { useState } from "react"


function TransacoesComponent({tipo, saldoStorage, inputValue, onChange, onClick, onClickBtn50, onClickBtn200, onClickBtn500}) {
    const [eyeOpen, setEyeOpen] = useState(true)
    
    return (
        <div className="flex flex-col w-50 gap-3 md:w-100 md:gap-5 xl:w-200 xl:gap-10">
            <span className="flex flex-col absolute left-4 top-4 gap-2 sm:left-8 sm:top-8">
                <h1 className="text-base sm:text-2xl xl:text-3xl">{tipo}</h1>
            </span>
            <h1 className="flex justify-center items-center gap-2 text-center text-2xl xl:text-4xl">
                <span className="justify-center items-center hidden md:flex">
                    <i className="fa-solid fa-money-bill"></i>
                </span>
                <span className="hidden md:flex">Saldo Atual: </span>R$ <span className={`${eyeOpen ? '' : 'blur-sm'}`}>{eyeOpen ? Number(saldoStorage).toFixed(2).replace('.', ',') : '0,00'}</span>
                <i 
                    className={`fa-solid ${eyeOpen ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer`}
                    onClick={() => {setEyeOpen(!eyeOpen)}}
                ></i>
            </h1>
            <span className="flex justify-center items-center gap-2 w-full">
                <h1 className="text-xl text-zinc-800 xl:text-3xl">R$</h1>
                <input
                    type="number"
                    placeholder="Valor"
                    className="h-full w-full border-b-2 border-zinc-700 text-lg md:text-2xl xl:text-4xl"
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
                className="w-full p-3 bg-zinc-800 text-white rounded-md cursor-pointer transition-all duration-300 hover:brightness-[.8] xl:p-6 xl:text-2xl"
                onClick={onClick}
            >{tipo}</button>
        </div>
    )
}
export default TransacoesComponent