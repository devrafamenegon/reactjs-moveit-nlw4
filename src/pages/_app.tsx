// o _app é responsável por abrigar todos os componentes que não mudam na nossa tela
//tudo que vai repetir em todas as paginas, fica aqui no _app, por exemplo o global.css
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
