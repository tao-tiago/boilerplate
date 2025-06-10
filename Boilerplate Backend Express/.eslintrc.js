module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    indent: "off",
    semi: [
      "error",
      "never"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    quotes: [
      2,
      "double"
    ],
    "no-console": "error",
    "no-useless-constructor": "off",
    "space-before-function-paren": ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/consistent-generic-constructors": "warn",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: "[A-Z]",
        caughtErrors: "none"
      }
    ]
  },
  settings: {
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [".ts", ".d.ts"]
    }
  }
}
