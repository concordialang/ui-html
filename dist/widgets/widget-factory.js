"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("./button");
const input_1 = require("./input");
class WidgetFactory {
    create(element) {
        switch (element.widget) {
            case "textbox" /* TEXTBOX */: return new input_1.Input(element.props, element.name);
            case "button" /* BUTTON */: return new button_1.Button(element.props, element.name);
            default: return new input_1.Input(null);
        }
    }
}
exports.default = WidgetFactory;
