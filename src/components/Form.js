import React, { useState } from "react"
import DropComapies from "./DropCompanies" // Importa o componente de dropdown para selecionar empresas

const Form = ({ userData = {}, postUser, updateUser }) => {
	// Inicializa o estado do usuário com dados fornecidos ou valores padrão
	const [user, setUser] = useState({
		name: userData.name ?? "", // Nome do usuário
		username: userData.username ?? "", // Nome de usuário
		email: userData.email ?? "", // Email do usuário
		phone: userData.phone ?? "", // Telefone do usuário
		companiesId: userData.companiesId ?? "0", // ID da empresa selecionada
	})

	// Função para atualizar o estado do usuário com base na entrada do formulário
	const handleValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value }) // Atualiza o estado com o novo valor
	}

	// Função para lidar com o envio do formulário
	const submitUser = e => {
		e.preventDefault() // Previne o comportamento padrão do formulário

		if (user.companiesId === "0") return // Não permite submissão se nenhuma empresa for selecionada

		// Verifica se estamos atualizando um usuário existente ou criando um novo
		if (userData.id) {
			updateUser(userData.id, user) // Atualiza o usuário
		} else {
			postUser(user) // Cria um novo usuário
		}
	}

	return (
		<form onSubmit={submitUser} className='row'> // Formulário com evento de envio
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name' // Placeholder para o campo de nome
				onChange={e => handleValue(e)} // Atualiza o estado ao digitar
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email' // Placeholder para o campo de email
				onChange={e => handleValue(e)} // Atualiza o estado ao digitar
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)' // Placeholder para o campo de telefone
				pattern='[0-9]{10}' // Define o padrão para o número de telefone
				onChange={e => handleValue(e)} // Atualiza o estado ao digitar
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} /> // Componente dropdown para seleção de empresas
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`} // Texto do botão baseado na ação (adicionar ou salvar)
			/>
		</form>
	)
}

export default Form // Exporta o componente Form
