import { useState } from "react"
import { Link } from "react-router-dom"
import AlertBacBo from "../../components/AlertBacBo"

function BacBo() {
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [isVisible, setIsVisible] = useState(false)
    const [statusAlert, setStatusAlert] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [apostaTotal, setApostaTotal] = useState(0)
    const [dado1, setDado1] = useState('five')    
    const [dado2, setDado2] = useState('five')
    const [dado3, setDado3] = useState('five')
    const [dado4, setDado4] = useState('five')
    const [isSpinningDado1, setIsSpinningDado1] = useState(false)    
    const [isSpinningDado2, setIsSpinningDado2] = useState(false)
    const [isSpinningDado3, setIsSpinningDado3] = useState(false)
    const [isSpinningDado4, setIsSpinningDado4] = useState(false)
    const dados = ["one", "two", "three", "four", "five", "six"]
    const r = () => {
        const botoes = []

        for (let i = 0; i < 108; i++) {
            botoes.push(
                <button key={i} className={`flex justify-center items-center h-4 p-1
                ${i > 26 ? 'text-[4px]  text-zinc-500' : 'text-[10px]  text-white bg-red-500'} font-medium aspect-square rounded-full`}>
                    {i > 26 ? (<i className="fa-solid fa-circle"></i>) : ('B')}
                </button>
            )
        }

        return botoes
    }
    const alertar = (status, msg) => {
        setStatusAlert(status)
        setAlertMsg(msg)

        let contador = 0
        const max = 35

        const interval = setInterval(() => {
            setIsVisible(true)
            contador++
            
            if (contador >= max) {
                clearInterval(interval)
                setIsVisible(false)
            }
        }, 100)
    }
    const addAposta = (valor) => {
        if (Number(apostaTotal) > Number(saldo)) return 
        console.log(Number(apostaTotal) + Number(valor))
        if ((Number(apostaTotal) + Number(valor)) >= Number(saldo)) return setApostaTotal(Number(saldo))
        setApostaTotal(Number(valor))
    }
    const finalizarResultado = (d1,d2,d3,d4,aposta) => {
        let jogadorPontos = (dados.indexOf(d1) + 1) + (dados.indexOf(d3) + 1)
        let bancaPontos = (dados.indexOf(d2) + 1) + (dados.indexOf(d4) + 1)
        console.log("Jogador - " + jogadorPontos)
        console.log("Banca - " + bancaPontos)
        console.log(
            jogadorPontos > bancaPontos 
            ? 'Jogador Ganhou'
            : jogadorPontos < bancaPontos 
            ? 'Banca Ganhou'
            : 'Empate'
        )
        if (jogadorPontos > bancaPontos) {
            alertar('Ganhou', 'Jogador Ganhou')
        }
        else if (jogadorPontos < bancaPontos) {
            alertar('Perdeu', 'Banca Ganhou')
        }
        else {
            alertar('Empate', 'Empate')
        }
    }
    const girarDados = (aposta) => {

        if (isSpinningDado4) return console.log('Ainda girando...')

        setIsSpinningDado1(true)
        setIsSpinningDado2(true)
        setIsSpinningDado3(true)
        setIsSpinningDado4(true)

        let contador1 = 0
        let contador2 = 0
        let contador3 = 0
        let contador4 = 0
        let d1 = ''
        let d2 = ''
        let d3 = ''
        let d4 = ''
        const maxGiros = 20

        const interval = setInterval(() => {
            if (contador1 < 5) {
                d1 = dados[Math.floor(Math.random() * dados.length)]
                setDado1(d1)
            } else {setIsSpinningDado1(false)}
            if (contador2 < 10) {
                d2 = dados[Math.floor(Math.random() * dados.length)]
                setDado2(d2)
            } else {setIsSpinningDado2(false)}
            if (contador3 < 15) {
                d3 = dados[Math.floor(Math.random() * dados.length)]
                setDado3(d3)
            } else {setIsSpinningDado3(false)}
            
            d4 = dados[Math.floor(Math.random() * dados.length)]
            setDado4(d4)
            
            contador1++
            contador2++
            contador3++
            contador4++

            if (contador4 >= maxGiros) {
                clearInterval(interval)
                setIsSpinningDado4(false)
                finalizarResultado(d1,d2,d3,d4,aposta)
            }
        }, 200)
    }

    return (
        <main className="flex justify-center items-start relative h-screen w-full">
            {isVisible ?
                (<AlertBacBo 
                status={statusAlert} 
                msg={alertMsg}
                />) : (<p></p>)
            }
            <div className="divScreenControls flex justify-center items-end h-screen w-screen absolute
            p-5"
            >
                <span className="flex items-center absolute top-4 left-4 gap-5 text-white">
                    <Link to='/cassino'>
                        <i className="fa-solid fa-arrow-left text-3xl"></i>
                    </Link>
                    <h1 className="text-xl">Bac Bo Offline</h1>
                </span>
                <div className="grid grid-cols-12 grid-rows-9 absolute left-5 gap-1 p-1 -translate-y-[calc(40%)] rounded-tr-xl rounded-br-xl">
                    {r()}
                </div>
                <div className="flex absolute left-5 gap-3">
                    <span className="flex justify-center items-center flex-col py-2 px-6 bg-black/50 
                    border-2 border-zinc-700 rounded-full"
                    >
                        <h1 className="text-xs text-white">Saldo</h1>
                        <p className="text-sm text-amber-400">R$ {Number(saldo).toFixed(2).replace('.', ',')}</p>
                    </span>
                    <span className="flex justify-center items-center flex-col py-2 px-6 bg-black/50 
                    border-2 border-zinc-700 rounded-full"
                    >
                        <h1 className="text-xs text-white">Aposta Total</h1>
                        <p className="text-sm text-amber-400">R$ {Number(apostaTotal).toFixed(2).replace('.', ',')}</p>
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center relative h-45 gap-1 bg-zinc-300 
                    text-white aspect-2/1 rounded-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-start flex-col h-full w-[50%] p-3 
                        bg-blue-700 cursor-pointer transition-all duration-300 hover:brightness-[.7]"
                            onClick={() => {girarDados('Jogador')}}
                        >
                            <h1 className="text-xs text-zinc-300">2.00X</h1>
                            <h1 className="text-lg">Jogador</h1>
                        </div>
                        <div className="flex justify-center items-center absolute h-[90%] bg-green-600 
                        border-4 border-zinc-300 text-xl aspect-square rounded-full cursor-pointer z-10 transition-all duration-300 hover:brightness-[.7]"
                            onClick={() => {girarDados('Empate')}}
                        >
                            <h1>Empate</h1>
                        </div>
                        <div className="flex justify-between items-end flex-col h-full w-[50%] p-3 
                        bg-red-500 cursor-pointer transition-all duration-300 hover:brightness-[.7]"
                            onClick={() => {girarDados('Banca')}}
                        >
                            <h1 className="text-xs text-zinc-300">2.00X</h1>
                            <h1 className="text-lg">Banca</h1>
                        </div>
                    </div>
                    <div className="divFichas flex items-center relative w-full gap-2">
                        <button className="btnVoltar -left-2 -translate-x-full" title="Tudo" onClick={() => {addAposta(Number(saldo))}}>
                            <i className="fa-solid fa-wallet"></i>
                        </button>
                        <button className="ficha cinza" onClick={() => {addAposta(Number(apostaTotal) + 1)}}><p>1</p></button>
                        <button className="ficha verde" onClick={() => {addAposta(Number(apostaTotal) + 2)}}><p>5</p></button>
                        <button className="ficha azul" onClick={() => {addAposta(Number(apostaTotal) + 25)}}><p>25</p></button>
                        <button className="ficha vermelha text-sm" onClick={() => {addAposta(Number(apostaTotal) + 100)}}><p>100</p></button>
                        <button className="ficha branca text-sm" onClick={() => {addAposta(Number(apostaTotal) + 500)}}><p>500</p></button>
                        <button className="ficha dourada text-xs" onClick={() => {addAposta(Number(apostaTotal) + 1000)}}><p>1000</p></button>
                        <button className="btnApagar -right-2 translate-x-full" title="Apagar" onClick={() => {addAposta(0)}}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className="flex absolute right-5 gap-3">
                    <Link to='/transacoes' className="flex justify-center items-center flex-col py-2 px-6 bg-black/50 
                    border-2 border-zinc-700 rounded-full transition-all duration-200 hover:brightness-[.7]"
                    >
                        <h1 className="text-base text-white">Ir Para Depósito</h1>
                    </Link>
                </div>
            </div>
            <div className="gridDados grid grid-cols-2 grid-rows-2 w-70 h-70 mt-5 gap-2 p-2">
                <div className="espaco text-blue-700">
                    <i className={`fa-solid fa-dice-${dado1} ${isSpinningDado1 ? 'diceAnim' : ''}`}></i>
                </div>
                <div className="espaco text-red-600">
                    <i className={`fa-solid fa-dice-${dado2} ${isSpinningDado2 ? 'diceAnim' : ''}`}></i>
                </div>
                <div className="espaco text-blue-700">
                    <i className={`fa-solid fa-dice-${dado3} ${isSpinningDado3 ? 'diceAnim' : ''}`}></i>
                </div>
                <div className="espaco text-red-600">
                    <i className={`fa-solid fa-dice-${dado4} ${isSpinningDado4 ? 'diceAnim' : ''}`}></i>
                </div>
            </div>
        </main>
    )
}

export default BacBo