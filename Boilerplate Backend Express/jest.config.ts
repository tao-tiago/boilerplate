import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"

const jestConfig: JestConfigWithTsJest = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  testMatch: ["**/?(*.)spec.ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironment: "node",
  setupFiles: [],
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/src/config/singleton.ts"],
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "database",
    "controllers",
    "middlewares",
    "routes",
    "constants",
    "config",
    "enums",
    "jobs",
    "services",
    "index",
    "api",
    "shared/helpers",
    "server",
    ".interface.",
    ".d.ts",
    "swagger"
  ]
}

export default jestConfig
