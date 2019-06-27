export interface AppConfig {
	widgets?: {
		input?: WidgetConfig
	}
}

export interface WidgetConfig {
	opening: string,
	closure?: string,
	wrapperOpening?: string,
	wrapperClosure?: string
}
