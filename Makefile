all: check up

check:

up:
	docker compose up --build -d

down:
	docker compose down

logback:
	docker logs backend -f

logfront:
	docker logs frontend -f

inback:
	docker exec -it backend bash

infront:
	docker exec -it frontend bash

re: down up

clean: down
	docker compose down -v --rmi all --remove-orphans

fclean: clean
	docker system prune -a -f --volumes