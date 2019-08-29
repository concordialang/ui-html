export interface AppConfig {
    widgets?: {
        [key: string]: WidgetConfig;
    };
    externalLinks?: string[];
    externalScripts?: string[];
}
export interface WidgetConfig {
    template?: string;
    widget: {
        opening: string;
        closure?: string;
        onePerValue?: boolean;
    };
    valueWrapper?: {
        opening: string;
        closure: string;
    };
    wrapper?: {
        opening: string;
        closure: string;
    };
    label?: {
        opening: string;
        closure: string;
    };
}
