import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Loading from "../../components/Loading"

function AllChampionships() {
    const [isLoading, setIsLoading] = useState(true)
    const [campeonatos, setCampeonatos] = useState([])
    const [esportes, setEsportes] = useState([])

    const selecionarEsportes = (lista) => {
        const esportesSelecionados = {}

        lista.forEach(campeonato => {
            if (!esportesSelecionados[campeonato.esporte]) {
                esportesSelecionados[campeonato.esporte] = []
            }
            esportesSelecionados[campeonato.esporte].push(campeonato)
        })

        return esportesSelecionados
    }

    const [openGroups, setOpenGroups] = useState({})

    useEffect(() => {
        const getDados = async () => {
            try {
                const response = await axios.get("/db/db.json")

                setCampeonatos(response.data.campeonatos)
                setEsportes(selecionarEsportes(response.data.campeonatos))
            } catch (error) {
                console.error("Erro no fetch:", error.message)
            } finally {
                setIsLoading(false)
            }
        }
    
        getDados()
    }, [])

    const toggleGroup = (key) => {
        setOpenGroups((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <main className="mainAllTeams customScroll flex flex-col max-w-screen p-5 gap-2">
            {Object.keys(esportes).map((e) => {
                const isOpen = openGroups[e] ?? true
                return (
                    <div key={e}>
                        <h1 className="flex items-center w-full gap-2 text-start text-2xl text-white">
                            {e} - {esportes[e].length} Campeonatos
                            <i
                                className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} cursor-pointer`}
                                onClick={() => toggleGroup(e)}
                            ></i>
                        </h1>
                        <div className={`customScroll grid justify-start items-start grid-cols-10 w-full py-3 gap-3 scroll-smooth`}
                        >
                            {isOpen
                                ? esportes[e].map((c, i) => (
                                      <Link
                                          key={i}
                                          to={`/detalhes/campeonato?campeonato=${c.id}`}
                                          className="flex justify-center items-center flex-col relative p-6 bg-zinc-800 
                                          aspect-square rounded-3xl transition-all duration-300 hover:scale-[1.05]
                                        hover:bg-zinc-700 group"
                                          title={c.id}
                                      >
                                          <img
                                              src={c.logo}
                                              alt=""
                                              className="h-full aspect-square object-contain"
                                          />
                                          <p className="hidden absolute bottom-0 text-white group-hover:flex">{c.id}</p>
                                      </Link>
                                  ))
                                : ''}
                        </div>
                    </div>
                )
            })}
        </main>
    )
}

export default AllChampionships