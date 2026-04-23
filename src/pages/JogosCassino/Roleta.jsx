import { useState } from "react"
import RoletaCassino from "../../components/RoletaCassino"
import SaldoCassino from "../../components/SaldoCassino"
import SetaVoltar from "../../components/SetaVoltar"

function Roleta() {
    const [saldo, setSaldo] = useState(localStorage.getItem('saldo') || 0)
    const [inputValue, setInputValue] = useState('')
    const [isSpinning, setIsSpinning] = useState(false)
    const [angulo, setAngulo] = useState(0)
    const cores = [
      "Verde",
      "Vermelho",
      "Preto",
      "Vermelho",
      "Preto",
      "Vermelho",
      "Preto",
      "Vermelho",
      "Preto",
      "Vermelho"
    ]
    const girar = (odd, selectedColor) => {
      if (Number(inputValue) <= 0) return alert('Digite um valor válido') 
      if (Number(inputValue) > Number(saldo)) return alert('Saldo indisponível') 
      if (isSpinning) return

      setIsSpinning(true)

      const giro = Math.floor(Math.random() * 360) + 1440
      const novoAngulo = angulo + giro

      setAngulo(novoAngulo)

      localStorage.setItem('saldo', Number(saldo) - Number(inputValue))
      setSaldo(Number(saldo) - Number(inputValue))

      setTimeout(() => {
        const anguloFinal = novoAngulo % 360
        const tamanhoSetor = 360 / cores.length

        const index = Math.floor((360 - anguloFinal) / tamanhoSetor) % cores.length

        console.log("Resultado:", cores[index])

        let ganhou = "Perdeu"
        if (cores[index] == selectedColor) {
            let newSaldo = 0
            newSaldo = (Number(saldo) - Number(inputValue)) + (Number(inputValue) * odd)
            localStorage.setItem('saldo', newSaldo)
            setSaldo(newSaldo)
            ganhou = "Ganhou"
        }
        
        salvarAposta(inputValue, 'Roleta', selectedColor, ganhou)
        setIsSpinning(false)
      }, 3000)
    }
    const salvarAposta = (valorApostado, jogo, aposta, ganhou) => {
        const data = new Date().toLocaleDateString('pt-BR');
        const hora = new Date().toLocaleTimeString('pt-BR');
        const historicoApostas = JSON.parse(localStorage.getItem('historicoApostas')) || []
        const apostaSalvar = {
            "valor": "R$ " + Number(valorApostado).toFixed(2).replace('.', ','),
            "jogo": jogo,
            "aposta": aposta,
            "status": ganhou,
            "data": (`${data} ` + hora)
        }
        historicoApostas.push(apostaSalvar)
        localStorage.setItem('historicoApostas', JSON.stringify(historicoApostas))
    }
    return (
        <main className="mainRoleta flex justify-center items-center flex-col h-screen gap-5">
            <SetaVoltar to='/cassino' />
            <SaldoCassino value={`R$ ${Number(saldo).toFixed(2).replace('.', ',')}`} />
            <span className="flex justify-center relative">
                <div className="pointer absolute w-0 h-0 border-x-15 border-b-30 border-x-transparent border-b-white rotate-180 -translate-y-4 z-99"></div>
                <RoletaCassino angulo={angulo} />
            </span>
            <div className="flex flex-col p-3 gap-3 bg-white rounded-lg">
                <input 
                    type="number" 
                    placeholder="Valor da Aposta" 
                    className="p-3 border-2 border-gray-300 rounded-md transition-all duration-200 
                    focus:placeholder:text-green-600 focus:border-green-600"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                />
                <span className="flex gap-2">
                    <button 
                        className="btn bg-red-500"
                        onClick={() => {
                            girar(1.8, 'Vermelho')
                        }}
                        disabled={isSpinning}
                    >Vermelho 1.8x</button>
                    <button 
                        className="btn bg-black"
                        onClick={() => {
                            girar(2, 'Preto')
                        }}
                        disabled={isSpinning}
                    >Preto 2x</button>
                    <button 
                        className="btn bg-green-500"
                        onClick={() => {
                            girar(5, 'Verde')
                        }}
                        disabled={isSpinning}
                    >Verde 5x</button>
                </span>
            </div>
        </main>
    )
}

export default Roleta