import { Widget } from 'concordialang-ui-core';
import { WidgetConfig } from '../interfaces/app-config';
export default class Checkbox extends Widget {
    private _config;
    private readonly VALID_PROPERTIES;
    constructor(props: any, name: string, _config: WidgetConfig);
    renderToString(): string;
}
