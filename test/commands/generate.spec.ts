import Generate from '../../src/commands/generate'

describe('Generate', () => {

    it('should print a JSON content', async () => {
        let spy = jest.spyOn(process.stdout, 'write');
        await Generate.run([]) // TODO: pass a parameter
        // expect(spy).toBeCalledWith({})
        expect(spy).not.toBeCalled() // TODO: change this assertion
    })

})