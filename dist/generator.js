"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const util_1 = require("util");
const widget_factory_1 = require("./widgets/widget-factory");
class Generator {
    constructor(_fs = fs) {
        this._fs = _fs;
    }
    generate(features) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const factory = new widget_factory_1.default();
            let createFilePromises = [];
            for (let feature of features) {
                const widgets = [];
                for (let element of feature.uiElements) {
                    const widget = factory.create(element);
                    widgets.push(widget);
                }
                const createFilePromise = this.createHtmlFile(feature.name, widgets);
                createFilePromises.push(createFilePromise);
            }
            return Promise.all(createFilePromises);
        });
    }
    createHtmlFile(fileName, widgets) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //TODO format content
            let content = widgets.reduce((result, widget) => {
                return result + widget.renderToString() + '\n';
            }, '');
            content = `<div>${content}</div>`;
            const writeF = util_1.promisify(this._fs.writeFile);
            const fullName = fileName + '.html';
            yield writeF(fullName, content);
            return fullName;
        });
    }
}
exports.default = Generator;
