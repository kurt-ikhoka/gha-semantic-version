export class PreRelease {
  private static readonly DEFAULT_INIT_PART: string = '0'
  private static readonly onlyNumberRegex: RegExp = new RegExp('^[0-9]+$')
  private static readonly onlyAlphaNumericAndHyphenRegex: RegExp = new RegExp(
    '^[0-9A-Za-z-]+$'
  )

  static readonly default: PreRelease = new PreRelease([
    PreRelease.DEFAULT_INIT_PART
  ])

  private constructor(private parts: string[]) {}

  static create(preReleaseString: string): PreRelease {
    return new PreRelease(this.validate(preReleaseString))
  }

  get identity(): string {
    return this.parts[0]
  }

  increment(): PreRelease {
    const newParts = [...this.parts]
    const lastNumericItem = newParts
      .slice()
      .reverse()
      .find(item => !isNaN(parseInt(item)))
    if (lastNumericItem !== undefined) {
      const lastNumericIndex = newParts.lastIndexOf(lastNumericItem)
      newParts[lastNumericIndex] = (parseInt(lastNumericItem) + 1).toString()
    } else {
      newParts.push(PreRelease.DEFAULT_INIT_PART)
    }
    return new PreRelease(newParts)
  }

  compare(other: PreRelease): number {
    const thisSize = this.parts.length
    const otherSize = other.parts.length
    const count = Math.min(thisSize, otherSize)
    for (let i = 0; i < count; i++) {
      const partResult = this.compareParts(this.parts[i], other.parts[i])
      if (partResult !== 0) return partResult
    }
    return thisSize - otherSize
  }

  equals(other: PreRelease | null): boolean {
    return other !== null && this.compare(other) === 0
  }

  toString(): string {
    return this.parts.join('.')
  }

  private compareParts(part1: string, part2: string): number {
    const firstPart = parseInt(part1)
    const secondPart = parseInt(part2)

    if (!isNaN(firstPart) && isNaN(secondPart)) {
      return -1
    } else if (isNaN(firstPart) && !isNaN(secondPart)) {
      return 1
    } else if (!isNaN(firstPart) && !isNaN(secondPart)) {
      return firstPart - secondPart
    } else {
      return part1.localeCompare(part2)
    }
  }

  private static validate(preReleaseString: string): string[] {
    if (preReleaseString.trim() === '') {
      return [this.DEFAULT_INIT_PART]
    }

    const parts = preReleaseString.trim().split('.')
    for (const part of parts) {
      let error: string | null = null
      if (part === '') {
        error = 'Pre-release identity contains an empty part.'
      } else if (
        this.onlyNumberRegex.test(part) &&
        part.length > 1 &&
        part.startsWith('0')
      ) {
        error = `Pre-release part '${part}' is numeric but contains a leading zero.`
      } else if (!this.onlyAlphaNumericAndHyphenRegex.test(part)) {
        error = `Pre-release part '${part}' contains an invalid character.`
      }
      if (error) {
        throw new Error(`${error} (${preReleaseString})`)
      }
    }

    return parts
  }
}
