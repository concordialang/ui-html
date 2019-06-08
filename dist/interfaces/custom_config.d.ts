export interface CustomConfig {
    widgets?: {
        input?: WidgetConfig;
    };
}
export interface WidgetConfig {
    opening: string;
    closure?: string;
    header?: string;
    footer?: string;
}
export declare const WIDGET_OPENING = "opening";
export declare const WIDGET_CLOSURE = "closure";
export declare const WIDGET_WRAPPER_OPENING = "header";
export declare const WIDGET_WRAPPER_CLOSURE = "footer";
