import { UiElement} from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import Button from '../../src/widgets/button'



describe('Button', () => {
    describe('renderToString', () => {
		const uiElement: UiElement = {
			name: 'Save',
			widget: 'button',
			position: 7,
			props: {
				id: 'save'
			}
		}

		const widgetConfig: WidgetConfig = {
			opening: '<button %s>',
			closure: '</button>'
		}

        it('produces html from a button element', async () => {
			const buttonWidget: Button = new Button(uiElement.props, uiElement.name, widgetConfig)
            const result = buttonWidget.renderToString()
            expect(result).toEqual(`<button type="button" id="save">Save</button>`)
        })
    })
})
