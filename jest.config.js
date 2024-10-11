const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  preset: 'jest-expo',

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-navigation|expo-router|tamagui|expo-splash-screen|expo-modules-core)/)"
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

module.exports = config;
