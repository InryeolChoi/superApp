# 개요
* 나만의 웹앱 작성
* 백엔드 : Django
* 프론트엔드 : React

# 기능
## todolist
* todolist 작성, 수정, 삭제
* 완료된 todolist 확인, 삭제
* todolist 수정하기

## board
* board 작성 및 수정
* 로그인 기능
1. jwt를 통한 로그인
2. Oauth를 통한 로그인 (42 api 기반)
3. 2fa를 이용한 로그인

## intalk
* 웹소켓을 이용한 채팅방 기능 추가
* (추후 업데이트 예정)

# 실행방법
## backend
1. venv 설치
```Bash
python3 -m venv myenv
source myenv/bin/activate
```
2. pip를 이용한 의존성 설치
```Bash
pip install --upgrade pip
pip install -r requirements.txt
```

## frontend
1. npm 설치 > `npm install`
* node_modules 디렉토리 생성
2. localhost:3000 으로 접속

## gitignore
* 최상단 디렉토리에 `.gitignore` 파일을 만들자.
* 최소한 이 정도는 추가하는 것이 좋다.
```Bash
frontend/node_modules
backend/myenv
```