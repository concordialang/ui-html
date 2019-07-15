import { formatProperties } from '../../src/utils/prop'

describe('formatProperties', () => {
	const props = {
		id: 'id',
		name: 'name',
		required: true
	}

	it('produces a string with the properties', () => {
		expect(formatProperties(props)).toEqual('id="id" name="name" required="true"')
	})
})
