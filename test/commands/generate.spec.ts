import { fs as memfs, vol } from 'memfs'
import Generate from '../../src/commands/generate'
import { completeAppConfig } from '../fixtures/app-config'
import { featureWithName } from '../fixtures/features'

jest.mock('fs')
jest.mock('util')

describe('Generate', () => {
	const CURRENT_DIR: string = process.cwd()
	const OUTPUT_DIR: string = 'outputDir'

	const mockFiles = (files) => { vol.fromJSON(files, CURRENT_DIR) }

	afterAll(() => {
		require('fs').writeFile.mockRestore()
	})

	describe('with a complete app config', () => {
		let spy

		beforeAll(async () => {
			vol.reset()
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig, })
			vol.mkdirSync(OUTPUT_DIR)

			spy = jest.spyOn(process.stdout, 'write');
			const features: string = JSON.stringify(featureWithName('Login de usuário'))
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should save an html file', () => {
			expect(require('fs').writeFile).toBeCalledWith(`${OUTPUT_DIR}/login_de_usuario.html`, expect.anything())
			expect(memfs.existsSync(`${OUTPUT_DIR}/login_de_usuario.html`)).toBe(true)
		})

		it('should list the generated file in the console', () => {
			expect(spy).toBeCalledWith(`${OUTPUT_DIR}/login_de_usuario.html\n`)
		})
	})

	describe('without features', () => {
		let spy

		beforeAll(async () => {
			vol.reset()
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig, })
			vol.mkdirSync(OUTPUT_DIR)

			spy = jest.spyOn(process.stdout, 'write');
			const features: string = '{ "features": [] }'
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should show an error message', async () => {
			expect(spy).toBeCalledWith(expect.stringContaining("No features found"))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})

	describe('without the outputDir flag', () => {
		let spy

		beforeAll(async () => {
			vol.reset()
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig })

			spy = jest.spyOn(process.stdout, 'write');
			const features: string = JSON.stringify(featureWithName('Login de usuário'))
			await Generate.run(['--features', features])
		})

		it('should show an error message', async () => {
			expect(spy).toBeCalledWith(expect.stringContaining("Missing required flag"))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})

	describe('without an app config', () => {
		let spy

		beforeAll(async () => {
			vol.reset()

			spy = jest.spyOn(process.stdout, 'write');
			const features: string = '{"features":[{"name":"Login de usuário","position":2,"uiElements":[{"name":"Nome de Usuário","widget":"textbox","position":22,"props":{"id":"nome_usuario"}},{"name":"Senha","widget":"textbox","position":26,"props":{"id":"senha","required":true}},{"name":"Entrar","widget":"button","position":31,"props":{}}]}]}'
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should show an error message', async () => {
			expect(spy).toBeCalledWith(expect.stringContaining("Config file not found"))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})
})
