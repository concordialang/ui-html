import Generate from '../../src/commands/generate'

describe('Generate', () => {

    it('should print a JSON content', async () => {
        let spy = jest.spyOn(process.stdout, 'write');
		await Generate.run(['--features', '[]', '--outputDir', 'outputDir'])
        expect(spy).not.toBeCalled()
    })

})
