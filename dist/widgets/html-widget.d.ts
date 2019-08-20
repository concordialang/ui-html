import { Widget } from 'concordialang-ui-core';
import { WidgetConfig } from '../interfaces/app-config';
export default abstract class HtmlWidget extends Widget {
    private _config;
    constructor(props: any, name: string, _config: WidgetConfig);
    renderToString(): string;
    protected abstract getFormattedProps(props: any): string;
    private renderWidgetWithSingleValue;
    private renderOneWidgetPerValue;
    private renderWidgetWithMultipleValues;
}
