import { vol } from 'memfs'

const fs = jest.requireActual('fs')

const mockedWriteFile = (path: string, content: string) => {
	vol.writeFileSync(path, content)
}

jest.spyOn(fs, 'writeFile').mockImplementation(mockedWriteFile)

module.exports = fs
