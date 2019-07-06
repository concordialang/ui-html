import { vol } from 'memfs'

const loadConfigFile = (filePath) => {
	const fileContent: string = vol.readFileSync(filePath, 'utf8') as string
	const config = JSON.parse(fileContent)
	return { config }
}

const explorer = { loadSync: loadConfigFile }

const cosmiconfig = jest.fn(() => explorer)

module.exports = cosmiconfig
