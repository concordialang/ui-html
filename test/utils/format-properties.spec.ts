import { formatProperties } from '../../src/utils/prop'

describe('formatProperties', () => {
	describe('when there is an invalid property', () => {
		const props = {
			id: 'id',
			name: 'name',
			required: true,
			foo: 'bar'
		}

		const validProperties = ['id', 'name', 'required']

		it('produces a string with the valid properties only', () => {
			expect(formatProperties(props, validProperties)).toEqual('id="id" name="name" required="true"')
		})
	})
})
