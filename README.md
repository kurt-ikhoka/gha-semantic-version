<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Github Action for Semantic Versioning 2.0.0 updates

This Github action will help increment a given semantic version. It is inspired by the [kotlin-semver](https://github.com/z4kn4fein/kotlin-semver) implementation. 

## Example Usage

```yaml
uses: kurt-ikhokha/gha-semantic-version
with:
  version-name: '3.4.0' #required if version-file not provided
  version-code:  4196 #required if version-file not provided
  update-type: 'patch'. # major, minor, patch, build 
  version-file: 'path to version.properties file' # required if version-name and version-code are not provided
```

The `version.properties` file should be in the following format:

```properties
version.name=3.4.0
version.code=4196
```

## Contribution

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  

```bash
$ npm test

 PASS  __tests__/semantic-version.test.ts
  version updates without properties file
  ✓ can update a versions patch number (1 ms)
  ✓ can update versions minor number
  ✓ can update versions major number
  ✓ can update a version build
...
```
