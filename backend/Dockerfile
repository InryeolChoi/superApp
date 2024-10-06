# Python 기반 이미지 선택
FROM python:3.12-slim

# 작업 디렉터리 설정
WORKDIR /app

# 필요한 패키지 설치
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드를 컨테이너에 복사
COPY . /app/

# 환경 변수 설정 (필요에 따라 조정)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 정적 파일 수집
RUN python manage.py collectstatic --noinput

# 포트 노출
EXPOSE 8000

# Django 서버 실행 명령
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]