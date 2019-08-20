import { fs as memfs, vol } from 'memfs'

import Generate from '../../src/commands/generate'
import Printer from '../../src/utils/printer'
import { completeAppConfig } from '../fixtures/app-config'
import { featureWithName } from '../fixtures/features'

jest.mock('fs')
jest.mock('util')
jest.mock('../../src/utils/printer')

describe('Generate', () => {
	const CURRENT_DIR: string = process.cwd()
	const OUTPUT_DIR = 'outputDir'

	const mockFiles = files => { vol.fromJSON(files, CURRENT_DIR) }

	beforeEach(() => {
		(Printer as jest.Mock).mockClear()
		vol.reset()
	})

	afterAll(() => {
		require('fs').writeFile.mockRestore()
	})

	describe('with a complete app config', () => {
		beforeEach(async () => {
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig, })
			vol.mkdirSync(OUTPUT_DIR)

			const features: string = JSON.stringify(featureWithName('Login de usuário'))
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should save an html file', () => {
			expect(require('fs').writeFile).toBeCalledWith(`${OUTPUT_DIR}/login_de_usuario.html`, expect.anything())
			expect(memfs.existsSync(`${OUTPUT_DIR}/login_de_usuario.html`)).toBe(true)
		})

		it('should list the generated file in the console', () => {
			const printGeneratedeFiles = (Printer as jest.Mock).mock.instances[0].printGeneratedFiles
			expect(printGeneratedeFiles).toBeCalledWith(['outputDir/login_de_usuario.html'])
		})
	})

	describe('without features', () => {
		beforeEach(async () => {
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig, })
			vol.mkdirSync(OUTPUT_DIR)

			const features = '{ "features": [] }'
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should show an error message', async () => {
			const printErrorMessage = (Printer as jest.Mock).mock.instances[0].printErrorMessage
			expect(printErrorMessage).toBeCalledWith(expect.stringContaining('No features found'))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})

	describe('without the outputDir flag', () => {
		beforeEach(async () => {
			mockFiles({ 'concordialang-ui-html.json': completeAppConfig })

			const features: string = JSON.stringify(featureWithName('Login de usuário'))
			await Generate.run(['--features', features])
		})

		it('should show an error message', async () => {
			const printErrorMessage = (Printer as jest.Mock).mock.instances[0].printErrorMessage
			expect(printErrorMessage).toBeCalledWith(expect.stringContaining('Missing required flag'))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})

	describe('without an app config', () => {
		beforeEach(async () => {
			const features: string = JSON.stringify(featureWithName('Login de usuário'))
			await Generate.run(['--features', features, '--outputDir', OUTPUT_DIR])
		})

		it('should show an error message', async () => {
			const printErrorMessage = (Printer as jest.Mock).mock.instances[0].printErrorMessage
			expect(printErrorMessage).toBeCalledWith(expect.stringContaining('Config file not found'))
		})

		it('should not write any file', () => {
			expect(require('fs').writeFile).not.toBeCalled
		})
	})
})
