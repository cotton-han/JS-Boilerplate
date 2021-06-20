## gitignore

[https://www.toptal.com/developers/gitignore](https://www.toptal.com/developers/gitignore)

자동으로 .gitignore 에 들어갈 내용을 만들어주는 사이트

보통 node로 검색해서 나오는 결과를 활용

### webpack & babel 구성을 위해 필요한 라이브러리

- 웹팩 설치
    - `npm i -D webpack webpack-cli`
    - package.json scripts에 build 명령어를 추가하고 webpack 지정

        ```json
        /* package.json */
        "scripts": {
            "build": "webpack"
        },
        ```

- 바벨 관련 모듈 설치
    - `npm i -D @babel/core @babel/preset-env babel-loader`
        - @babel/core : 바벨의 코어 패키지
        - @babel/preset-env : 구문변환에 대한 별도의 설정없이 최신 자바스크립트를 구형 브라우저에 사용할 수 있게 해주는 스마트 사전
        - babel-loader : es6 를 es5 로 바꿔주는 바벨을 웹팩에서 사용할 수 있게 해주는 역할

### Webpack

```jsx
/* webpack.config.js */
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
```

- mode : 실행 모드
    - 각 실행모드에 따라 웹팩의 결과물 모습이 달라진다. 개발 모드의 경우 개발자들이 좀 더 보기 편하게 웹팩 로그나 결과물이 보여지고, 배포 모드의 경우 성능 최적화를 위해 파일 압축 등의 빌드 과정이 추가된다.
    - 사용 가능한 mode 값 : `none` , `development` , `production(기본값)`
- entry : 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
- output: 웹팩을 돌리고 난 결과물의 파일 경로
- module : 로더 적용
    - 로더 : 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성
- stats : 번들 정보를 표시
    - colors : 결과물마다 다른 색상으로 표시
- devtool : 개발을 용이하게 하기 위해 소스맵을 제공하는 옵션
    - 소스 맵(Source Map)이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능
        - 디버깅을 위한 기능

### eslint & prettier

- eslint 설치
    - `npm i -g eslint babel-eslint`
        - `babel-eslint`: 없다면 import, export 같은 es6 문법에서 에러가 난다.
- prettier 설치(충돌 나지 않게 도와주는 라이브러리도 함께 설치)
    - `npm i -D prettier eslint-config-prettier eslint-plugin-prettier`
- 초기 .eslintrc.js 설정파일을 자동으로 만들어주는 명령어
    - `eslint —init`

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1f4ba74-980e-4219-baef-89e32605b3df/_2021-06-18__3.30.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1f4ba74-980e-4219-baef-89e32605b3df/_2021-06-18__3.30.08.png)

        - `env`: 프로젝트의 사용 환경을 설정
        - `parserOptions`: 자바스크립트 버전, 모듈 사용 여부 등을 설정
        - `extends`: 확장 설정
        - `rules`: 규칙 설정
        - `plugins`: 플러그인 설정
        - prettier 설정
            - `trailingComma`

                객체, 배열, 함수 등의 후행에 쉼표를 찍을지 제어합니다.

                `none` - 쉼표를 붙히지 않음

                `es5`  - ES5에서 유효한 후행 쉼표(객체, 배열 등)

                `all`  - 함수 인수에도 후행 쉼표

        ```jsx
        /* .eslintrc.js */
        module.exports = {
          env: {
            browser: true,
            es2021: true,
            node: true,
            jest: true,
          },
          extends: ['eslint:recommended', 'eslint-config-prettier'],
          plugins: ['prettier'],
          parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            parser: 'babel-eslint',
          },
          rules: {
            'prettier/prettier': [
              'error',
              {
                trailingComma: 'es5',
                bracketSpacing: true,
                tabWidth: 2,
                semi: true,
                printWidth: 80,
                singleQuote: true,
              },
            ],
            'no-unused-vars': 'warn',
            'no-var': 'warn',
          },
        };
        ```

- eslint 포매팅을 무시할 디렉토리 또는 파일들을 명시

    ```jsx
    /* .eslintignore */
    build/
    node_modules/
    ```

### 저장 후 자동 포맷

```jsx
/* settings.json */
"editor.codeActionsOnSave": {
    "source.fixAll": true,
},
"editor.formatOnSave": true,
```

### .editorconfig

프로젝트 또는 코드베이스에 EditorConfig 파일을 추가하여 코드베이스에서 작업하는 모든 사람들의 코딩 스타일을 일관적으로 유지할 수 있습니다.

### html-webpack-plugin

template html을 바탕으로 빌드후에 제대로된 html파일을 만들어준다.

### clean-webpack-plugin

CleanWebpackPlugin은 빌드 이전 결과물을 제거하는 플러그인으로 빌드 결과물은 웹팩에서 아웃풋 경로에 설장한 곳으로 폴더 및 파일들이 모이는데 빌드 했을시 이전 빌드내용이 삭제되지 않고 그대로 남아있는 경우도 있어 이것을 해결해주는 플러그인이다.

### eslint-loader

빌드 하기 전에 원본 코드 상에 eslint 에러가 발생하면 빌드에서 에러가 났음을 표시해주고 빌드에 실패한다.

```jsx
/* webpack.config.js */
module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
```

[https://www.npmjs.com/package/eslint-loader](https://www.npmjs.com/package/eslint-loader)

다른 로더 전에 실행되게끔 설정 - 안전하게 사용하는 방법

### @babel-polyfill

- Babel을 사용하여 ES6+ 코드를 ES5 이하로 트랜스파일링하여도 브라우저가 지원하지 않는 코드가 남아 있을 수 있다. 예를 들어, ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 이하로 트랜스파일링하여도 대체할 ES5 기능이 없기 때문에 그대로 남아 있다.
- Promise, Object.assign, Array.from 등과 같이 ES5 이하로 대체할 수 없는 기능은 트랜스파일링이 되지 않는다.
- 따라서 오래된 브라우저에서도 ES6+에서 새롭게 추가된 객체나 메소드를 사용하기 위해서는 @babel/polyfill을 설치해야 한다.
- babel-polyfill은 개발 환경에서만 사용하는 것이 아니라 실제 환경에서도 사용하여야 하므로 --save-dev 옵션으로 개발 설치를 하지 않도록 한다.

### .nvmrc

- .nvmrc는 NVM(node version manager)의 개별 프로젝트를 위한 설정 파일
- .nvmrc를 통해 특정 프로젝트에 사용되는 버전을 기술 할 수 있으면 NVM을 이용해 프로젝트마다 상이할 수 있는 node version을 빠르게 전환 하도록 도와 준다.

```bash
brew install nvm
source ~/.zshrc
echo "[node -v 결과]" > .nvmrc # 처음 생성할 때만 해당: 현재 노드 버전을 저장
nvm install [.nvmrc에 기술된 node version]
```

### Jest
- 공식 문서 : https://jestjs.io/docs/getting-started
- 설치

```bash
npm i -D jest babel-jest jest-cli
```

- 테스트 스크립트 지정

```jsx
 /* package.json */
"scripts": {
    "test": "jest",
    "build": "webpack",
    "dev": "webpack serve"
},
```

- babel 설정 - 테스트 코드에서 es6를 인식하기 위한 설정
- webpack에 같은 설정이 있는 이유는 빌드 결과를 트랜스파일링 하기 위함

```jsx
/* babel.config.js */
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

- alias 설정

```jsx
/* jest.config.js */
moduleNameMapper: {
'@/(.*)$': '<rootDir>/src/$1',
}
```
