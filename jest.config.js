module.exports = {
  verbose: true,

  testEnvironment: 'jsdom',

  // 指定测试文件范围
  testMatch: [
    // '**/tests/**/*.spec.(js|jsx|ts|tsx)',
    '**/*/__tests__/*.spec.(js|jsx|ts|tsx)',
  ],

  // snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],

  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'vue'],

  // 设置别名
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@mock/(.*)$': '<rootDir>/mock/$1',
  },

  // 忽略的模块
  transformIgnorePatterns: ['node_modules'],

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
