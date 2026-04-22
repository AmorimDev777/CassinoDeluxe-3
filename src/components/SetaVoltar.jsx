import { Link } from "react-router-dom"

function SetaVoltar({to}) {
    return (
        <Link to={to}><i className="fa-solid fa-arrow-left fixed top-3 left-3 text-4xl text-white 2xl:top-8 2xl:left-8 2xl:text-5xl"></i></Link>
    )
}

export default SetaVoltar