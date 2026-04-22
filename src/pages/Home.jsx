import { Link } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/Navbar"
import ImgHome from "../assets/HomeImg.png"

function Home() {
  const saldoStorage = localStorage.getItem('saldo') || 0
  const [haveMoney] = useState(saldoStorage > 0 ? true : false)
  console.log(saldoStorage)
  return (
    <>
      <Navbar saldo={Number(saldoStorage)}></Navbar>
      <main className='mainHome gradienteBgInicio flex relative h-screen pt-[12vh]'>
        <div className="gradienteSombra absolute left-0 top-0 w-full h-full"></div>
        <div className="container flex items-center! max-w-full! pr-10! md:items-start! md:max-w-[50%]! md:pr-0! lg:pr-10!">
          <h1 className="text-center text-4xl font-extrabold uppercase text-yellow-400 sm:text-5xl lg:text-6xl min-[1500px]:text-6xl!">Cassino Deluxe</h1>
          <p className="text-center text-sm sm:text-start sm:text-base lg:text-xl min-[1500px]:text-2xl!">O casa de apostas com as melhores odds do mercado, 100% licenciada,
             com vários slots de várias provedoras, também disponível para dispositivos móveis, tanto em android's e ios's,
             <span>{haveMoney 
              ? ' jogue nossos jogos e tenha a chance de forrar neles' 
              : ' faça um depósito agora e aposte nos nossos slots'}
             </span>
          </p>
          <span className="flex flex-col justify-center items-center w-full gap-5 min-[390px]:flex-row md:justify-start">
            <Link to="/patrocinios" className="btn"><i className="fa-solid fa-handshake"></i>Patrocinados</Link>
            <Link to="/patrocinios" className="btn"><i className="fa-solid fa-handshake"></i>Patrocinadores</Link>
          </span>
          <span className="flex justify-center w-full gap-5 md:justify-start">
            <a href="https://www.facebook.com/?locale=pt_BR" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://x.com/?lang=pt" className="icon"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.instagram.com" className="icon"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@vikitecc/video/7287697193694301446" className="icon"><i className="fa-brands fa-tiktok"></i></a>
          </span>
        </div>
        <div className="container hidden md:flex">
          <img src={ImgHome} alt="" className="w-[90%]"/>
        </div>
      </main>
    </>
  )
}

export default Home