import { Feature, Prototyper } from 'concordialang-ui-core';
export default class Generator implements Prototyper {
    private _fs;
    private _outputDir;
    constructor(_fs: any, _outputDir: string);
    generate(features: Feature[]): Promise<string[]>;
    private createHtmlFile;
}
