module.exports = {
  preset: 'ts-jest',           // Use ts-jest to handle TypeScript files
  testEnvironment: 'node',     // Simulate a Node.js environment (Fastify runs on Node)
  roots: ['<rootDir>/tests'],  // Where Jest looks for test files
  moduleFileExtensions: ['ts', 'js', 'json'], // Recognize these file types
  transform: {                 // Transform TS files into JS before running
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.(t|j)s$', // Match files ending with .test.ts or .test.js
  collectCoverage: true,        // Generate code coverage reports
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
}
