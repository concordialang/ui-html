import { WidgetConfig } from '../interfaces/app-config';
import HtmlWidget from './html-widget';
export default class Select extends HtmlWidget {
    private readonly VALID_PROPERTIES;
    constructor(props: any, name: string, config: WidgetConfig);
    protected getFormattedProps(props: any): string;
}
