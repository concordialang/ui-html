import { WidgetConfig } from '../interfaces/app-config';
import HtmlWidget from './html-widget';
export default class Button extends HtmlWidget {
    constructor(props: any, name: string, config: WidgetConfig);
    protected getFormattedProps(props: any): string;
    private getType;
}
