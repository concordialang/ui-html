"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concordialang_ui_core_1 = require("concordialang-ui-core");
const prop_1 = require("./prop");
class Input extends concordialang_ui_core_1.Widget {
    constructor(props, name) {
        super(props, name);
        this.VALID_PROPERTIES = ['id', 'editable', 'minlength', 'maxlength', 'required', 'format'];
    }
    renderToString() {
        const inputType = this.getType(this.props.datatype);
        const properties = prop_1.formatProperties(this.props, this.VALID_PROPERTIES);
        const label = (this.name) ? `<label for="${this.name}">${this.name}</label>` : '';
        return `${label} <input ${inputType} ${properties}/>`;
    }
    getType(datatype) {
        const typeProperty = this.typeForDataType(datatype);
        return `type="${typeProperty}"`;
    }
    typeForDataType(datatype) {
        switch (datatype) {
            case "integer" /* INTEGER */:
            case "double" /* DOUBLE */: return 'number';
            case "time" /* TIME */: return 'time';
            case "datetime" /* DATETIME */: return 'datetime-local';
        }
        return 'text';
    }
}
exports.Input = Input;
