export const httpHelper = () => {
	// Função para criar um fetch customizado
	const customFetch = async (url, options = {}) => {
		const defaultMethod = "GET" // Método padrão é GET
		const defaultHeaders = {
			"Content-Type": "application/json", // Define o tipo de conteúdo como JSON
			Accept: "application/json", // Aceita respostas em JSON
		}
		const controller = new AbortController() // Controlador para abortar a requisição se necessário
		options.signal = controller.signal // Adiciona o sinal de abort

		// Define o método da requisição (GET ou outro)
		options.method = options.method || defaultMethod
		// Mescla os cabeçalhos padrão com os cabeçalhos personalizados
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		// Prepara o corpo da requisição como JSON
		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body // Remove o corpo se não houver

		// Configura um timeout para abortar a requisição após 3 segundos
		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
			const response = await fetch(url, options) // Faz a requisição
			return await response.json() // Retorna a resposta como JSON
		} catch (err) {
			return err // Retorna o erro, se ocorrer
		}
	}

	// Métodos para as operações CRUD
	const get = (url, options = {}) => customFetch(url, options)

	const post = (url, options) => {
		options.method = "POST" // Define o método como POST
		return customFetch(url, options) // Chama o fetch customizado
	}

	const put = (url, options) => {
		options.method = "PUT" // Define o método como PUT
		return customFetch(url, options) // Chama o fetch customizado
	}

	const del = (url, options) => {
		options.method = "DELETE" // Define o método como DELETE
		return customFetch(url, options) // Chama o fetch customizado
	}

	// Retorna os métodos CRUD para serem utilizados em outros componentes
	return {
		get,
		post,
		put,
		del,
	}
}
