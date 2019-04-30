import { Feature, UiElement, Widget } from 'concordialang-ui-core'
import { minify } from 'html-minifier'
import { fs, vol } from 'memfs'
import { promisify } from 'util'

import { Button } from '../../src/widgets/button'
import WidgetFactory from '../../src/widgets/widget-factory'



describe('Button', () => {

    const CURRENT_DIR: string = process.cwd()

    let buttonUiElement: UiElement | null
    let buttonWidget: Button | null
    let factory: WidgetFactory | null

    beforeEach(() => {
        vol.mkdirpSync(CURRENT_DIR) // Synchronize with the current fs structure
        factory = new WidgetFactory()
        buttonUiElement = { name: 'OK', widget: 'button', position: 30, props: {} }
        buttonWidget = new Button(buttonUiElement.props, buttonUiElement.name)
    })

    afterEach(() => {
        vol.reset() // Erase in-memory structure
        buttonUiElement = null
        buttonWidget = null
    })

    describe('renderToString', () => {
        it('without properties', () => {
            const b = new Button({})
            expect(b.renderToString()).toBe('<button type="button"></button>')
        })
    })
    

    it('produces widget from a button element', async () => {
        
        const result = factory.create(buttonUiElement)
        expect(result).toEqual(buttonWidget)
    })

    it('produces html from a button element', async () => {
        const widget: Button = new Button(buttonUiElement.props, buttonUiElement.name)
        const result = widget.renderToString()
        expect(result).toEqual(`<button type="button">OK</button>`)
    })

})
