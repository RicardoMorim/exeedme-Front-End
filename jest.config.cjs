/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^url$": "<rootDir>/node_modules/whatwg-url"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!whatwg-url|tr46)/"
  ],
  testEnvironmentOptions: {
    customExportConditions: [""],
    url: "http://localhost"
  },
  silent: true,
  verbose: false,
  maxWorkers: "50%",
  setupFiles: ["<rootDir>/src/test/jest.setup.js"]
}