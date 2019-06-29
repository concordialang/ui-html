export interface AppConfig {
	widgets?: {
		input?: WidgetConfig,
		label?: LabelConfig
	}
}

export interface WidgetConfig {
	opening: string,
	closure?: string,
	wrapperOpening?: string,
	wrapperClosure?: string,
	label?: LabelConfig
}

interface LabelConfig {
	opening: string,
	closure: string
}
