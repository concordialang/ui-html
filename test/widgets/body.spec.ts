import Body from '../../src/widgets/body'
import Button from '../../src/widgets/button'
import { completeAppConfigObject } from '../fixtures/app-config'

describe('Body', () => {
	describe('renderToString', () => {
		const { button: buttonConfig } = completeAppConfigObject.widgets
		const widget = new Button({}, '', buttonConfig)

		it('surrounds the widgets with a form', () => {
			const bodyWidget: Body = new Body([widget])
			const result = bodyWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/<form>(.|\s)*<\/form>/))
		})

		it('surrounds the widgets with a body', () => {
			const bodyWidget: Body = new Body([widget])
			const result = bodyWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<body>(.|\s)*<\/body>$/))
		})
	})
})
