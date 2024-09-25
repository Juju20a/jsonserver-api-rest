import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper" // Importa a função helper para requisições HTTP

const DropCompanies = ({ companiesId, handleValue }) => {
	const [companies, setCompanies] = useState(null) // Inicializa o estado para armazenar empresas
	const [company, setCompany] = useState(companiesId) // Inicializa o estado para a empresa selecionada

	const url = "http://localhost:5000/companies" // Define a URL da API para empresas
	const api = httpHelper() // Chama a função helper para configurar a API

	// Hook para buscar empresas quando o componente é montado
	useEffect(() => {
		api
			.get(url) // Faz uma requisição GET para buscar empresas
			.then(res => {
				// Adiciona uma opção padrão à lista de empresas
				setCompanies([{ id: 0, name: "Select Company" }, ...res]) 
			})
			.catch(err => console.log(err)) // Trata erros
	}, [])

	// Retorna null enquanto as empresas estão sendo carregadas
	if (!companies) return null

	return (
		<select
			name='companiesId' // Nome do campo do select
			value={company} // Valor atual do select
			onChange={e => {
				setCompany(e.target.value) // Atualiza o estado da empresa selecionada
				handleValue(e) // Chama a função passada como prop para lidar com a mudança
			}}
		>
			{companies.map(c => (
				<option value={c.id} key={c.id}> // Mapeia as empresas para opções no select
					{c.name} // Nome da empresa
				</option>
			))}
		</select>
	)
}

export default DropCompanies // Exporta o componente DropCompanies

