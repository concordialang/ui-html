'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
class ConfigLoader {
	constructor(_config) {
		this._config = _config
	}
	getInputDefinition() {
		return lodash_1.get(this._config, 'config.widgets.input')
	}
}
exports.ConfigLoader = ConfigLoader
