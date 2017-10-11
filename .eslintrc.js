module.exports = {
   'env': {
      'browser': true,
      'jest': true,
      'es6': true,
      'node': true,
   },
   'extends': [
      'airbnb',
      'prettier',
   ],
   'plugins': [
      'prettier',
   ],
   'rules': {
      "strict": 0,
      "import/imports-first": [ "warn", "DISABLE-absolute-first" ],
      'linebreak-style': 0,
      'prettier/prettier': ['error', {
         'singleQuote': true,
         'trailingComma': 'es5'
      }],
   },
   'parserOptions': {
      'ecmaFeatures': {
         'jsx': true,
      }
   },
   "parser": "babel-eslint"
};
