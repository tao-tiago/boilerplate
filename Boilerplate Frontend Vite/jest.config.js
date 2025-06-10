module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__test__/**/?(*.)(spec).ts(x)"],
  transform: {
    "^.+\\.(js(x)|ts(x))$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: "automatic" }]
        ]
      }
    ]
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/pages/",
    "/routes/",
    "App",
    "main"
  ],
  collectCoverage: false,
  collectCoverageFrom: ["src/components/**/*.ts(x)", "src/utils/**/*.ts(x)"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "vendor",
    "routes",
    "__tests__",
    "index",
    "styles",
    ".d.ts"
  ],
  globals: {
    window: {},
    document: {},
    google: {}
  }
}
