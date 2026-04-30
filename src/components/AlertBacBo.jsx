import { useState } from "react"

function AlertBacBo({status, msg}) {
        const [visible, setVisible] = useState(false)
        let c = 0
        let mxC = 5
        const i = setInterval(() => {

            c++

            if (c >= mxC) {
                clearInterval(i)
                setVisible(true)
            }
        }, 10)
    return (
        <main className="flex justify-center items-center h-screen w-screen fixed top-0 left-0">
            <div className={`flex justify-center items-center ${visible ? 'h-50 text-3xl' : 'h-0 text-0'} aspect-2/1 rounded-2xl font-medium text-white transition-all duration-300
                bg-linear-to-b ${status === 'Ganhou' ? 'from-blue-900 to-blue-700' : status === 'Perdeu' ? 'from-red-700 to-red-500' : 'from-green-800 to-green-600'}`}>
                {visible ? msg : ''}
            </div>
        </main>
    )
}
export default AlertBacBo