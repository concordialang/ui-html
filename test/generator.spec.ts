import { Feature } from 'concordialang-ui-core'
import { minify } from 'html-minifier'
import { fs, vol } from 'memfs'
import { promisify } from 'util'

import Generator from '../src/generator'

describe('Generator', () => {

    const CURRENT_DIR: string = process.cwd()

    let generator: Generator | null

    beforeEach(() => {
        vol.mkdirpSync(CURRENT_DIR) // Synchronize with the current fs structure
        generator = new Generator(fs) // In-memory fs
    })

    afterEach(() => {
        vol.reset() // Erase in-memory structure
        generator = null
    })

    async function expectFeaturesToProduceHtml(features: Feature[], htmls: string[]): Promise<void> {
        if (! generator) {
            generator = new Generator(fs)
        }
        const files: string[] = await generator.generate(features)
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

    it('produces an HTML file from a single button', async () => {
        const features: Feature[] = [  /* something here */ ]
        const htmls: string[] = [ /* put the expected html here */];
        await expectFeaturesToProduceHtml(features, htmls)
    })

})
