import { useState } from "react"
import SetaVoltar from "../../components/SetaVoltar"
import Modal from "../../components/Modal"
import SaldoCassino from "../../components/SaldoCassino"

function CacaNiquel() {
    const [saldo, setSaldo] = useState(Number(localStorage.getItem('saldo')) || 0)
    const [inputValue, setInputValue] = useState('')

    const [simbolo1, setSimbolo1] = useState('🍀')
    const [simbolo2, setSimbolo2] = useState('🍀')
    const [simbolo3, setSimbolo3] = useState('🍀')
    const [alavancaAngle, setAlavancaAngle] = useState(25)
    
    const [rodadasBonus, setRodadasBonus] = useState(0)
    const [isInBonus, setIsInBonus] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [girando, setGirando] = useState(false)

    const sNormal = [
        "🍒","🍒","🍒","🍒","🍒","🍒",
        "🍍","🍍","🍍","🍍","🍍","🍍",
        "🍇","🍇","🍇","🍇","🍇","🍇",
        "💎","💎","💎","💎",
        "👑","👑","👑",
        "7️⃣","7️⃣"
    ]
    const sBonus = [        
        "💎","💎","💎","💎",
        "👑","👑","👑",
        "7️⃣","7️⃣"
    ]

    const [simbolos, setSimbolos] = useState(sNormal)

    const [simbolosInfos] = useState([
        { icon: "🍒", multiplicador: 2, chance: "6/27" },
        { icon: "🍍", multiplicador: 2, chance: "6/27" },
        { icon: "🍇", multiplicador: 2, chance: "6/27" },
        { icon: "💎", multiplicador: 20, chance: "4/27" },
        { icon: "👑", multiplicador: 30, chance: "3/27" },
        { icon: "7️⃣", multiplicador: 40, chance: "2/27" }
    ])

    const getMultiplier = (icon) => {
        if (icon === '7️⃣') return 40
        if (icon === '👑') return 30
        if (icon === '💎') return 20
        return 2
    }

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

    const finalizarResultado = (s1, s2, s3) => {
        let newSaldo = Number(saldo) - Number(inputValue)
        let giro = "Giro"
        let ganhou = "Perdeu"

        if (isInBonus) {
            newSaldo = Number(saldo)
            giro = "Giro Bônus"
        }

        if (s1 === s2 && s2 === s3) {
            newSaldo += Number(inputValue) * getMultiplier(s1)
            ganhou = "Ganhou"
        }
        else if (s1 === s2 || s1 === s3 || s2 === s3) {
            const igual = s1 === s2 ? s1 : s1 === s3 ? s1 : s2
            
            newSaldo += (Number(inputValue) * getMultiplier(igual) / 2)
            ganhou = "Ganhou"
        }
        
        salvarSaldo(newSaldo)
        salvarAposta(inputValue, 'Caça Níquel', giro, ganhou)
    }

    const apostar = () => {
        if (girando) return

        if (isInBonus) {
            setRodadasBonus(rodadasBonus - 1)
            if (rodadasBonus <= 1) {
                setIsInBonus(false)
                setSimbolos(sNormal)
            }
        }
        else {
            if (Number(inputValue) <= 0) return alert('Digite valor válido')
            if (Number(inputValue) > Number(saldo)) return alert('Saldo indisponível')
        }

        setGirando(true)
        setAlavancaAngle(75)

        let contador = 0
        const maxGiros = 20

        const interval = setInterval(() => {
            const s1 = simbolos[Math.floor(Math.random() * simbolos.length)]
            const s2 = simbolos[Math.floor(Math.random() * simbolos.length)]
            const s3 = simbolos[Math.floor(Math.random() * simbolos.length)]

            setSimbolo1(s1)
            setSimbolo2(s2)
            setSimbolo3(s3)

            contador++

            if (contador >= maxGiros) {
                clearInterval(interval)
                finalizarResultado(s1, s2, s3)
                setGirando(false)
                setAlavancaAngle(25)
            }
        }, 50)
    }
    const entrarBonus = () => {
        if(Number(inputValue) <= 0) return alert('Digite um valor válido')
        if (Number(inputValue) > Number(saldo)) return alert('Saldo indisponível')
        if (isInBonus) return alert('Já está em um bônus')

        let newSaldo = Number(saldo) - (Number(inputValue) * 100)

        salvarSaldo(newSaldo)
        setRodadasBonus(10)
        setSimbolos(sBonus)
        setIsInBonus(true)
        setSimbolo1('🎰')
        setSimbolo2('🎰')
        setSimbolo3('🎰')
        alert('Bônus comprado, 10 rodadas grátis')
    }

    return (
        <main className="mainCacaNiquel flex justify-center items-center h-screen overflow-hidden">

            <SetaVoltar to="/cassino" />
            <SaldoCassino value={`R$ ${Number(saldo).toFixed(2).replace('.', ',')}`} />

            <div className="flex items-center h-100 p-3">

                <div className="flex flex-col items-center h-full p-5 gap-5 bg-amber-400 border-6 border-amber-500 rounded-3xl z-10">
                    <div className="flex h-[30%] w-full p-2 gap-2 bg-zinc-800 text-3xl justify-center">
                        <span className="slot">{simbolo1}</span>
                        <span className="slot">{simbolo2}</span>
                        <span className="slot">{simbolo3}</span>
                    </div>
                    <input
                        type="number"
                        placeholder="Valor Aposta"
                        className="w-full p-3 bg-white border-4 border-zinc-800 rounded-lg"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value) < 0 ? 0 : e.target.value)}
                        disabled={isInBonus}
                    />
                    <div className="flex justify-center items-center flex-col flex-1 w-full gap-3 rounded-lg">
                        <button 
                            className="p-3 bg-zinc-800 text-white rounded-lg cursor-pointer 
                                transition-all duration-200 hover:brightness-[.8]"
                            onClick={entrarBonus}
                        >Comprar Bônus</button>
                        <h1 className="text-zinc-900">R$ {(Number(inputValue) * 100).toFixed(2).replace('.', ',')}</h1>
                        <h1 className={`${isInBonus ? 'flex' : 'hidden'}`}>{isInBonus ? rodadasBonus : ''} Rodadas Grátis</h1>
                    </div>
                </div>

                <div className={`flex justify-center items-center flex-col h-full w-10 transition-all duration-150`}
                style={{transform: `rotateZ(${alavancaAngle}deg)`}}>
                    <button 
                        className="w-full bg-red-500 aspect-square rounded-full cursor-pointer translate-y-2" 
                        onClick={apostar}
                    ></button>
                    <div className="w-[20%] h-[40%] bg-zinc-500"></div>
                </div>

                <div className="flex items-end h-full">
                    <button
                        className="text-4xl text-white cursor-pointer transition-all duration-200 hover:brightness-[.8]"
                        onClick={() => setModalStatus(!modalStatus)}
                        >
                        <i className="fa-solid fa-circle-info"></i>
                    </button>
                </div>

            </div>

            {modalStatus && (
                <Modal
                    onClick={() => setModalStatus(false)}
                    content={
                        simbolosInfos.map((s, i) => (
                            <span key={i} className="flex items-center p-5 gap-5 bg-white/50 text-white rounded-xl">
                                <h1>{s.icon}</h1>
                                <h2>{s.multiplicador}X</h2>
                                <h2>{s.chance}</h2>
                            </span>
                        ))
                    }
                />
            )}

        </main>
    )
}

export default CacaNiquel