import { UiElement } from 'concordialang-ui-core'
import { Radio } from '../../src/widgets/radio'

describe('Radio', () => {
	describe('renderToString', () => {
		const defaultProps: UiElement = {
			name: 'Gender',
			widget: 'radio',
			position: 7,
			props: {
				id: 'gender',
				value: ['Male', 'Female']
			}
		}

		const subject = (uiElement?: UiElement) => (
			uiElement ?
			new Radio(uiElement.props, uiElement.name) :
			new Radio({})
		)

        it('without properties', () => {
            const inputWidget: Radio = subject()
			expect(inputWidget.renderToString()).toEqual(expect.stringContaining('<input type="radio">'))
        })

		it('surrounds the input with a div', () => {
			const inputWidget: Radio = subject()
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})

        it('produces html from an input element with name', async () => {
			const inputWidget: Radio = subject(defaultProps)
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<input type="radio" name="gender" value="male">Male'))
			expect(result).toEqual(expect.stringContaining('<input type="radio" name="gender" value="female">Female'))
        })

		it('produces a label for the select element', async () => {
			const inputWidget: Radio = subject(defaultProps)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label for="gender">Gender</label>'))
		})
	})
})

