module.exports = {
  presets: [
    'babel-preset-expo',
    'nativewind/babel',
  ],
  plugins: [
    require.resolve('expo-router/babel'),
  ],
};
