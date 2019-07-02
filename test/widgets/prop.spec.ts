import { formatProperties } from '../../src/utils/prop'

describe('formatProperties', () => {
	it('creates a string with the valid properties', () => {
		const props = { id: 'id', name: 'name', value: 'value' }
		const validProperties = ['id', 'name']
		expect(formatProperties(props, validProperties)).toBe('id="id" name="name"')
	})
})
