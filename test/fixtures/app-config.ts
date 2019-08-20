export const completeAppConfigObject = {
	widgets: {
		input: {
			widget: {
				opening: '<input {{&props}}>'
			},
			wrapper: {
				opening: '<div>',
				closure: '</div>'
			}
		},
		label: {
			widget: {
				opening: '<label {{&props}}>',
				closure: '</label>'
			}
		},
		button: {
			widget: {
				opening: '<button {{&props}}>',
				closure: '</button>'
			}
		}
	}
}
export const completeAppConfig: string = JSON.stringify(completeAppConfigObject)
