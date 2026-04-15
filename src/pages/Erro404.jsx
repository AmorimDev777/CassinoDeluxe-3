import Img404 from '../assets/Img404.png';

function Erro404() {
  return (
    <>
      <div>
        <div>
          <h1>404</h1>
          <h2>Página não encontrada</h2>
          <p>Desculpe, a página que você está procurando não existe ou foi movida</p>
          <button>Voltar para a página inicial</button>
        </div>
      </div>
      <div>
        <img src={Img404} alt="Erro 404"/>
      </div>
    </>
  )
}

export default Erro404