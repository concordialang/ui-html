import { Widget } from 'concordialang-ui-core';
export declare class Input extends Widget {
    private readonly VALID_PROPERTIES;
    constructor(props: any, name?: string);
    renderToString(): string;
    private getType;
    private typeForDataType;
}
