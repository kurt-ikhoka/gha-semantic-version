import {SemanticVersion} from '../src/semantic-version'
import {describe, expect, it} from '@jest/globals'
import {Properties} from "../src/properties";
import * as path from 'path'



const file_path = path.join(__dirname, '.', 'version.properties');
function resetFile() {
    const properties = new Properties(file_path);
    properties.setValue('version', '1.0.0');
    properties.setValue('code', '0');
    properties.saveToFile();
}


describe('version updates without properties file', () => {
    const version = new SemanticVersion("version","code");

    it('can update a versions patch number', () => {
        const version = new SemanticVersion();
        const new_version = version.update('patch', '1.0.0', 'alpha',0, undefined);
        expect(new_version.version_name).toEqual("1.0.1");
        expect(new_version.version_code).toEqual(1);
    })

    it('can update a versions minor number', () => {
        const new_version = version.update('minor', '1.0.0', undefined,0, undefined);
        expect(new_version.version_name).toEqual("1.1.0");
        expect(new_version.version_code).toEqual(1);
    })

    it('can update a versions major number', async () => {
        const new_version = version.update('major', '1.1.0', 'alpha',0, undefined);
        expect(new_version.version_name).toEqual("2.0.0");
        expect(new_version.version_code).toEqual(1);
    })

    it('can update a versions build', async () => {
        const new_version = version.update('build', '1.0.0', "beta",400, undefined);
        expect(new_version.version_name).toEqual("1.0.0-beta401");
        expect(new_version.version_code).toEqual(401);
    })

    it('can update a pre-release to a patch release', async () => {
        const new_version = version.update('patch', '1.0.0-beta.400', "beta",400, undefined);
        expect(new_version.version_name).toEqual("1.0.0");
        expect(new_version.version_code).toEqual(401);
    })

    it('can update a pre-release to a minor release', async () => {
        const new_version = version.update('minor', '1.0.0-beta.400', "beta",400, undefined);
        expect(new_version.version_name).toEqual("1.1.0");
        expect(new_version.version_code).toEqual(401);
    })

    it('can update a pre-release to a major release', async () => {
        const new_version = version.update('major', '1.0.0-beta.400', "beta",400, undefined);
        expect(new_version.version_name).toEqual("2.0.0");
        expect(new_version.version_code).toEqual(401);
    })
})

describe('version updates with properties file', () => {
    const version = new SemanticVersion("version","code");

    it('can update a versions patch number', () => {
        const new_version = version.update('patch', undefined, "beta",undefined,file_path);
        const properties = new Properties(file_path);
        expect(properties.getValue('version')).toEqual("1.0.1");
        expect(properties.getValue('code')).toEqual('1');
        resetFile()
    })

    it('can update a versions minor number', () => {
        const new_version = version.update('minor', undefined, "alpha",undefined,file_path);
        const properties = new Properties(file_path);
        expect(properties.getValue('version')).toEqual("1.1.0");
        expect(properties.getValue('code')).toEqual('1');
        resetFile();
    })

    it('can update a versions major number', async () => {
        const new_version = version.update('major', undefined, "beta",undefined,file_path);
        const properties = new Properties(file_path);
        expect(properties.getValue('version')).toEqual("2.0.0");
        expect(properties.getValue('code')).toEqual('1');
        resetFile();
    })

    it('can update a versions build', async () => {
        const new_version = version.update('build', undefined, "rc",undefined,file_path);
        const properties = new Properties(file_path);
        expect(properties.getValue('version')).toEqual("1.0.0-rc1");
        expect(properties.getValue('code')).toEqual('1');
        resetFile();
    })
})






