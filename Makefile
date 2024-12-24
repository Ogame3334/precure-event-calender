.PHONY: setup up d b ps node

up:
	docker compose -f compose.yaml up
up-dev:
	docker compose -f compose.dev.yaml up

up-d:
	docker compose -f compose.yaml up -d
up-dev-d:
	docker compose -f compose.dev.yaml up -d

down:
	docker compose -f compose.yaml down
down-dev:
	docker compose -f compose.dev.yaml down

ps:
	docker compose ps
node:
	docker compose exec node bash