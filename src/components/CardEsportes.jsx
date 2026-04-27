import { useState, useEffect } from "react";
import axios from "axios";

function CardEsportes({time1, time2 ,onClick}) {
    return (
        <div className="bg-white w-full h-20 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:brightness-[.8]" onClick={onClick}>   
        </div>
    )
}

export default CardEsportes