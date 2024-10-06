all: up

up:
	docker compose up --build -d

down:
	docker compose down

re: down up

clean: down
	docker compose down -v --rmi all --remove-orphans