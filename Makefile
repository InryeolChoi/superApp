all: up

up:
	docker compose up --build -d

down:
	docker compose down

backlog:
	docker logs backend -f

frontlog:
	docker logs frontend -f

dblog:
	docker logs db -f

backshell:
	docker exec -it backend bash

frontshell:
	docker exec -it frontend bash

dbshell:
	docker exec -it db bash

clean: down
	docker compose down -v --rmi all --remove-orphans

fclean: clean
	docker system prune -a -f --volumes

re: down up
