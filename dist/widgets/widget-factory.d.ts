import { UiElement, Widget } from 'concordialang-ui-core';
import { ConfigLoader } from '../utils/config_loader';
export default class WidgetFactory {
    private _configLoader;
    constructor(_configLoader: ConfigLoader);
    create(element: UiElement): Widget;
    private createInputElement;
}
