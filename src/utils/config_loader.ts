import { get } from 'lodash';
import { CustomConfig, WidgetConfig } from '../interfaces/custom_config';

export class ConfigLoader {
	constructor(private _config: CustomConfig) {}

	public getInputDefinition(): WidgetConfig {
		return get(this._config, 'config.widgets.input')
	}
}
