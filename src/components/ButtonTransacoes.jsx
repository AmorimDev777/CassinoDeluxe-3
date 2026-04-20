function ButtonTransacoes({selectedOption, tipoOpcao, value, onClick}) {
    return (
        <button 
            className={`${(selectedOption === tipoOpcao ? 'flex' : 'hidden')} justify-center w-full p-3 transition-all duration-200 rounded-full cursor-pointer hover:bg-gray-200`}
            onClick={onClick}
        >{value}</button>
    )
}

export default ButtonTransacoes