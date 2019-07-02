import { Feature } from 'concordialang-ui-core'
import { minify } from 'html-minifier'
import { fs, vol } from 'memfs'
import { promisify } from 'util'
const cosmiconfig = require('cosmiconfig')

import HtmlUIPrototyper from '../src/html-ui-prototyper'

jest.mock('cosmiconfig')

describe('HtmlUIPrototyper', () => {

    const CURRENT_DIR: string = process.cwd()
    let prototyper: HtmlUIPrototyper | null
	const appConfig = {
		widgets: {
			input: {},
			label: {}
		}
	}

    beforeEach(() => {
		vol.fromJSON({
			'./concordialang-ui-html.json': JSON.stringify(appConfig)
		}, CURRENT_DIR)

		const explorer = {
			loadSync: () => ({
				config: vol.readFileSync(`${ CURRENT_DIR }/concordialang-ui-html.json`, 'utf8')
			})
		}
		cosmiconfig.mockReturnValue(explorer)

        prototyper = new HtmlUIPrototyper(fs, CURRENT_DIR) // In-memory fs
    })

    afterEach(() => {
        vol.reset() // Erase in-memory structure
        prototyper = null
    })

    async function expectFeaturesToProduceHtml(features: Feature[], htmls: string[]): Promise<void> {
        if (! prototyper) {
            prototyper = new HtmlUIPrototyper(fs, CURRENT_DIR)
        }
        const files: string[] = await prototyper.generate(features)
        expect(files).toHaveLength(htmls.length)
        // tslint:disable-next-line:forin
        for (let i in files) {
            await expectFileToHaveHtml(files[i], htmls[i])
        }
    }

    async function expectFileToHaveHtml(filePath: string, html: string): Promise<void> {
        const expected: string = minify(html)
        const readF = promisify(fs.readFile)
        const content: string = await readF(filePath)
        const produced: string = minify(content)
        expect(produced).toEqual(expected)
    }

	// FIXME the content of app config file is a string. It should be an object.
	// Maybe we will have to mock loadJson from cosmiconfig.
    xit('produces an HTML file from features', async () => {
		const features: Feature[] = [ { name: 'Test Feature', uiElements: [ { name: 'Name', widget: 'textbox', props: { id: 'name' }, position: 0 } ], position: 0 } ]
        const htmls: string[] = [ /* put the expected html here */];
        await expectFeaturesToProduceHtml(features, htmls)
    })

})
