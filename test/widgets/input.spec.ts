import { UiElement } from 'concordialang-ui-core'

import { WidgetConfig } from '../../src/interfaces/app-config'
import Input from '../../src/widgets/input'

describe('Input', () => {
	describe('renderToString', () => {
		let uiElement: UiElement
		let widgetConfig: WidgetConfig

		beforeEach(() => {
			uiElement = {
				name: 'Username',
				widget: 'textbox',
				position: 16,
				props: {
					id: 'username',
					required: true,
					maxlength: 20,
					minlength: 10
				}
			}

			widgetConfig = {
				widget: {
					opening: '<input {{&props}}>',
				},
				wrapper: {
					opening: '<div>',
					closure: '</div>',
				},
				label: {
					opening: '<label {{&props}}>',
					closure: '</label>'
				}
			}
		})

		it('produces html from an input element with name', async () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<input id="username" type="text" name="username" minlength="10" maxlength="20" required="true">'))
		})

		it('produces a label for the input element', async () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<label for="username">Username</label>'))
		})

		it('produces a wrapper for the input element', () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})

		describe('when the label is not defined', () => {
			beforeEach(() => {
				widgetConfig.label = undefined
			})

			it('does not produce a label for the input element', async () => {
				const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
				const result = inputWidget.renderToString()
				expect(result).not.toEqual(expect.stringContaining('label'))
			})
		})
	})
})
