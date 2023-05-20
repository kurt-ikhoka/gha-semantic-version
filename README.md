<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Github Action for Semantic Versioning 2.0.0 updates

This Github action will help increment a given semantic version. It is inspired by the [kotlin-semver](https://github.com/z4kn4fein/kotlin-semver) implementation. 

## Usage

```yaml
uses: kurt-ikhokha/gha-semantic-version
with:
  version-name: '3.4.0' #required if version-file not provided
  version-code:  4196 #required if version-file not provided
  update-type: 'patch'. # major, minor, patch, build 
  version-file: 'path to version.properties file' # required if version-name and version-code are not provided
```
Examples
```yaml
      - name: 'PATCH version update'
        uses: kurt-ikhokha/gha-semantic-version@v1
        id: patch
        with:
          version-name: '1.0.0'
          version-code:  0
          update-type: 'patch'
      - name: 'Get Patched version'
        run: |
          echo "Patched 1.0.0"
          echo "Version name: ${{ steps.patch.outputs.new-version-name }}"
          echo "Version code: ${{ steps.patch.outputs.new-version-code }}"
     
      - name: 'MINOR version update'
        uses: kurt-ikhokha/gha-semantic-version@v1
        id: minor
        with:
          version-name: '1.0.0'
          version-code:  0
          update-type: 'minor'
      - name: 'Get Minored version'
        run: |
          echo "Minored 1.0.0"
          echo "Version name: ${{ steps.minor.outputs.new-version-name }}"
          echo "Version code: ${{ steps.minor.outputs.new-version-code }}"

      - name: 'MAJOR version update'
        uses: kurt-ikhokha/gha-semantic-version@v1
        id: major
        with:
          version-name: '1.0.0'
          version-code:  0
          update-type: 'major'
      - name: 'Get Majored version'
        run: |
          echo "Majored 1.0.0"
          echo "Version name: ${{ steps.major.outputs.new-version-name }}"
          echo "Version code: ${{ steps.major.outputs.new-version-code }}"
          
      - name: 'BUILD version update'
        uses: kurt-ikhokha/gha-semantic-version@v1
        id: build
        with:
          version-name: '1.0.0'
          version-code:  0
          update-type: 'build'
      - name: 'Get Builded version'
        run: |
          echo "built 1.0.0"
          echo "Version name: ${{ steps.build.outputs.new-version-name }}"
          echo "Version code: ${{ steps.build.outputs.new-version-code }}"
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
