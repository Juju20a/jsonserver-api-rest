import React from "react"
import Form from "./Form" // Importa o componente Form para edição de usuários

const Table = ({ users, postUser, updateUser, deleteUser }) => {
	// Função para mostrar ou ocultar o formulário de atualização
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form") // Alterna a classe para mostrar/ocultar o formulário
	}

	// Componente para renderizar uma linha da tabela
	const Row = ({ user }) => {
		return (
			<>
				<div className='row'>
					<div>{user.name}</div> // Nome do usuário
					<div>{user.email}</div> // Email do usuário
					<div>{user.phone}</div> // Telefone do usuário
					<div>{user.companies.name}</div> // Nome da empresa associada
					<div className='buttons'>
						<button onClick={() => showUpdateUser(user.id)}>Update</button> // Botão para editar o usuário
						<button onClick={() => deleteUser(user.id)}>Delete</button> // Botão para excluir o usuário
					</div>
				</div>
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} /> // Formulário para edição do usuário
				</div>
			</>
		)
	}

	return (
		<div className='table'>
			<div className='titles'>
				<div>Name</div> // Cabeçalho da coluna de nome
				<div>Email</div> // Cabeçalho da coluna de email
				<div>Phone</div> // Cabeçalho da coluna de telefone
				<div>Company</div> // Cabeçalho da coluna de empresa
				<div>Actions</div> // Cabeçalho da coluna de ações
			</div>
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)} // Mapeia e renderiza cada usuário na tabela
			</div>
		</div>
	)
}

export default Table // Exporta o componente Table
