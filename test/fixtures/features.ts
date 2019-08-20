export const featureWithName = (name) => ({
	features: [
		{
			name,
			position: 2,
			uiElements: [
				{
					name: "Nome de Usuário",
					widget: "textbox",
					position: 22,
					props: {
						id: "nome_usuario"}
				},
				{
					name: "Senha",
					widget: "textbox",
					position: 26,
					props: {
						id: "senha",
						required: true
					}
				},
				{
					name: "Entrar",
					widget: "button",
					position: 31,
					props: {}
				}
			]
		}
	]
})
