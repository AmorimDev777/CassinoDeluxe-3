    function CardHistoricoApostas({aposta}) {
    return (
        <div className="p-3 bg-white shadow-lg shadow-black rounded-xl">
            <h1>{aposta.valor}</h1>
            <h1>{aposta.jogo}</h1>
            <h1>{aposta.aposta}</h1>
            <h1>{aposta.status}</h1>
            <h1>{aposta.data}</h1>
        </div>
    )
}

export default CardHistoricoApostas