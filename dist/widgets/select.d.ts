import { Widget } from 'concordialang-ui-core';
import { WidgetConfig } from '../interfaces/app-config';
export default class Select extends Widget {
    private _config;
    private readonly SELECT_VALID_PROPERTIES;
    private readonly OPTION_VALID_PROPERTIES;
    constructor(props: any, name: string, _config: WidgetConfig);
    renderToString(): string;
    private getOptions;
}
