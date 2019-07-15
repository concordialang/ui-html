import { UiElement } from 'concordialang-ui-core'

import { WidgetConfig } from '../../src/interfaces/app-config'
import Button from '../../src/widgets/button'

describe('Button', () => {
	describe('renderToString', () => {
		let uiElement: UiElement
		let widgetConfig: WidgetConfig

		beforeEach(() => {
			uiElement = {
				name: 'Save',
				widget: 'button',
				position: 7,
				props: {
					id: 'save'
				}
			}

			widgetConfig = {
				template: '{{&widget.opening}}{{value}}{{&widget.closure}}',
				widget: {
					opening: '<button {{&props}}>',
					closure: '</button>'
				}
			}
		})

		it('produces html from a button element', async () => {
			const buttonWidget: Button = new Button(uiElement.props, uiElement.name, widgetConfig)
			const result = buttonWidget.renderToString()
			expect(result).toEqual('<button id="save" type="button">Save</button>')
		})
	})
})
