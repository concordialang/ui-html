import { UiElement } from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import Checkbox from '../../src/widgets/checkbox'

describe('Checkbox', () => {

	describe('renderToString', () => {
		const uiElement: UiElement = {
			name: 'Web Developer',
			widget: 'checkbox',
			position: 16,
			props: {
				value: 'web_developer'
			}
		}

		const widgetConfig: WidgetConfig = {
			opening: '<input %s>',
			wrapperOpening: '<div>',
			wrapperClosure: '</div>',
			label: {
				opening: '<label %s>',
				closure: '</label>'
			}
		}

        it('produces html from an input element with name', async () => {
			const inputWidget: Checkbox = new Checkbox(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="checkbox" value="webDeveloper">Web Developer'))
        })

		it('produces a wrapper for the input element', () => {
			const inputWidget: Checkbox = new Checkbox(uiElement.props, uiElement.name, widgetConfig)
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
	})
})
