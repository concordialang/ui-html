import { UiElement } from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import Input from '../../src/widgets/input'
import { getAppConfig } from '../test-helpers/app-config'

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
			wrapperClosure: '</div>',
			label: {
				opening: '<label %s>',
				closure: '</label>'
			}
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

		it('produces a wrapper for the input element', () => {
			const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
            const result = inputWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<div>(.|\s)*<\/div>$/))
		})

		describe('when the label is not defined', () => {
			const widgetConfig: WidgetConfig = {
				opening: '<input %s>',
				wrapperOpening: '<div>',
				wrapperClosure: '</div>'
			}

			it('does not produce a label for the input element', async () => {
				const inputWidget: Input = new Input(uiElement.props, uiElement.name, widgetConfig)
				const result = inputWidget.renderToString()
				expect(result).not.toEqual(expect.stringContaining('label'))
			})
		})
    })
})
