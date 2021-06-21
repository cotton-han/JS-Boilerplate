## Installation

```powershell
git clone https://github.com/yeji9175/JS-boilerplate.git
cd JS-boilerplate

# .nvmrc에 명시된 버전이 설치가 되어 있는 경우
nvm use
# .nvmrc에 명시된 버전이 설치가 되어 있지 않은 경우
nvm install 14.17.1

npm i
```

## Usage

- Test

    ```powershell
    npm run test
    ```

- Build (개발 버전)

    ```powershell
    npm run build
    ```

- Build (배포 버전)

    ```powershell
    npm run build:prod
    ```

## ESlint 확장 프로그램 설치

- Visual Studio Code 사용 시
    - VS Code ESLint extension 설치
- 그 외 에디터 사용시
    - 해당 에디터에서 제공하는 ESLint 플러그인 설치

## EditorConfig 확장 프로그램 설치

- Visual Studio Code 사용시
    - EditorConfig for VS Code 설치
- 그 외 에디터 사용시
    - [https://editorconfig.org](https://editorconfig.org/)에서 EditorConfig Native support 지원하는지 확인 가능
    - Native support가 제공되는 에디터인 경우 플러그인 설치 불필요
    - Native support가 제공되지 않는다면 플러그인 설치
