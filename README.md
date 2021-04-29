# json-2-java

Library to convert JSON to Java code, that is, you will be able to generate JAVA codes using JSON schemas.

**Disclaimer**: Java version supported: 8+

## Installation

```
npm i json-2-java
```

## Usage

Exist two way, by using the CLI (npm will create a symlink) or using the [API](./docs/api.md) (exported modules).

### CLI

To use the CLI, make sure that during the installation of the package, symlink was created successfully or try force create it with the follow command: `npm link`. After configured, use the command to access CLI: `json2java`

### Json to Java Class

With Json-2-java, we can convert easily a json schema to java Object, for make this, follow these steps: [Json to class guide](./docs/json-to-class.md)

## TODO

- [x] Fix indentation on two annotations seguidas.
- [x] Create option for generate SERIALIZABLE attribute. (working)
- [x] Solve relationships with generic type
- [x] Create option to add additional imports types
- [ ] throws exception in methods, extract type and add import
- [x] Divide imports and not share between different class process
- [ ] New option to set java doc description for elements.

<!-- Nothing... waiting next tasks. -->
