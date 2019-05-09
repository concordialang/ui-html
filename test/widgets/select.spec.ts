import { UiElement } from 'concordialang-ui-core'
import { Select } from '../../src/widgets/select'

describe('Select', () => {
	describe('renderToString', () => {
		const defaultProps: UiElement = {
			name: 'Gender',
			widget: 'select',
			position: 7,
			props: {
				id: 'gender',
				value: ['Male', 'Female']
			}
		}

		const subject = (uiElement?: UiElement) => (
			uiElement ?
			new Select(uiElement.props, uiElement.name) :
			new Select({})
		)

        it('without properties', () => {
            const inputWidget: Select = subject()
			expect(inputWidget.renderToString()).toEqual(expect.stringContaining('<select></select>'))
        })

		it('surrounds the select with a div', () => {
			const inputWidget: Select = subject()
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})

        it('produces html from an select element with name', async () => {
			const inputWidget: Select = subject(defaultProps)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<select id="gender">'))
			expect(result).toEqual(expect.stringContaining('</select>'))
        })

		it('produces a label for the select element', async () => {
			const inputWidget: Select = subject(defaultProps)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label for="gender">Gender</label>'))
		})

		it('produces the options for the select element', async () => {
			const inputWidget: Select = subject(defaultProps)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<option value="male">Male</option>'))
			expect(result).toEqual(expect.stringContaining('<option value="female">Female</option>'))
		})
	})
})
