import { Button } from '../../src/widgets/button'

describe('Button', () => {
	describe('renderToString', () => {
		it('without properties', () => {
			const b = new Button({})
			expect(b.renderToString()).toBe('<button></button>')
		})
	})
})
