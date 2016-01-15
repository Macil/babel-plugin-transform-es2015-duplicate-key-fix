# babel-plugin-transform-es2015-duplicate-key-fix

This is a babel plugin that makes duplicate keys in object literals like the
following example be transpiled into valid ES5 code. This works around a bug
in Babel: https://phabricator.babeljs.io/T2462

```javascript
var x = {a: 5, a: 6};
```

Without this, object literals with duplicate keys will be incorrectly
transpiled by Babel into non-ES5 compatible code that will fail to parse in
older browsers (including Safari <=8 and Chrome <=41).

Duplicate keys are often introduced into code by mistake, but they are allowed
by the ES2015 standard. This plugin allows all browsers to consistently parse
the transpiled code. If you want to avoid introducing duplicate keys into your
code, then use a linting tool.

## Usage

This plugin is included in the
[babel-preset-es2015-dupkeyfix](https://github.com/AgentME/babel-preset-es2015-dupkeyfix)
preset, so just switch to that instead of using "babel-preset-es2015".
