import { UiElement } from 'concordialang-ui-core'

import Button from '../../src/widgets/button'
import Input from '../../src/widgets/input'
import WidgetFactory from '../../src/widgets/widget-factory'
import { completeAppConfigObject } from '../fixtures/app-config'

describe('WidgetFactory', () => {
	let widgetFactory: WidgetFactory = new WidgetFactory(completeAppConfigObject)

	describe('create', () => {
		it('create button with valid properties', () => {
			const buttonUiElement: UiElement = {
				name: 'OK',
				widget: 'button',
				position: 30,
				props: {}
			}
			const { button: buttonConfig } = completeAppConfigObject.widgets
			const buttonWidget = new Button(buttonUiElement.props, buttonUiElement.name, buttonConfig)

			expect(widgetFactory.create(buttonUiElement)).toEqual(buttonWidget)
		})

		it('create input with valid properties', async () => {
			const inputUiElement: UiElement = {
				name: 'Username',
				widget: 'textbox',
				position: 16,
				props: {
					required: true,
					maxlength: 20,
					minlength: 10
				}
			}
			const { input: inputConfig } = completeAppConfigObject.widgets
			const inputWidget = new Input(inputUiElement.props, inputUiElement.name, inputConfig)

			expect(widgetFactory.create(inputUiElement)).toEqual(inputWidget)
		})

		it('throw invalid widget error', async () => {
			const inputUiElement: UiElement = {
				widget: 'invalid',
				name: '',
				position: 16,
				props: {}
			}

			expect(() => {
				widgetFactory.create(inputUiElement)
			}).toThrow(Error)
		})
	})
})
