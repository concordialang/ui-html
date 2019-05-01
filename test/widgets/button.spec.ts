import { UiElement} from 'concordialang-ui-core'
import { Button } from '../../src/widgets/button'



describe('Button', () => {
    describe('renderToString', () => {
        it('without properties', () => {
            const b = new Button({})
            expect(b.renderToString()).toBe('<button type="button"></button>')
        })

        it('produces html from a button element', async () => {
            const buttonUiElement: UiElement = { name: 'OK', widget: 'button', position: 30, props: {} }
            const buttonWidget: Button = new Button(buttonUiElement.props, buttonUiElement.name)
            const result = buttonWidget.renderToString()
            expect(result).toEqual(`<button type="button">OK</button>`)
        })
    })
})
