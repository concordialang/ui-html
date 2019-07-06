const util = jest.requireActual('util')

function promisify(fn) {
	return (...args) => {
		return new Promise(resolve => {
			resolve(fn(...args))
		})
	}
}

util.promisify = promisify

module.exports = util
