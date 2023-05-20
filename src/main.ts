import * as core from '@actions/core'
import {Validator} from './validator'
import {SemanticVersion} from './semantic-version'

async function run(): Promise<void> {
  try {
    const update_type: string = core.getInput('update-type')
    const version_name: string = core.getInput('version-name')
    const version_code: string = core.getInput('version-code')
    const version_file: string = core.getInput('version-file')
    const validator = new Validator(
      update_type,
      version_name,
      version_code,
      version_file
    )
    core.debug(`update_type: ${update_type}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`version_name: ${version_name}`)
    core.debug(`version_code: ${version_code}`)
    core.debug(`version_file: ${version_file}`)

    validator.checkUpdateType()
    validator.checkVersioning()
    core.debug('all credentials are valid')
    const version = new SemanticVersion()
    const result = version.update(
      update_type,
      version_name,
      parseInt(version_code),
      version_file
    )
    core.setOutput('new-version-name', result.version_name)
    core.setOutput('new-version-code', result.version_code)
    core.setOutput('success', 'true')
  } catch (error) {
    if (error instanceof Error) {
      core.error(error.message)
    }
    // eslint-disable-next-line no-console
    console.log(error)
    core.setFailed('failed to publish app')
  }
}
run()
