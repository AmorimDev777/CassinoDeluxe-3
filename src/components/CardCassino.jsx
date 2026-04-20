import { Link } from "react-router-dom"

function CardCassino({imgGame ,gameName ,location}) {
    return (
        <div className="flex flex-col relative">
            <div className="flex justify-center items-center relative aspect-[2/1.3] rounded-2xl overflow-hidden group hover:">
                <img src={imgGame} alt="" className="h-full object-cover transition-all duration-300
                group-hover:scale-[1.4] group-hover:blur-xs"/>
                <Link to={`/${location}`} className="hidden justify-center items-center absolute h-[25%] 
                bg-zinc-950 border-3 border-zinc-400 text-[120%] text-zinc-400 aspect-square rounded-full 
                shadow-lg shadow-black transition-all duration-200 hover:brightness-[.8] group-hover:flex">
                    <i className="fa-solid fa-play"></i>
                </Link>
            </div>
            <h1 className="absolute bottom-0 translate-y-full text-center text-lg text-white xl:-bottom-2 2xl:text-3xl">{gameName}</h1>
        </div>
    )
}

export default CardCassino