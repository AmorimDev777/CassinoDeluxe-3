import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import SetaVoltar from "../components/SetaVoltar"

function JogoEsporte({confronto}) {
    const [searchParams] = useSearchParams()
    const [confrontos, setConfrontos] = useState([])
    const confrontoId = searchParams.get('confronto')
    const time1Id = searchParams.get('time1')
    const time2Id = searchParams.get('time2')
    let time1 = []
    let time2 = []
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
    confrontos.map((c, i) => {
        if (c.time1 != time1Id)
    })
    return (
        <>
            <SetaVoltar to="/esportes" />  
            {confrontos.map((jogo, index) => {
                if (jogo.id != confrontoId) return
                return (
                    <div>
                        <h1 key={index} className="text-white">{jogo.nome}</h1>
                    </div>
                )
            })}
        </>
    )
}

export default JogoEsporte