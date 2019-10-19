# Protracotr のテストソースを静的チェックするための設定方法

## 前提
VSCodeを利用していること

## 必要な拡張機能
- ESLint
- Prettier - Code formatter

## 必要なnpm modules
```json
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-eslint": "^5.0.1",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-jasmine": "^2.10.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-protractor": "^1.41.1",
    "prettier": "^1.17.0",
  }
```

## VSCodeのSettings.json
```json
  // Javascript
  "javascript.referencesCodeLens.enabled": true, // Javascriptの コード参照機能を有効化
  "prettier.eslintIntegration": true, //prettier-eslintを使うようになる、これでprettierで整形するときに、eslintでチェックエラーとなる部分も一緒に直してくれる
  // 適応するファイルタイプを決定
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    },
    "html"
  ],
  // プロジェクト配下のeslintrc.jsを読み込み
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

## .eslintrc.js
```javascript
module.exports = {
    "env": {
        "node": true,   // nodejsのライブラリを利用
        "es6": true,    // es6のライブラリを利用
        "jasmine": true // jasmineのライブラリを利用
    },
    "extends": [
        "eslint:recommended",            // eslint推奨ルール
        "plugin:prettier/recommended",   // prettier推奨ルール
        "plugin:protractor/recommended", // protractor推奨ルール
        "plugin:jasmine/recommended"     // jasmine推奨ルール
    ],
    "globals": {
        "window": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "prettier",   // eslintでprettierのルールを入れるプラグイン
        "protractor", // eslintでprotractorのルールを入れるプラグイン
        "jasmine"     // eslintでjasmineのルールを入れるプラグイン
    ],
    "rules": {
    }
};
```
