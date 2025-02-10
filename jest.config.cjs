/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  // Add these options to suppress the punycode warning
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  },
  // Silence deprecation warnings
  silent: true,
  verbose: false,
  maxWorkers: "50%"
}