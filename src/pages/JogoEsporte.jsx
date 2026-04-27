import { useState, useEffect } from "react";
import axios from "axios";

function JogoEsporte({confronto}) {
    const [confrontos, setConfrontos] = useState([])
    useEffect(() => {
        const getDados = async () => {
            axios.get("/db/db.json")
            .then((response) => {
                setConfrontos(response.data.confrontos)
            })
            .catch((error) => {
                console.error(error);
            });
        }
        getDados()
    }, []);
    return (
        <>
            {confrontos.map((jogo, index) => {
                if (jogo.nome != confronto) return
                return <h1 key={index}>{confronto}</h1>
            })}
        </>
    )
}

export default JogoEsporte