#!make
include .env

start:
	@npm run start

prebuild:
	@echo "Removing dist"
	@npm run prebuild

build: export HUGO_LANGUAGES_NL_BASEURL = https://www.hoopdoetleven.be
build: export HUGO_LANGUAGES_FR_BASEURL = https://www.pleindespoir.be
build: export HUGO_LANGUAGES_DE_BASEURL = https://www.vollerhoffnung.be
build: export HUGO_LANGUAGES_EN_BASEURL = https://en.hoopdoetleven.be
build:
	@echo "Building prod"
	@npm run build

build-staging: export HUGO_LANGUAGES_NL_BASEURL = https://staging.hoopdoetleven.be
build-staging: export HUGO_LANGUAGES_FR_BASEURL = https://staging.pleindespoir.be
build-staging: export HUGO_LANGUAGES_DE_BASEURL = https://staging.vollerhoffnung.be
build-staging: export HUGO_LANGUAGES_EN_BASEURL = https://staging-en.hoopdoetleven.be
build-staging:
	@echo "Building preview"
	@npm run build:preview

upload-staging:
	@echo "Deploying to staging"
	@rsync -avz -e "ssh -p ${HDL_STAG_PORT}" --delete dist/ ${HDL_STAG_USER}@${HDL_STAG_HOST}:${HDL_STAG_PATH}

upload-prod:
	@echo "Deploying to production"
	@rsync -avz -e "ssh -p ${HDL_PROD_PORT}" --delete dist/ ${HDL_PROD_USER}@${HDL_PROD_HOST}:${HDL_PROD_PATH}

deploy-staging: prebuild build-staging upload-staging

deploy-prod: prebuild build upload-prod