all : start

start: check-npm
	@echo "Starting React server..."
	cd frontend && npm start

check-npm:
	@cd frontend && if [ ! -d "node_modules" ]; then \
		echo "npm 패키지가 설치되지 않았습니다. npm install을 실행합니다..."; \
		npm install; \
	else \
		echo "npm 패키지가 이미 설치되어 있습니다."; \
	fi

install:
	@echo "Installing npm packages..."
	cd frontend && npm install

stop:
	@echo "Stopping React server..."
	@pkill -f "npm start" || echo "React 서버가 실행 중이지 않습니다."

.PHONY: start stop install check-npm