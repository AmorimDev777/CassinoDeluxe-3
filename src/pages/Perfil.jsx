import { useEffect } from "react"

function Perfil() {
    const isLogadoStorage = localStorage.getItem('logado') || 'Não'
    useEffect(() => {
        if (isLogadoStorage === 'Não') {
            document.location.href = '/'
        }
    })
    return (
        <h1 className="text-white">Perfil</h1>
    )
}

export default Perfil