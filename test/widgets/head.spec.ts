import { AppConfig } from '../../src/interfaces/app-config'
import Head from '../../src/widgets/head'

describe('Head', () => {
	describe('renderToString', () => {
		let appConfig: AppConfig

		beforeEach(() => {
			appConfig = {
				externalLinks: [
					'url_1',
					'<link src="url_2">'
				],
				externalScripts: [
					'url_1',
					'<script src="url_2"></script>'
				]
			}
		})

		it('produces html for a head element', () => {
			const headWidget: Head = new Head(appConfig)
			const result = headWidget.renderToString()
			expect(result).toEqual(expect.stringMatching(/^<head>(.|\s)*<\/head>$/))
		})

		it('produces a link element for each external link', () => {
			const headWidget: Head = new Head(appConfig)
			const result = headWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<link src="url_1">'))
			expect(result).toEqual(expect.stringContaining('<link src="url_2">'))
		})

		it('produces a script element for each external script', () => {
			const headWidget: Head = new Head(appConfig)
			const result = headWidget.renderToString()
			expect(result).toEqual(expect.stringContaining('<script src="url_1"></script>'))
			expect(result).toEqual(expect.stringContaining('<script src="url_2"></script>'))
		})
	})
})
