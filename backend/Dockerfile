# Python 기반 이미지 선택
FROM python:3.12-slim

# 작업 디렉터리 설정
WORKDIR /app

# 필요한 패키지 설치
COPY requirements.txt /app/

# 필요한 빌드 도구 설치 (gcc, musl-dev)
RUN apt-get update && apt-get install -y gcc libpq-dev python3-dev

# pip를 이용한 의존성 환경 설치
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드를 컨테이너에 복사
COPY . /app/

# 환경 변수 설정 (필요에 따라 조정)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 포트 노출
EXPOSE 8000

# Django 서버 실행 명령
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]