### gitignore

- git에 올라가면 안되는 파일, 디렉터리 지정

### webpack & babel 구성을 위해 필요한 라이브러리

- 웹팩 설치
    - `npm i -D webpack webpack-cli`
    - package.json scripts에 build 명령어를 추가하고 webpack 지정

        ```json
        /* package.json */
        "scripts": {
            "build": "webpack"
            "build:prod": "webpack --env=production"
        },
        ```

- 바벨 관련 모듈 설치
    - `npm i -D @babel/core @babel/preset-env babel-loader`
        - @babel/core : 바벨의 코어 패키지
        - @babel/preset-env : 구문변환에 대한 별도의 설정없이 최신 자바스크립트를 구형 브라우저에 사용할 수 있게 해주는 스마트 사전
        - babel-loader : es6 를 es5 로 바꿔주는 바벨을 웹팩에서 사용할 수 있게 해주는 역할

    ```jsx
    /* babel.config.js */
    module.exports = {
      presets: [['@babel/env', {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          browsers: ['last 3 versions', 'ie >= 11'],
          node: 'current'
        }
      }]]
    }
    ```

- webpack 바깥에 따로 설정 파일을 만드는 이유는 빌드 파일 이외의 테스트 파일의 경우에도 바벨이 적용되도록 하기 위함

### Webpack

```jsx
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  entry: ['core-js/stable', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ESLintPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true
  }
})
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
- plugins
    - eslint-webpack-plugin: 빌드 하기 전에 원본 코드 상에 eslint 에러가 발생하면 빌드에서 에러가 났음을 표시해주고 빌드에 실패한다.

### eslint & standard

- eslint 설치
    - `npm i -g eslint`
- 초기 .eslintrc.js 설정파일을 자동으로 만들어주는 명령어
    - `eslint —init`

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5e78d5f-1ef9-46b9-a190-e2e3f0d10b45/_2021-06-21__1.41.15.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5e78d5f-1ef9-46b9-a190-e2e3f0d10b45/_2021-06-21__1.41.15.png)

        - `env`: 프로젝트의 사용 환경을 설정
        - `parserOptions`: 자바스크립트 버전, 모듈 사용 여부 등을 설정
        - `extends`: 확장 설정
        - `rules`: 규칙 설정
        - `plugins`: 플러그인 설정

        ```jsx
        module.exports = {
          env: {
            browser: true,
            es2021: true,
            jest: true,
            node: true
          },
          extends: ['standard'],
          parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module'
          },
          rules: {
          }
        }
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

- 설치

```bash
npm i -D jest core-js
```

- 테스트 스크립트 지정

```jsx
 /* package.json */
"scripts": {
    "test": "jest"
},
```

- alias 설정

```jsx
/* jest.config.js */
moduleNameMapper: {
'@/(.*)$': '<rootDir>/src/$1',
}
```
