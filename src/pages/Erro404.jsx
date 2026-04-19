import { Link } from 'react-router-dom'
import Img404 from '../assets/Img404.png';

function Erro404() {
  return (
    <main className='flex h-screen w-screen gap-2'>
      <title>Página não encontrada</title>
      <div className='flex justify-center items-center h-full w-full text-center sm:text-start'>
        <div className='flex flex-col w-[70%] p-6 gap-3 bg-white xl:p-8'>
          <h1 className='text-7xl text-zinc-800 sm:text-8xl 2xl:text-[10rem]'>404</h1>
          <h2 className='text-3xl 2xl:text-5xl'>Página não encontrada</h2>
          <p className='xl:text-xl 2xl:text-2xl'>Desculpe, a página que você está procurando não existe ou foi movida</p>
          <Link
            className='p-2 bg-zinc-800 text-center text-white cursor-pointer transition-all duration-200 
            hover:brightness-[.7] 2xl:p-4 2xl:text-2xl'
            to="/"
          >Página inicial</Link>
        </div>
      </div>
      <div className='hidden justify-center items-center h-full w-full md:flex'>
        <img src={Img404} alt="Erro 404" className='w-[80%]'/>
      </div>
    </main>
  )
}

export default Erro404