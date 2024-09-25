import { LogoIcon } from "./assets/icons" // Importa o ícone do logotipo
import CrudUser from "./components/CrudUser" // Importa o componente principal de CRUD de usuários
import "./styles/App.css" // Importa o arquivo de estilos CSS para o App

function App() {
	return (
		<>
			<header>
				<div className='header__content'>
					<div className='logo'>
						<LogoIcon /> {/* Renderiza o ícone do logotipo */}
						<strong>JSON SERVER API</strong> {/* Título do cabeçalho */}
					</div>
				</div>
			</header>
			<main>
				<CrudUser /> {/* Renderiza o componente de gerenciamento de usuários */}
			</main>
		</>
	)
}

export default App // Exporta o componente App
