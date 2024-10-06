# backend
## 서버 구성
* board : 보드
* intalk : 채팅용
* todo : 투두리스트

## 도커 없이 서버 시작하기
1. 가상환경 설정
* venv 설치
```Bash
python3 -m venv myenv
source myenv/bin/activate
```
* pip를 이용한 의존성 설치
```Bash
pip install --upgrade pip
pip install -r requirements.txt
```

## 지속성 유지
* pip로 무언가를 설치할 때마다 pip 리스트를 업데이트하는 것이 좋다.
* pip 리스트인 requirements.txt는 다음과 같이 업그레이드 한다.

```Bash
pip freeze > requirements.txt
```