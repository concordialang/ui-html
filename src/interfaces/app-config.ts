export interface AppConfig {
	widgets?: {
		[key: string]: WidgetConfig,
	}
}

export interface WidgetConfig {
	opening: string,
	closure?: string,
	optionOpening?: string,
	optionClosure?: string,
	wrapperOpening?: string,
	wrapperClosure?: string,
	label?: WidgetConfig
}
