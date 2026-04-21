import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SetaVoltar from "../components/SetaVoltar"

function Configuracoes() {
    const [favSport, setFavSport] = useState(localStorage.getItem('favoriteSport') || 'Futebol')
    const [esportes, setEsportes] = useState([])
    
    useEffect(() => {
        console.log('Sport atualizado:', favSport)
    }, [favSport])
    
    useEffect(() => {
        fetch('/db/db.json')
            .then(response => response.json())
            .then(data => setEsportes(data.esportes))
            .catch(error => console.error('Erro ao buscar esportes:', error))
    }, [])
    
    const changeFavoriteSport = (sport) => {
        localStorage.setItem('favoriteSport', sport)
        setFavSport(sport)
    }
    return (
        <>
            <SetaVoltar to='/' />
            <h1 className="text-3xl text-center text-white my-10">Esporte Favorito</h1>
            <div className="flex justify-center items-center flex-wrap w-[70vw] m-auto gap-3">
                {esportes.map((esporte) => (
                    <button 
                        key={esporte.id} 
                        className={`flex justify-center items-center h-20 aspect-square rounded-full p-5 bg-black border-3 text-3xl ${favSport === esporte.nome ? 'text-red-600 border-red-500' : 'text-white border-white'} transition-all duration-300 cursor-pointer hover:text-amber-400 hover:border-amber-400`}
                        onClick={() => {changeFavoriteSport(esporte.nome)}}
                    >
                        <i className={`fa-solid fa-${esporte.icon}`}></i>
                    </button>
                ))}
            </div>
        </>
    )
}

export default Configuracoes