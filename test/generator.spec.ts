import { Feature } from 'concordialang-ui-core'
import { minify } from 'html-minifier'
import { fs, vol } from 'memfs'
import { promisify } from 'util'

import HtmlUIPrototyper from '../src/html-ui-prototyper'

describe('HtmlUIPrototyper', () => {

    const CURRENT_DIR: string = process.cwd()

    let prototyper: HtmlUIPrototyper | null

    beforeEach(() => {
		vol.fromJSON({
			'/concordialang-ui-html.json': '{}'
		}, CURRENT_DIR)
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

    it('produces an HTML file from features', async () => {
        const features: Feature[] = [  /* something here */ ]
        const htmls: string[] = [ /* put the expected html here */];
        await expectFeaturesToProduceHtml(features, htmls)
    })

})
