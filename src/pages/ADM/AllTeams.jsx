import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Loading from "../../components/Loading"

function AllTeams() {
    const [isLoading, setIsLoading] = useState(true)
    const [times, setTimes] = useState([])
    const [esportes, setEsportes] = useState([])

    const selecionarEsportes = (lista) => {
        const esportesSelecionados = {}

        lista.forEach(time => {
            if (!esportesSelecionados[time.esporte]) {
                esportesSelecionados[time.esporte] = []
            }
            esportesSelecionados[time.esporte].push(time)
        })

        return esportesSelecionados
    }

    const [openGroups, setOpenGroups] = useState({})

    useEffect(() => {
        const getDados = async () => {
            try {
                const response = await axios.get("/db/db.json")

                setTimes(response.data.times)
                setEsportes(selecionarEsportes(response.data.times))
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
                            {e} - {esportes[e].length} Times
                            <i
                                className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} cursor-pointer`}
                                onClick={() => toggleGroup(e)}
                            ></i>
                        </h1>
                        <div className={`customScroll grid justify-start items-start grid-cols-10 w-full py-3 gap-3 scroll-smooth`}
                        >
                            {isOpen
                                ? esportes[e].map((t, i) => (
                                      <Link
                                          key={i}
                                          to={`/detalhes/time?time=${t.nome}&esporte=${t.esporte}`}
                                          className="flex justify-center items-center flex-col relative p-6 bg-zinc-800 
                                          aspect-square rounded-3xl transition-all duration-300 hover:scale-[1.05]
                                        hover:bg-zinc-700 group"
                                          title={t.id}
                                      >
                                          <img
                                              src={t.escudo}
                                              alt=""
                                              className="h-full aspect-square object-contain"
                                          />
                                          <p className="hidden absolute bottom-0 text-white group-hover:flex">{t.id}</p>
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
export default AllTeams