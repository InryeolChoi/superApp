# 보안 관련 사항
## env 세팅하기
* 다음과 같이 `.env` 파일을 세팅해준다.
* `.env` 파일은 `SuperApp` 폴더 바로 아래에 위치해야 한다.
* `.env`는 반드시 `.gitignore`에 넣어줘야 한다.
* 이 프로젝트에서 필요한 목록은 다음과 같다.

```bash
# backend
SECRET_KEY='aaaaaa'
FT_OAUTH_CLIENT_ID='aaaaaa'
FT_OAUTH_CLIENT_SECRET='aaaaaa'
EMAIL_HOST_USER='aaaaaa'
EMAIL_HOST_PASSWORD='aaaaaa'

# DB
DEBUG='1 또는 0'
DB_HOST='aaaaaa'
DB_NAME='your_db_name'
DB_USER='your_db_user'
DB_PASSWORD='your_db_password'
DB_PORT='0000'
```

## gitignore
* 최상단 디렉토리에 `.gitignore` 파일을 만들자.
* 최소한 이 정도는 추가하는 것이 좋다.
```Bash
*/.env
.env
frontend/node_modules
backend/myenv
postgres_db
```
