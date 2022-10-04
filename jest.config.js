module.exports = {
  testEnvironment: 'node',
  roots: [
    "server/test"
  ],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest', {
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      target: 'es2022',
    }],
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  modulePathIgnorePatterns: [
    "/helpers",
    "module.d.ts"
  ],

  testTimeout: 60000,
}
