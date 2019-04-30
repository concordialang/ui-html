import { Feature, UiElement, Widget } from 'concordialang-ui-core'
import { minify } from 'html-minifier'
import { fs, vol } from 'memfs'
import { promisify } from 'util'

import { Input } from '../../src/widgets/input'
import WidgetFactory from '../../src/widgets/widget-factory'



describe('Input', () => {

    const CURRENT_DIR: string = process.cwd()

    let inputUiElement: UiElement | null
    let inputWidget: Input | null
    let factory: WidgetFactory | null

    beforeEach(() => {
        vol.mkdirpSync(CURRENT_DIR) // Synchronize with the current fs structure
        factory = new WidgetFactory()

        inputUiElement = {
            name: 'Username',
            widget: 'textbox',
            position: 16,
            props: {
                required: true,
                maxlength: 20,
                minlength: 10
            }
        }

        inputWidget = new Input(inputUiElement.props, inputUiElement.name)
    })

    afterEach(() => {
        vol.reset() // Erase in-memory structure
        inputUiElement = null
        inputWidget = null
    })

    describe('renderToString', () => {
        it('without properties', () => {
            const input = new Input({})
            expect(input.renderToString()).toBe('<input type="text"/>')
        })
        
        it('produces html from an input element with name', async () => {
            const result = inputWidget.renderToString()
            expect(result).toEqual(`<label for="Username">Username</label><input type="text" required="true" maxlength="20" minlength="10"/>`)
        })
    
        it('produces html from an input element without name', async () => {
            delete inputUiElement.name

            inputWidget = new Input(inputUiElement.props, inputUiElement.name)
            const result = inputWidget.renderToString()
            expect(result).toEqual(`<input type="text" required="true" maxlength="20" minlength="10"/>`)
        })
    })

    
    



})
