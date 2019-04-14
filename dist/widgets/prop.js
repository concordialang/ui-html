"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatProperties(props, validProperties) {
    const getFormattedProp = (key) => `${key}="${props[key]}"`;
    const formatValid = function (result, key) {
        return validProperties.includes(key)
            ? result + getFormattedProp(key)
            : result;
    };
    return Object.keys(props).reduce(formatValid, '');
}
exports.formatProperties = formatProperties;
