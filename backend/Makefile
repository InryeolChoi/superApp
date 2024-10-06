# 설정
CONTAINER=backend
DOCKER_IMAGE=backend_image

all: start

start: build
	docker run --name $(CONTAINER) -p 8000:8000 $(DOCKER_IMAGE)

build:
	docker build -t $(DOCKER_IMAGE) .

stop:
	docker stop $(CONTAINER)
	docker rm $(CONTAINER)

clean: stop
	docker rmi $(DOCKER_IMAGE)

.PHONY: all start build stop clean