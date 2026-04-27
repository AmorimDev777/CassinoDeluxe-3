function BacBo() {
    return (
        <>
            <div className="divScreenControls flex justify-center items-end h-screen w-screen absolute p-10 bg-zinc-400/70">
                <div className="flex justify-center items-center relative h-45 gap-1 bg-zinc-300 aspect-2/1 rounded-2xl overflow-hidden">
                    <div className="flex justify-center items-end h-full w-[50%] bg-blue-700">
                        <h1>Jogador</h1>
                    </div>
                    <div className="flex justify-center items-center absolute h-[90%] bg-green-500 border-4 border-zinc-300 aspect-square rounded-full">
                        <h1>Empate</h1>
                    </div>
                    <div className="flex justify-center items-end h-full w-[50%] bg-red-500">
                        <h1>Banca</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BacBo