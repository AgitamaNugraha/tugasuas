module.exports = {
  parser: '@babel/eslint-parser',
  root: true,
  extends: [
    'plugin:vue/vue3-recommended', // Sesuaikan dengan versi Vue yang Anda gunakan
    'eslint:recommended'
  ],
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
  rules: {
    // Atur aturan linting sesuai kebutuhan
  }
};
