import { UiElement } from 'concordialang-ui-core'
import { WidgetConfig } from '../../src/interfaces/app-config'
import Input from '../../src/widgets/input'

describe('Input', () => {

    describe('renderToString', () => {
		const uiElement: UiElement = {
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

		const widgetConfig: WidgetConfig = {
			opening: '<input %s>',
			wrapperOpening: '<div>',
			wrapperClosure: '</div>'
		}

        it('produces html from an input element with name', async () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<input type="text" id="username" required="true" maxlength="20" minlength="10">'))
        })

		it('produces a label for the input element', async () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
			const result = inputWidget.renderToString()
            expect(result).toEqual(expect.stringContaining('<label for="username">Username</label>'))
		})

		it('surrounds the input with a div', () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})
    })
})
