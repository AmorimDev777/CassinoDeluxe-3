function salvarAposta(valorApostado, jogo, aposta, status) {
    const data = new Date().toLocaleDateString('pt-BR')
    const hora = new Date().toLocaleTimeString('pt-BR')
    
    const historico = JSON.parse(localStorage.getItem('historicoApostas')) || []
    
    historico.push({
        valor: "R$ " + Number(valorApostado).toFixed(2).replace('.', ','),
        jogo,
        aposta,
        status,
        data: `${data} ${hora}`
    })

    localStorage.setItem('historicoApostas', JSON.stringify(historico))
}

export default salvarAposta