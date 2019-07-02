import { fs, vol } from 'memfs'
const cosmiconfig = require('cosmiconfig')

import Generate from '../../src/commands/generate'

jest.mock('cosmiconfig')

describe('Generate', () => {

    const CURRENT_DIR: string = process.cwd()

    beforeEach(() => {
		vol.fromJSON({
			'./concordialang-ui-html.json': '{}'
		}, CURRENT_DIR)

		const explorer = {
			loadSync: () => ({
				config: vol.readFileSync(`${ CURRENT_DIR }/concordialang-ui-html.json`, 'utf8')
			})
		}
		cosmiconfig.mockReturnValue(explorer)
    })

    it('should print a JSON content', async () => {
        let spy = jest.spyOn(process.stdout, 'write');
		await Generate.run(['--features', '{ "features": [] }', '--outputDir', 'outputDir'])
        expect(spy).toBeCalledWith("No features found\n")
    })

})
