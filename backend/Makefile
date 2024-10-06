TEXT_NO_ENV_1 = "현재 backend 디렉토리에 .env 파일이 존재하지 않습니다. 시작 전 .env 파일을 생성해주세요."
TEXT_NO_ENV_2 = ".env file does not exist. Please set it up before starting this server."

all: start

start: check-env
	@echo "Starting Django server..."
	python manage.py runserver

check-env:
	@if [ ! -f ./.env ]; then \
		echo ${TEXT_NO_ENV}; \
		exit 1; \
	else \
		echo ".env 파일을 확인했습니다."; \
	fi

stop:
	@echo "Stopping Django server..."
	@pkill -f "python manage.py runserver" || echo "Django 서버가 실행 중이지 않습니다."

.PHONY: start stop check-env