import { UiElement } from 'concordialang-ui-core'

import { WidgetConfig } from '../../src/interfaces/app-config'
import Select from '../../src/widgets/select'

describe('Select', () => {
	describe('renderToString', () => {
		let uiElement: UiElement
		let widgetConfig: WidgetConfig

		beforeEach(() => {
			uiElement = {
				name: 'Gender',
				widget: 'select',
				position: 7,
				props: {
					id: 'gender',
					value: ['Male', 'Female']
				}
			}

			widgetConfig = {
				widget: {
					opening: '<select {{&props}}>',
					closure: '</select>',
				},
				wrapper: {
					opening: '<div>',
					closure: '</div>',
				},
				valueWrapper: {
					opening: '<option {{&props}}>',
					closure: '</option>',
				},
				label: {
					opening: '<label {{&props}}>',
					closure: '</label>'
				}
			}
		})

		it('produces html from an select element with name', async () => {
			const inputWidget: Select = new Select(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<select id="gender" name="gender">'))
			expect(result).toEqual(expect.stringContaining('</select>'))
		})

		it('produces the options for the select element', async () => {
			const inputWidget: Select = new Select(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<option value="male">Male</option>'))
			expect(result).toEqual(expect.stringContaining('<option value="female">Female</option>'))
		})

		it('produces a label for the select element', async () => {
			const inputWidget: Select = new Select(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<label for="gender">Gender</label>'))
		})

		it('produces a wrapper for the input element', () => {
			const inputWidget: Select = new Select(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
	})
})
