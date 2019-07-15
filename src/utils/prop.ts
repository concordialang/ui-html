import { convertCase } from './case-converter'

export function formatProperties(props: any, caseType: string = 'camel'): string {
    const translateProp = (key: string) => {
        switch(key) {
            case 'format': return 'pattern';
            default: return key;
        }
    }

	const getValueOf = (key: string) => (convertCase(props[key].toString(), caseType))

	const format = (result: string, key: string) => {
		const value = getValueOf(key)
		const htmlProp = translateProp(key)
		return result + `${htmlProp}="${value}"` + ' '
    }

    return Object.keys(props).reduce(format, '').trimRight()
}
