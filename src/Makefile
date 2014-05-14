---
---
PATH := ../node_modules/.bin:$(PATH)

FA_ROOT_DIRECTORY = assets/font-awesome
FA_LESS_DIRECTORY = assets/font-awesome/less
FA_SCSS_DIRECTORY = assets/font-awesome/scss
FA_CSS_DIRECTORY = assets/font-awesome/css

FA_LESS_MODERN = ${FA_LESS_DIRECTORY}/font-awesome.less
FA_SCSS_MODERN = ${FA_SCSS_DIRECTORY}/font-awesome.scss

FA_CSS_MODERN = ${FA_CSS_DIRECTORY}/font-awesome.css
FA_CSS_MODERN_MIN = ${FA_CSS_DIRECTORY}/font-awesome.min.css

SITE_LESS_DIRECTORY = assets/less
SITE_CSS_DIRECTORY = assets/css

SITE_LESS = ${SITE_LESS_DIRECTORY}/site.less
SITE_CSS = ${SITE_CSS_DIRECTORY}/site.css

build:
	@echo "Compiling Less files"
	@mkdir -p ${FA_CSS_DIRECTORY}

	lessc ${FA_LESS_MODERN} > ${FA_CSS_MODERN}
	lessc --compress ${FA_LESS_MODERN} > ${FA_CSS_MODERN_MIN}
#	sass ${FA_SCSS_MODERN} ${FA_CSS_MODERN}

	lessc --yui-compress ${SITE_LESS} > ${SITE_CSS}
	cp -r ${FA_ROOT_DIRECTORY}/* ../
	cd assets && mv font-awesome font-awesome-{{ site.fontawesome.version }} && zip -r9 font-awesome-{{ site.fontawesome.version }}.zip font-awesome-{{ site.fontawesome.version }} && mv font-awesome-{{ site.fontawesome.version }} font-awesome


default: build


.PHONY: build
