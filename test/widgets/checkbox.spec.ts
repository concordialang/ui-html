import { UiElement } from 'concordialang-ui-core'

import { WidgetConfig } from '../../src/interfaces/app-config'
import Checkbox from '../../src/widgets/checkbox'

describe('Checkbox', () => {
	describe('renderToString', () => {
		let uiElement: UiElement
		let widgetConfig: WidgetConfig

		beforeEach(() => {
			uiElement = {
				name: 'Web Developer Skills',
				widget: 'checkbox',
				position: 16,
				props: {
					value: ['html', 'css', 'javascript']
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

		it('produces html from an input element with name', async () => {
			const inputWidget: Checkbox = new Checkbox(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<input type="checkbox" name="html" value="html"><label>html</label>'))
			expect(result).toEqual(expect.stringContaining('<input type="checkbox" name="css" value="css"><label>css</label>'))
			expect(result).toEqual(expect.stringContaining('<input type="checkbox" name="javascript" value="javascript"><label>javascript</label>'))
		})

		it('produces a label for the input element', async () => {
			const inputWidget: Checkbox = new Checkbox(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<label>Web Developer Skills</label>'))
		})

		it('produces a wrapper for the input element', () => {
			const inputWidget: Checkbox = new Checkbox(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
	})
})
