import { Widget } from 'concordialang-ui-core';
import { WidgetConfig } from '../interfaces/custom_config';
export declare class Input extends Widget {
    private _customDefinition?;
    private readonly VALID_PROPERTIES;
    constructor(props: any, name: string, _customDefinition?: WidgetConfig | undefined);
    renderToString(): string;
    private createInput;
    private wrap;
    private getType;
}
