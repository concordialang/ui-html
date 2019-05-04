import { UiElement } from 'concordialang-ui-core'
import { Input } from '../../src/widgets/input'

describe('Input', () => {

    describe('renderToString', () => {
		const defaultProps: UiElement = {
			name: 'Username',
			widget: 'textbox',
			position: 16,
			props: {
				id: 'username',
				required: true,
				maxlength: 20,
				minlength: 10
			}
		}

		const subject = (uiElement?: UiElement) => (
			uiElement ?
			new Input(uiElement.props, uiElement.name) :
			new Input({})
		)

        it('without properties', () => {
            const inputWidget: Input = subject()
            expect(inputWidget.renderToString()).toEqual(expect.stringContaining('<input type="text"/>'))
        })

        it('produces html from an input element with name', async () => {
			const inputWidget: Input = subject(defaultProps)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="text" id="username" required="true" maxlength="20" minlength="10"/>'))
        })

        it('produces html from an input element without name', async () => {
			const inputWidget: Input = subject({ ...defaultProps, name: undefined })
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="text" id="username" required="true" maxlength="20" minlength="10"/>'))
        })

		it('produces a label for the input element', async () => {
			const inputWidget: Input = subject(defaultProps)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label for="username">Username</label>'))
		})

		it('surrounds the input with a div', () => {
			const inputWidget: Input = subject()
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
    })
})
