import { Widget } from 'concordialang-ui-core';
import { AppConfig } from '../interfaces/app-config';
export default class Head extends Widget {
    private _config;
    constructor(_config: AppConfig);
    renderToString(): string;
    private formatExternalSources;
}
