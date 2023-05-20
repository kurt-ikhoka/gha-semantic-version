export class Patterns {
  // Numeric identifier pattern. (used for parsing major, minor, and patch)
  private static NUMERIC = '0|[1-9]\\d*'

  // Alphanumeric or hyphen pattern.
  private static ALPHANUMERIC_OR_HYPHEN = '[0-9a-zA-Z-]'

  // Letter or hyphen pattern.
  private static LETTER_OR_HYPHEN = '[a-zA-Z-]'

  // Non-numeric identifier pattern. (used for parsing pre-release)
  private static NON_NUMERIC = `\\d*${Patterns.LETTER_OR_HYPHEN}${Patterns.ALPHANUMERIC_OR_HYPHEN}*`

  // Dot-separated numeric identifier pattern. (<major>.<minor>.<patch>)
  private static CORE_VERSION = `(${Patterns.NUMERIC})\\.(${Patterns.NUMERIC})\\.(${Patterns.NUMERIC})`

  // Dot-separated loose numeric identifier pattern. (<major>(.<minor>)?(.<patch>)?)
  private static LOOSE_CORE_VERSION = `(${Patterns.NUMERIC})(?:\\.(${Patterns.NUMERIC}))?(?:\\.(${Patterns.NUMERIC}))?`

  // Numeric or non-numeric pre-release part pattern.
  private static PRE_RELEASE_PART = `(?:${Patterns.NUMERIC}|${Patterns.NON_NUMERIC})`

  // Pre-release identifier pattern. A hyphen followed by dot-separated
  // numeric or non-numeric pre-release parts.
  private static PRE_RELEASE = `(?:-(${Patterns.PRE_RELEASE_PART}(?:\\.${Patterns.PRE_RELEASE_PART})*))`

  // Build-metadata identifier pattern. A + sign followed by dot-separated
  // alphanumeric build-metadata parts.
  private static BUILD = `(?:\\+(${Patterns.ALPHANUMERIC_OR_HYPHEN}+(?:\\.${Patterns.ALPHANUMERIC_OR_HYPHEN}+)*))`

  // List of allowed operations in a condition.
  private static ALLOWED_OPERATORS = '||=|!=|<|<=|=<|>|>=|=>|\\^|~>|~'

  // Numeric identifier pattern for parsing conditions.
  private static X_RANGE_NUMERIC = `${Patterns.NUMERIC}|x|X|\\*`

  // X-RANGE version: 1.x | 1.2.* | 1.1.X
  private static X_RANGE_VERSION = `(${Patterns.X_RANGE_NUMERIC})(?:\\.(${Patterns.X_RANGE_NUMERIC})(?:\\.(${Patterns.X_RANGE_NUMERIC})(?:${Patterns.PRE_RELEASE})?${Patterns.BUILD}?)?)?`

  // Pattern that only matches numbers.
  static ONLY_NUMBER_REGEX = '^[0-9]+$'

  // Pattern that only matches alphanumeric or hyphen characters.
  static ONLY_ALPHANUMERIC_OR_HYPHEN_REGEX = `^${Patterns.ALPHANUMERIC_OR_HYPHEN}+$`

  // Version parsing pattern: 1.2.3-alpha+build
  static VERSION_REGEX = `^${Patterns.CORE_VERSION}${Patterns.PRE_RELEASE}?${Patterns.BUILD}?$`

  // Prefixed version parsing pattern: v1.2-alpha+build
  static LOOSE_VERSION_REGEX = `^v?${Patterns.LOOSE_CORE_VERSION}${Patterns.PRE_RELEASE}?${Patterns.BUILD}?$`

  // Operator condition: >=1.2.*
  static OPERATOR_CONDITION_REGEX = `(${Patterns.ALLOWED_OPERATORS})\\s*v?(?:${Patterns.X_RANGE_VERSION})`

  // Hyphen range condition: 1.2.* - 2.0.0
  static HYPHEN_CONDITION_REGEX = `\\s*v?(?:${Patterns.X_RANGE_VERSION})\\s+-\\s+v?(?:${Patterns.X_RANGE_VERSION})\\s*`
}
