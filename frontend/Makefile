#!make
include .env

start:
	@npm run start

build:
	@echo "Building prod"
	@npm run build

build-staging:
	@echo "Building preview"
	@npm run build:preview

upload-staging:
	@echo "Deploying to staging"
	@rsync -avz -e "ssh -p ${HDL_STAG_PORT}" --delete dist/ ${HDL_STAG_USER}@${HDL_STAG_HOST}:${HDL_STAG_PATH}

upload-prod:
	@echo "Deploying to production"
	@rsync -avz -e "ssh -p ${HDL_PROD_PORT}" --delete dist/ ${HDL_PROD_USER}@${HDL_PROD_HOST}:${HDL_PROD_PATH}

deploy-staging: build-staging upload-staging

deploy-prod: build upload-prod