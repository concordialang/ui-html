import { UiElement } from 'concordialang-ui-core'
import { Input } from '../../src/widgets/input'

describe('Input', () => {

    describe('renderToString', () => {
        it('without properties', () => {
            const inputWidget = new Input({})
            expect(inputWidget.renderToString()).toEqual(expect.stringContaining('<input type="text"/>'))
        })

        it('produces html from an input element with name', async () => {
            const inputUiElement: UiElement = {
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
            const inputWidget: Input = new Input(inputUiElement.props, inputUiElement.name)
            const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label for="username">Username</label>'))
            expect(result).toEqual(expect.stringContaining('<input type="text" id="username" required="true" maxlength="20" minlength="10"/>'))
        })

        it('produces html from an input element without name', async () => {
            const inputUiElement: UiElement = {
                widget: 'textbox',
                position: 16,
                props: {
                    required: true,
                    maxlength: 20,
                    minlength: 10
                }
            }
            const inputWidget = new Input(inputUiElement.props, inputUiElement.name)
            const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="text" required="true" maxlength="20" minlength="10"/>'))
        })

		it('surrounds the input with a div', () => {
			const inputWidget: Input = new Input({})
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
    })
})
