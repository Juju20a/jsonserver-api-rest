import React, { useState, useEffect } from "react"
import Form from "./Form" // Importa o componente de formulário para adicionar novos usuários
import Table from "./Table" // Importa o componente de tabela para listar os usuários

import { httpHelper } from "../helpers/httpHelper" // Importa uma função helper para fazer requisições HTTP

const CrudUser = () => {
	const [users, setUsers] = useState(null) // Inicializa o estado para armazenar usuários

	const url = "http://localhost:5000/users" // Define a URL da API
	const api = httpHelper() // Chama a função helper para configurar a API

	useEffect(() => {
		getUsers() // Chama a função para buscar usuários quando o componente é montado
	}, [])

	// Função para adicionar um novo usuário
	const postUser = user => {
		api
			.post(`${url}`, { body: user }) // Faz uma requisição POST para adicionar o usuário
			.then(res => getUsers()) // Atualiza a lista de usuários após sucesso
			.catch(err => console.log(err)) // Trata erros
	}

	// Função para atualizar um usuário existente
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user }) // Faz uma requisição PUT para atualizar o usuário
			.then(res => getUsers()) // Atualiza a lista de usuários após sucesso
			.catch(err => console.log(err)) // Trata erros
	}

	// Função para deletar um usuário
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {}) // Faz uma requisição DELETE para remover o usuário
			.then(res => getUsers()) // Atualiza a lista de usuários após sucesso
			.catch(err => console.log(err)) // Trata erros
	}

	// Função para buscar todos os usuários
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`) // Faz uma requisição GET para buscar usuários com detalhes de empresas
			.then(res => {
				setUsers(res) // Armazena os usuários recebidos no estado
			})
			.catch(err => console.log(err)) // Trata erros
	}

	// Renderiza null se a lista de usuários ainda não foi carregada
	if (!users) return null

	return (
		<>
			<h3>New user</h3>
			<Form postUser={postUser} /> // Renderiza o formulário para adicionar novos usuários
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users} // Passa os usuários para o componente da tabela
					setUsers={setUsers} // Permite que a tabela atualize a lista de usuários
					postUser={postUser} // Passa a função para adicionar usuários
					updateUser={updateUser} // Passa a função para atualizar usuários
					deleteUser={deleteUser} // Passa a função para deletar usuários
				/>
			</div>
		</>
	)
}

export default CrudUser // Exporta o componente CrudUser
