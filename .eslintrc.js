var path = require('path');
module.exports={
  "extends": "airbnb",
  "rules": {
    "no-param-reassign": [2, { "props": false }],
    "prefer-const": 0,
    "no-var": 0,
    "prefer-arrow-callback": 0,
    "func-names": 0,
    "space-before-function-paren": [2, "never"],
    "no-console": 0,
    "object-shorthand": 0,
    "max-len": ["warn", 100],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": 0
  },
  "plugins": ["import"],
  "settings": {
    "import/resolver": {
      // "webpack": {
      //   "config": path.resolve(__dirname, "./webpack.config.js")
      // },
      "node": {
        "paths": path.resolve(__dirname, "./src")
      }
    }
  }
}
