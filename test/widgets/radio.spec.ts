import { UiElement } from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import Radio from '../../src/widgets/radio'

describe('Radio', () => {
	describe('renderToString', () => {
		const uiElement: UiElement = {
			name: 'Gender',
			widget: 'radio',
			position: 7,
			props: {
				id: 'gender',
				value: ['Male', 'Female']
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

        it('produces html from an radio element with name', async () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<input type="radio" value="male">Male'))
			expect(result).toEqual(expect.stringContaining('<input type="radio" value="female">Female'))
        })

		it('produces a label for the input element', async () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label >Gender</label>'))
		})

		it('produces a wrapper for the input element', () => {
			const inputWidget: Radio = new Radio(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
	})
})

