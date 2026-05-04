function salvarSaldo(saldo, setSaldo) {
    const saldoFormatado = saldo.toFixed(2)

    localStorage.setItem('saldo', saldo.toFixed(2))
    setSaldo(Number(saldoFormatado))
}
export default salvarSaldo