import Printer from '../../src/utils/printer'

describe('Printer', () => {
	describe('printGeneratedFiles', () => {
		let consoleOutputSpy

		const files: string[] = [
			'file1.html',
			'file2.html',
			'file3.html'
		]

		beforeAll(() => {
			consoleOutputSpy = jest.spyOn(process.stdout, 'write')
			new Printer().printGeneratedFiles(files)
		})

		it('should print all files', () => {
			expect(consoleOutputSpy).toBeCalled
		})
	})

	describe('printErrorMessage', () => {
		let consoleOutputSpy

		const message = 'Test error message'

		beforeAll(() => {
			consoleOutputSpy = jest.spyOn(process.stdout, 'write')
			new Printer().printErrorMessage(message)
		})

		it('should print the error message', () => {
			expect(consoleOutputSpy).toBeCalled
		})
	})
})
