import { UiElement } from 'concordialang-ui-core'
import { Checkbox } from '../../src/widgets/checkbox'

describe('Checkbox', () => {

	describe('renderToString', () => {
		const defaultProps: UiElement = {
			name: 'Web Developer',
			widget: 'checkbox',
			position: 16,
			props: {
				value: 'web_developer'
			}
		}

		const subject = (uiElement?: UiElement) => (
			uiElement ?
			new Checkbox(uiElement.props, uiElement.name) :
			new Checkbox({})
		)

        it('without properties', () => {
            const inputWidget: Checkbox = subject()
            expect(inputWidget.renderToString()).toEqual(expect.stringContaining('<input type="checkbox">'))
        })

		it('surrounds the input with a div', () => {
			const inputWidget: Checkbox = subject()
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})

        it('produces html from an input element with name', async () => {
			const inputWidget: Checkbox = subject(defaultProps)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="checkbox" value="web_developer">Web Developer'))
        })

        it('produces html from an input element without name', async () => {
			const inputWidget: Checkbox = subject({ ...defaultProps, name: undefined })
			const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching('<input type="checkbox" value="web_developer">\n'))
        })
	})
})
