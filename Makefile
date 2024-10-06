all: up

up:
	docker compose up --build -d

down:
	docker compose down

logback:
	docker logs backend -f

logfront:
	docker logs frontend -f

logdb:
	docker logs db -f

inback:
	docker exec -it backend bash

infront:
	docker exec -it frontend bash

clean: down
	docker compose down -v --rmi all --remove-orphans

re: down up

fclean: clean
	docker system prune -a -f --volumes