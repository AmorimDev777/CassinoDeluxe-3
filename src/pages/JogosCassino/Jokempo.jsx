import { useState } from "react"
import SetaVoltar from "../../components/SetaVoltar"
import SaldoCassino from "../../components/SaldoCassino"
import Modal from "../../components/Modal"

function Jokempo() {
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [inputValue, setInputValue] = useState('')

    const [simbolo, setSimbolo] = useState('✊')
    const [simboloMaq, setSimboloMaq] = useState('✊')
    const [simboloEscolhido, setSimboloEscolhido] = useState('✊')
    const [simboloAngle, setSimboloAngle] = useState(90)

    const [modalStatus, setModalStatus] = useState(false)
    const [jogando, setJogando] = useState(false)

    const simbolos = ['✊','✋','✌']

    const salvarSaldo = (num) => {
        localStorage.setItem('saldo', num.toFixed(2))
        setSaldo(num.toFixed(2))
    }
    const salvarAposta = (valorApostado, jogo, aposta, ganhou) => {
        const data = new Date().toLocaleDateString('pt-BR')
        const hora = new Date().toLocaleTimeString('pt-BR')

        const historico = JSON.parse(localStorage.getItem('historicoApostas')) || []

        historico.push({
            valor: "R$ " + Number(valorApostado).toFixed(2).replace('.', ','),
            jogo,
            aposta,
            status: ganhou,
            data: `${data} ${hora}`
        })

        localStorage.setItem('historicoApostas', JSON.stringify(historico))
    }
    const apostar = () => {
        if (jogando) return console.log('Espere...')
        if (Number(inputValue) <= 0) return alert('Digite valor válido')
        if (Number(inputValue) > Number(saldo)) return alert('Saldo indisponível')

        setJogando(true)
        setSimbolo('✊')
        setSimboloMaq('✊')
        let simboloTop = false
        let contador = 0
        const maxGiros = 9
        const sMaq = simbolos[Math.floor(Math.random() * simbolos.length)]
        const interval = setInterval(() => {

            contador++

            simboloTop = !simboloTop

            if (simboloTop) {
                setSimboloAngle(70)
            }
            else {
                setSimboloAngle(110)
            }
            if (contador >= maxGiros) {
                let ganhou = 'Perdeu'
                let jogada = ''
                let newSaldo = Number(saldo) - Number(inputValue)

                clearInterval(interval)
                setJogando(false)
                setSimbolo(simboloEscolhido)
                setSimboloMaq(sMaq)
                setSimboloAngle(90)

                if (simboloEscolhido === sMaq) {
                    if (simboloEscolhido === '✊') jogada = 'Pedra'
                    if (simboloEscolhido === '✋') jogada = 'Papel'
                    if (simboloEscolhido === '✌') jogada = 'Tesoura'
                    newSaldo = Number(saldo)
                    ganhou = 'Empate'
                    console.log('Empate')
                }
                if (simboloEscolhido === '✊') {
                    jogada = 'Pedra'
                    if (sMaq === '✋') console.log('Máquina Venceu')
                    if (sMaq === '✌') {
                        newSaldo = Number(saldo) + Number(inputValue)
                        ganhou = 'Ganhou'
                        console.log('Você Venceu')
                    }
                }
                if (simboloEscolhido === '✋') {
                    jogada = 'Papel'
                    if (sMaq === '✌') console.log('Máquina Venceu')
                    if (sMaq === '✊') {
                        newSaldo = Number(saldo) + Number(inputValue)
                        ganhou = 'Ganhou'
                        console.log('Você Venceu')
                    }
                }
                if (simboloEscolhido === '✌') {
                    jogada = 'Tesoura'
                    if (sMaq === '✊') console.log('Máquina Venceu')
                    if (sMaq === '✋') {
                        newSaldo = Number(saldo) + Number(inputValue)
                        ganhou = 'Ganhou'
                        console.log('Você Venceu')
                    }
                }
                salvarSaldo(newSaldo)
                salvarAposta(inputValue, 'Jokempo', jogada, ganhou)
            }
        }, 200)
    }
    return (
        <main className="mainJokempo flex justify-center items-center flex-col h-screen gap-10">
            <SetaVoltar to='/cassino' />
            <SaldoCassino value={`R$ ${Number(saldo).toFixed(2).replace('.', ',')}`} />
            <div className="flex gap-20">
                <div 
                    className="text-8xl transition-all scale-x-[-1]" 
                    style={{transform: `rotateZ(-${simboloAngle}deg)`}}
                >{simbolo}</div>
                <div 
                    className="text-8xl transition-all" 
                    style={{transform: `rotateZ(-${simboloAngle}deg)`}}
                >{simboloMaq}</div>
            </div>
            <div className="flex justify-center items-center flex-col relative p-4 gap-2 bg-white rounded-xl">
                <input 
                    type="number" 
                    placeholder="Valor da Aposta" 
                    className="p-3 border-2 border-gray-300 rounded-md transition-all duration-200 
                    focus:placeholder:text-green-600 focus:border-green-600"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(Number(e.target.value) < 0 ? 0 : e.target.value)
                    }}
                />
                <span className="flex w-full">
                    <button 
                    className={`btnEscolha ${simboloEscolhido === '✊' ? 'bg-zinc-300' : ''}`} 
                    onClick={() => { setSimboloEscolhido('✊') }}
                    >✊</button>

                    <button 
                    className={`btnEscolha ${simboloEscolhido === '✋' ? 'bg-zinc-300' : ''}`}
                    onClick={() => { setSimboloEscolhido('✋') }}
                    >✋</button>

                    <button 
                    className={`btnEscolha ${simboloEscolhido === '✌' ? 'bg-zinc-300' : ''}`}
                    onClick={() => { setSimboloEscolhido('✌') }}
                    >✌</button>
                </span>
                <button 
                    className="w-full p-3 bg-zinc-900 text-white rounded-md cursor-pointer transition-all
                    duration-200 hover:brightness-[.6]"
                    onClick={apostar}
                >Apostar</button>
                <button
                    className="absolute bottom-0 right-0 translate-x-[calc(100%+20px)] text-4xl text-white cursor-pointer transition-all duration-200 hover:brightness-[.8]"
                    onClick={() => setModalStatus(!modalStatus)}
                    >
                    <i className="fa-solid fa-circle-info"></i>
                </button>
            </div>
            {modalStatus && (
                <Modal
                    onClick={() => setModalStatus(false)}
                    content={
                        <>
                            <h1 className="info">✊ - 2X</h1>
                            <h1 className="info">✋ - 2X</h1>
                            <h1 className="info">✌ - 2X</h1>
                        </>
                    }
                />
            )}
        </main>
    )
}

export default Jokempo