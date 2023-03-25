module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@navigation': './src/navigation',
          '@styles': './src/styles',
          '@components': './src/components',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@model': './src/model',
          '@screens': './src/screens',
          '@types': './src/types',
          '@core': './src/core',
          '@stores': './src/stores',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
