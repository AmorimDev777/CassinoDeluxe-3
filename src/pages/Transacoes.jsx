import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/Logo.png"
import ButtonTransacoes from "../components/ButtonTransacoes"
import InTransacoesPage from "../components/InTransacoesPage"
import InHistoricoPage from '../components/InHistoricoPage'
import InHistoricoPage2 from '../components/InHistoricoPage2'

function Transacoes() {
    const [inputValue, setInputValue] = useState('')
    const [selectedOption, setselectedOption] = useState('')
    const [saldoStorageState, setSaldoStorageState] = useState(localStorage.getItem('saldo'))
    const [selectedPage, setSelectedPage] = useState('deposito')
    const depositar = () => {
        const saldoStorage = Number(localStorage.getItem('saldo'))
        let novoSaldo = (saldoStorage + Number(inputValue)).toFixed(2)
        if (Number(inputValue) <= 0) return alert('Valor Inválido')
        if (novoSaldo > 999999) {
            novoSaldo = 999999
            alert('Limite alcançado')
        }
        localStorage.setItem('saldo', novoSaldo)
        setSaldoStorageState(novoSaldo)
        salvarTransacao(inputValue, "Depósito")
        setInputValue('')
    }
    const sacar = () => {
        const saldoStorage = Number(localStorage.getItem('saldo'))
        if (inputValue <= 0) return alert('Valor Inválido')
        if (saldoStorage < inputValue) return alert('Saldo Indisponível')
        localStorage.setItem('saldo', saldoStorage - inputValue)
        setSaldoStorageState(saldoStorage - Number(inputValue))
        salvarTransacao(inputValue, "Saque")
        setInputValue('')
    }
    const salvarTransacao = (valor, tipo) => {
        const data = new Date().toLocaleDateString('pt-BR');
        const hora = new Date().toLocaleTimeString('pt-BR');
        const historicoTransacao = JSON.parse(localStorage.getItem('historico'+tipo)) || []
        const transacaoSalvar = {
            "valor": "R$ " + Number(valor).toFixed(2).replace('.', ','),
            "tipo": tipo,
            "data": (`${data} ` + hora)
        }
        historicoTransacao.push(transacaoSalvar)
        localStorage.setItem('historico'+tipo, JSON.stringify(historicoTransacao))
    }
    const renderContent = () => {
        switch (selectedPage) {
            case 'deposito':
                return (
                    <InTransacoesPage
                        tipo="Depositar" 
                        saldoStorage={saldoStorageState}
                        inputValue={inputValue}
                        onChange={(e) => {
                            let value = e.target.value
                            if (Number(value) > 999999) value = '999999'
                            setInputValue(value)
                        }}
                        onClick={() => {depositar()}}
                        onClickBtn50={() => setInputValue(Number(inputValue) + 50)}
                        onClickBtn200={() => setInputValue(Number(inputValue) + 200)}
                        onClickBtn500={() => setInputValue(Number(inputValue) + 500)}
                    />
                )

            case 'saque':
                return (
                    <InTransacoesPage
                        tipo="Sacar" 
                        saldoStorage={saldoStorageState}
                        inputValue={inputValue}
                        onChange={(e) => {
                            let value = e.target.value
                            if (Number(value) > 999999) {value = '999999'}
                            setInputValue(value)
                        }}
                        onClick={() => {sacar()}}
                        onClickBtn50={() => setInputValue(Number(inputValue) + 50)}
                        onClickBtn200={() => setInputValue(Number(inputValue) + 200)}
                        onClickBtn500={() => setInputValue(Number(inputValue) + 500)}
                    />
                )

            case 'historicoDeposito':
                return (
                    <InHistoricoPage2
                        whatHistorico="Depósito"
                    />
                )

            case 'historicoSaque':
                return (
                    <InHistoricoPage2
                        whatHistorico="Saque"
                    />
                )

            case 'historicoApostas':
                return (
                    <InHistoricoPage
                        whatHistorico="Apostas"
                    />
                )

            default:
                return <h1>sobrou</h1>
        }
    }
    return (
        <main className="mainTransacoes flex h-screen w-screen p-5 gap-5">
            <div className="customScroll flex items-center flex-col h-full w-[250px] p-3 gap-3 bg-white rounded-2xl overflow-auto">
                <span className="w-[80%]">
                    <img src={Logo} alt="" className="transition-all duration-200 hover:scale-[1.1]" onClick={() => {setselectedOption('')}}/>
                </span>
                <div className="boxNavbar">
                    <span 
                        className={`dropdown
                            ${(selectedOption === 'Transações' ? 'bg-amber-400 text-white' : 'hover:bg-gray-200')}`}
                        onClick={() => {
                            selectedOption === 'Transações'
                            ? setselectedOption('')
                            : setselectedOption('Transações')
                        }}
                    >
                        <i className="fa-solid fa-credit-card"></i>
                        Transações
                        <i className={`fa-solid fa-angle-down transiton-all duration-200 ${(selectedOption === 'Transações' ? 'rotate-180' : '')}`}></i>
                    </span>
                    <ButtonTransacoes
                        selectedOption={selectedOption}
                        tipoOpcao={'Transações'}
                        value={'Depósito'} 
                        onClick={() => {setSelectedPage('deposito')}}
                    />
                    <ButtonTransacoes
                        selectedOption={selectedOption}
                        tipoOpcao={'Transações'}
                        value={'Saque'} 
                        onClick={() => {setSelectedPage('saque')}}
                    />
                </div>
                <div className="boxNavbar">
                    <span
                        className={`dropdown
                            ${(selectedOption === 'Histórico' ? 'bg-amber-400 text-white' : 'hover:bg-gray-200')}`}
                            onClick={() => {
                                selectedOption === 'Histórico'
                                ? setselectedOption('')
                                : setselectedOption('Histórico')
                            }}
                            >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        Histórico
                        <i className={`fa-solid fa-angle-down transiton-all duration-200 ${(selectedOption === 'Histórico' ? 'rotate-180' : '')}`}></i>
                    </span>
                    <ButtonTransacoes
                        selectedOption={selectedOption}
                        tipoOpcao={'Histórico'}
                        value={'Depósitos'} 
                        onClick={() => {setSelectedPage('historicoDeposito')}}
                    />
                    <ButtonTransacoes
                        selectedOption={selectedOption}
                        tipoOpcao={'Histórico'}
                        value={'Saques'} 
                        onClick={() => {setSelectedPage('historicoSaque')}}
                    />
                    <ButtonTransacoes
                        selectedOption={selectedOption}
                        tipoOpcao={'Histórico'}
                        value={'Apostas'} 
                        onClick={() => {setSelectedPage('historicoApostas')}}
                    />
                </div>
                <Link to="/" className="flex justify-center items-center w-full p-3 gap-2 rounded-full transition-all duration-200 hover:bg-gray-200">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Voltar Home
                </Link>
            </div>
            <div className="flex justify-center items-center flex-col relative flex-1 p-10 gap-5 bg-white rounded-2xl">
                {renderContent()}
            </div>
        </main>
    )
}

export default Transacoes