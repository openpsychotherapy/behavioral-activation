module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'storage': './src/storage',
            'storage/*': './src/storage/*',
            'language': './src/language',
            'language/*': './src/language/*',
          }
        }
      ]
    ]
  };
};
