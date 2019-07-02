import { UiElement, Widget } from 'concordialang-ui-core';
import { AppConfig } from '../interfaces/app-config';
export default class WidgetFactory {
    private _config;
    constructor(_config: AppConfig);
    create(element: UiElement): Widget;
    private createInputElement;
    private createRadioElement;
    private createCheckboxElement;
    private createSelectElement;
    private createButtonElement;
}
