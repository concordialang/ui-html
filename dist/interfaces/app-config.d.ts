export interface AppConfig {
    widgets?: {
        input?: WidgetConfig;
        radio?: WidgetConfig;
        checkbox?: WidgetConfig;
        select?: WidgetConfig;
        label?: LabelConfig;
    };
}
export interface WidgetConfig {
    opening: string;
    closure?: string;
    optionOpening?: string;
    optionClosure?: string;
    wrapperOpening?: string;
    wrapperClosure?: string;
    label?: LabelConfig;
}
interface LabelConfig {
    opening: string;
    closure: string;
}
export {};
