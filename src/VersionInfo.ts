export class VersionInfo {
  readonly version_name: string
  readonly version_code: number

  constructor(version_name: string, version_code: number) {
    this.version_name = version_name
    this.version_code = version_code
  }
}
