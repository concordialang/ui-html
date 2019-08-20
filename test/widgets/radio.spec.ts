import { UiElement } from 'concordialang-ui-core'

import { WidgetConfig } from '../../src/interfaces/app-config'
import Radio from '../../src/widgets/radio'

describe('Radio', () => {
	describe('renderToString', () => {
		let uiElement: UiElement
		let widgetConfig: WidgetConfig

		beforeEach(() => {
			uiElement = {
				name: 'Gender',
				widget: 'radio',
				position: 7,
				props: {
					id: 'gender',
					value: ['Male', 'Female']
				}
			}

			widgetConfig = {
				widget: {
					opening: '<input {{&props}}>',
					onePerValue: true,
				},
				wrapper: {
					opening: '<div>',
					closure: '</div>',
				},
				valueWrapper: {
					opening: '<label>',
					closure: '</label>',
				},
				label: {
					opening: '<label {{&props}}>',
					closure: '</label>'
				}
			}
		})

		it('produces html from an radio element with name', async () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<input type="radio" name="gender" value="male"><label>Male</label>'))
			expect(result).toEqual(expect.stringContaining('<input type="radio" name="gender" value="female"><label>Female</label>'))
		})

		it('produces a label for the input element', async () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<label>Gender</label>'))
		})

		it('produces a wrapper for the input element', () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
	})
})
