// It needs to install:
// npm i --save-dev jest @types/ts-jest memfs html-minifier
//
import { vol, fs } from 'memfs';
import { minify } from 'html-minifier';
import Generator from '../src/classes/generator';

describe( 'Generator', () => {

    const CURRENT_DIR: string = process.cwd();

    let generator: Generator;

    beforeEach( () => {
       vol.mkdirpSync( CURRENT_DIR, { recursive: true } ); // Synchronize with the current fs structure
       generator = new Generator( fs ); // Cria com o fs em memória
    } );

    afterEach( () => {
        generator = null;
        vol.reset(); // Erase in-memory structure
    } );

    expectFeaturesProduceHtml( features: Feature[], htmls: string[] ): void {
        const files: string[] = await generator.generate( features );
        expect( files ).toHaveLength( htmls.length );
        for ( let i in files ) {
            this.expectFileHasHtml( files[ i ], htmls[ i ] );
        }
    }

    expectFileHasHtml( filePath: string, html: string ): void {
        const expected = minify( html );
        const produced = minify( await fs.readFile( firstFile ) );
        expected( produced ).toEqual( expected );
    }

    it( 'produces an HTML file from a single button', async () => {
        const features: Features = [  /* algo aqui */ ];
        const htmls: string[] = [ `
        <html>
            ... colocar aqui o que se espera gerar
        </html>
        ` ];
        expectFeaturesProduceHtml( features, htmls );
    } );

} );