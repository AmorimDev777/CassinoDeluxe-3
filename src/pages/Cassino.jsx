import { Link } from "react-router-dom"
import CardCassino from "../components/CardCassino"
import ImgCacaNiquel from "../assets/CardsCassino/CaçaNiquel.jpg"
import ImgJokempo from "../assets/CardsCassino/Jokempo.png"
import ImgRoleta from "../assets/CardsCassino/Roleta.jpg"
import ImgFruitBonanza from "../assets/CardsCassino/FruitBonanza.png"
import ImgBacBo from "../assets/CardsCassino/BacBo.jpg"

function Cassino() {
    const saldoStorage = localStorage.getItem('saldo')
    const jogos = [
        {
            nome: "Caça Níquel",
            url: "cacaniquel",
            img: ImgCacaNiquel
        },
        {
            nome: "Jokempo",
            url: "jokempo",
            img: ImgJokempo
        },
        {
            nome: "Roleta",
            url: "roleta",
            img: ImgRoleta
        },
        {
            nome: "Fruit Bonanza",
            url: "fruitbonanza",
            img: ImgFruitBonanza
        },
        {
            nome: "Bac Bo",
            url: "bacbo",
            img: ImgBacBo
        }
    ]
    return (
        <>
            <div className="flex justify-between items-center w-full px-5 py-3 gap-5 min-[500px]:px-10">
                <span className="flex items-center gap-5">
                    <Link to={"/"}><i className="fa-solid fa-house text-lg text-white transition-all duration-300 hover:text-amber-400 min-[500px]:text-2xl"></i></Link>
                    <h1 className="text-xl min-[500px]:text-3xl text-white">Cassino</h1>
                </span>
                <span className="flex items-center gap-5">
                    <h1 className="text-sm text-white min-[500px]:text-xl">R$ {Number(saldoStorage).toFixed(2).replace('.', ',')}</h1>
                    <Link to={"/configuracoes"}><i className="fa-solid fa-gear text-lg text-white transition-all duration-300 hover:text-amber-400 min-[500px]:text-2xl"></i></Link>
                </span>
            </div>
            <div className="grid justify-start items-start p-3 pb-7 gap-y-10 gap-x-3
            grid-cols-1 min-[410px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                {jogos.map((jogo, index) => (
                    <CardCassino
                        key={index}
                        imgGame={jogo.img}
                        gameName={jogo.nome}
                        location={jogo.url}
                    />
                ))}
            </div>
        </>
    )
}

export default Cassino