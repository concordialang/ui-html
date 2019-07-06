import { convertCase } from './case-converter'

export const PROPS_INJECTION_POINT = '%s'

export function formatProperties(props: any, validProperties: string[], caseType: string = 'camel'): string {
    const translateProp = (key: string) => {
        switch(key) {
            case 'format': return 'pattern';
            default: return key;
        }
    }

    const getFormattedProp = (key: string) => {
        let value = convertCase(props[key].toString(), caseType)
        return `${translateProp(key)}="${value}"`
    }

	const formatValid = (result: string, prop: string) => {
        return validProperties.includes(prop)
            ? result + getFormattedProp(prop) + ' '
            : result
    }

    return Object.keys(props).reduce(formatValid, '').trimRight()
}
