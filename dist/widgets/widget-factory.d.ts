import { UiElement, Widget } from 'concordialang-ui-core';
import { AppConfig } from '../interfaces/app-config';
import Body from './body';
import Head from './head';
export default class WidgetFactory {
    private _config;
    constructor(_config: AppConfig);
    createHead(): Head;
    createBody(widgets: Widget[]): Body;
    create(element: UiElement): Widget;
    private createInputElement;
    private createRadioElement;
    private createCheckboxElement;
    private createSelectElement;
    private createButtonElement;
}
