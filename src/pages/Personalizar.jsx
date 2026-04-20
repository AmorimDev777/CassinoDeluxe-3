import { useEffect } from "react"

function Personalizar() {
    const isLogadoStorage = localStorage.getItem('logado') || 'Não'
    useEffect(() => {
        if (isLogadoStorage === 'Não') {
            document.location.href = '/'
        }
    })
    return (
        <h1 className="text-white">Personalizar</h1>
    )
}

export default Personalizar