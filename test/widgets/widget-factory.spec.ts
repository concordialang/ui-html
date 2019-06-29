import { UiElement } from 'concordialang-ui-core'
import { AppConfig, WidgetConfig } from '../../src/interfaces/app-config'
import WidgetFactory from '../../src/widgets/widget-factory'
import Button from '../../src/widgets/button';
import Input from '../../src/widgets/input';



describe('WidgetFactory', () => {
	const appConfig: AppConfig = {
		widgets: {
			input: {
				opening: '<input %s>',
				label: {
					opening: '<label %s>',
					closure: '</label>'
				}
			}
		}
	}

    let widgetFactory: WidgetFactory = new WidgetFactory(appConfig)

    describe('create', () => {
        it('create button with valid properties', () => {
            const buttonUiElement: UiElement = {
                name: 'OK',
                widget: 'button',
                position: 30,
                props: {}
            }

            const buttonWidget = new Button(buttonUiElement.props, buttonUiElement.name)

            expect(widgetFactory.create(buttonUiElement)).toEqual(buttonWidget)
        })

        it('create input with valid properties', async () => {
            const inputUiElement: UiElement = {
                name: 'Username',
                widget: 'textbox',
                position: 16,
                props: {
                    required: true,
                    maxlength: 20,
                    minlength: 10
                }
            }
			const widgetConfig: WidgetConfig = appConfig.widgets.input

            const inputWidget = new Input(inputUiElement.props, inputUiElement.name, widgetConfig)

            expect(widgetFactory.create(inputUiElement)).toEqual(inputWidget)
        })

        it('throw invalid widget error', async () => {
            const inputUiElement: UiElement = {
                widget: 'invalid',
				name: '',
                position: 16,
                props: {}
            }

            expect(() => {
                widgetFactory.create(inputUiElement)
            }).toThrow(Error);
        })
    })
})
