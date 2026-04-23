import { useRef, useState, useEffect } from "react"
import axios from "axios";
import SetaVoltar from "../components/SetaVoltar"

function Sobre() {
    const [dadosTimes, setDadosTimes] = useState([]);
    const [dadosProvedoras, setDadosProvedoras] = useState([]);
    useEffect(() => {
        axios.get("/db/db.json")
        .then((response) => {
            setDadosTimes(response.data.times);
            setDadosProvedoras(response.data.provedoras)
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);
    console.log(dadosTimes)
    console.log(dadosProvedoras)

    const scrollRef = useRef(null)
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -150,
            behavior: "smooth"
        })
    }
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 150,
            behavior: "smooth"
        })
    }
    return (
        <main className="mainSobre flex flex-col gap-[2vh]">
            <SetaVoltar to="/" />
            <div className="divPatrocinios flex items-center h-[20vh] w-full">
                <span className="flex justify-center items-center flex-col w-[20vw]">
                    <h1 className="text-center text-white">Patrocinador Oficial</h1>
                    <h2 className="text-center text-zinc-200">Apoiamos o esporte</h2>
                </span>
                <div
                  ref={scrollRef}
                  className="customScroll flex items-center flex-1 relative h-full py-3 mx-10 overflow-x-auto"
                >
                    {dadosTimes.map((time, id) => {
                        if (time.patrocinado !== true) return
                        return <img src={time.escudo} alt="" key={id} className="h-full p-2 z-2"/>
                    })}
                    <button onClick={scrollLeft} className="btnScroll left-[calc(20vw+10px)]">
                      <i className="fa-solid fa-angle-left"></i>
                    </button>

                    <button onClick={scrollRight} className="btnScroll right-[10px]">
                      <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="divProvedoras flex items-center h-[20vh] w-full">
                <span className="flex justify-center items-center flex-col w-[20vw]">
                    <h1 className="text-center text-white">Provedoras Oficiais</h1>
                    <h2 className="text-center text-zinc-200">As melhores</h2>
                </span>
                <div className="customScroll flex items-center flex-1 relative h-full mx-10 overflow-x-auto">
                    {dadosProvedoras.map((provedora, id) => (
                        <span key={id} className="flex justify-center items-center flex-col relative h-full aspect-[2/1.6]">
                            <img src={provedora.logo} alt="" className="h-[80%]"/>
                            <h1 className="absolute bottom-3 text-white">{provedora.nome}</h1>
                        </span>
                    ))}
                </div>
            </div>
            <div className="divSobre flex h-[56vh] px-7 gap-7">
                <div className="flex justify-center items-center flex-col h-full w-full">
                    <h1 className="text-center text-3xl text-white">Sobre Nós</h1>
                    <p className="text-center text-zinc-300">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat facilis odio adipisci,
                        blanditiis perspiciatis fugiat, quam et eum hic mollitia nobis autem ab tempore. Numquam
                        voluptatum commodi minus! Dicta, dolorem?Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Error eum, minus aspernatur excepturi sint illo iste saepe adipisci consequuntur
                        repellendus officia est odio culpa autem, nesciunt ullam consequatur modi repudiandae!</p>
                </div>
                <div className="flex justify-center items-center flex-col h-full w-full gap-5">
                    <h1 className="text-center text-3xl text-white">Métodos de Pagamento</h1>
                    <span className="flex justify-between w-full h-20 px-4 gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Pix_%28Brazil%29_logo.svg" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Banco-central-do-brasil-logo.png" alt="" />
                    </span>
                    <h1 className="text-center text-3xl text-white">Redes Sociais</h1>
                    <span className="flex justify-center items-center w-full gap-10">
                        <a href="https://www.facebook.com/?locale=pt_BR" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://x.com/?lang=pt" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="https://www.instagram.com" className="icon"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://www.tiktok.com/@vikitecc/video/7287697193694301446" className="icon"><i className="fa-brands fa-tiktok"></i></a>
                    </span>
                </div>
            </div>
        </main>
    )
}

export default Sobre