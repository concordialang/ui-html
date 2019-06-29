export const PROPS_INJECTION_POINT = '%s'

export function formatProperties(props: any, validProperties: string[]): string {
    const translateProp = (key: string) => {
        switch(key) {
            case 'format': return 'pattern';
            default: return key;
        }
    }

    const getFormattedProp = (key: string) => {
        let value = props[key]
        const invalidIdPattern = /^\/\//

        if(key === 'id') {
            let newKey = key
			// TODO: replace test wit str.match(pattern)
            if(!invalidIdPattern.test(value)) {
                const validIdPattern = /^#|~/
                const validClassPattern = /^\./

                if(validIdPattern.test(value)) {
                    value = value.toString().replace(validIdPattern, '')
                } else if(validClassPattern.test(value)) {
                    newKey = 'class'
                    value = value.toString().replace(validClassPattern, '')
                }
                return `${translateProp(newKey)}="${value}"`
            }
        }

        return `${translateProp(key)}="${value}"`
    }

	const formatValid = (result: string, prop: string) => {
        return validProperties.includes(prop)
            ? result + getFormattedProp(prop) + ' '
            : result
    }

    return Object.keys(props).reduce(formatValid, '').trimRight()
}
