import { Feature, Prototyper } from 'concordialang-ui-core';
export default class Generator implements Prototyper {
    private _fs;
    constructor(_fs?: any);
    generate(features: Feature[]): Promise<string[]>;
    private createHtmlFile;
}
