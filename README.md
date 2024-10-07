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
3. 2fa를 이용한 로그인 (이메일 이용)

## intalk
* 웹소켓을 이용한 채팅방 기능 추가

# 실행 및 설정 관련
* [도커 없이 backend 실행 및 설정](./backend/README.md)
* [도커 없이 frontend 실행 및 설정](./frontend/README.md)
* [보안 관련 설정 (env, gitignore)](./security.md)
* Github Actions를 설정해 놓았고, 필요 시 업데이트

# pip 리스트 업데이트
* pip로 무언가를 설치할 때마다 pip 리스트를 업데이트하는 것이 좋다.
* pip 리스트인 requirements.txt는 다음과 같이 업그레이드 한다.

```Bash
pip freeze > requirements.txt
```