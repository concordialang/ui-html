import { UiElement } from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import Select from '../../src/widgets/select'

describe('Select', () => {
	describe('renderToString', () => {
		const uiElement: UiElement = {
			name: 'Gender',
			widget: 'select',
			position: 7,
			props: {
				id: 'gender',
				value: ['Male', 'Female']
			}
		}

		const widgetConfig: WidgetConfig = {
			opening: '<select %s>',
			closure: '</select>',
			optionOpening: '<option %s>',
			optionClosure: '</option>',
			wrapperOpening: '<div>',
			wrapperClosure: '</div>',
			label: {
				opening: '<label %s>',
				closure: '</label>'
			}
		}

        it('produces html from an select element with name', async () => {
			const inputWidget: Select = new Select(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<select id="gender">'))
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
