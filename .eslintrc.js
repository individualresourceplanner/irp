module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
      'react/jsx-curly-brace-presence': 'off',
      'react/destructuring-assignment': 'off',
      'arrow-body-style': 'off',
    },
    'globals': {
      "fetch": false
    }
  }
  