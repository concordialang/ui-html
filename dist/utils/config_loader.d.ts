import { CustomConfig, WidgetConfig } from '../interfaces/custom_config';
export declare class ConfigLoader {
    private _config;
    constructor(_config: CustomConfig);
    getInputDefinition(): WidgetConfig;
}
