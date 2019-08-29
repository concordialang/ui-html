import { Widget } from 'concordialang-ui-core';
export default class Body extends Widget {
    private _widgets;
    constructor(_widgets: Widget[]);
    renderToString(): string;
}
