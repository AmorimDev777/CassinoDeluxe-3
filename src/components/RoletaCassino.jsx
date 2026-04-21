function RoletaCassino({ angulo }) {
    return (
        <>
        <div 
            className="roleta flex justify-center items-center relative border-[6px] border-black rounded-full h-[300px] w-[300px] transition-transform duration-3000 ease-out"
            style={{ transform: `rotate(${angulo}deg)` }}
        >
          <div className="absolute border-[3px] border-white aspect-square h-[70%] rounded-full"></div>
          <span className="flex justify-center items-center absolute border-4 border-white aspect-square h-[30%] rounded-full"></span>
          <p className="absolute h-[10%] bg-white border-[6px] border-gray-400 aspect-square rounded-full z-2"></p>
          <hr className="absolute bg-gray-400 h-[20%] w-[5px] border-none rounded-full"/>
          <hr className="absolute bg-gray-400 w-[20%] h-[5px] border-none rounded-full"/>
        </div>
        </>
    )
}

export default RoletaCassino