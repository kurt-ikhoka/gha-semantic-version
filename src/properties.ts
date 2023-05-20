import * as fs from 'fs'

export class Properties {
  private filePath: string
  private properties: {[key: string]: string} = {}

  constructor(filePath: string) {
    this.filePath = filePath
    this.loadProperties()
  }

  private loadProperties(): void {
    const content = fs.readFileSync(this.filePath, 'utf8')
    const lines = content.split('\n')

    for (const line of lines) {
      if (line.trim() !== '' && !line.startsWith('#')) {
        const [key, value] = line.split('=')
        this.properties[key.trim()] = value.trim()
      }
    }
  }

  getValue(key: string): string | undefined {
    return this.properties[key]
  }

  setValue(key: string, value: string): void {
    this.properties[key] = value
  }

  saveToFile(): void {
    let content = ''
    for (const key in this.properties) {
      const value = this.properties[key]
      content += `${key}=${value}\n`
    }
    fs.writeFileSync(this.filePath, content, 'utf8')
  }
}
