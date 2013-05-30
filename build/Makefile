PATH := ../node_modules/.bin:$(PATH)

FA_LESS_DIRECTORY = assets/font-awesome/less
FA_CSS_DIRECTORY = assets/font-awesome/css

FA_LESS_MODERN = ${FA_LESS_DIRECTORY}/font-awesome.less
FA_LESS_IE7 = ${FA_LESS_DIRECTORY}/font-awesome-ie7.less

FA_CSS_MODERN = ${FA_CSS_DIRECTORY}/font-awesome.css
FA_CSS_MODERN_MIN = ${FA_CSS_DIRECTORY}/font-awesome.min.css
FA_CSS_IE7 = ${FA_CSS_DIRECTORY}/font-awesome-ie7.css
FA_CSS_IE7_MIN = ${FA_CSS_DIRECTORY}/font-awesome-ie7.min.css


build:
	@echo "Compiling Less files"
	@mkdir -p ${FA_CSS_DIRECTORY}
	recess --compile ${FA_LESS_MODERN} > ${FA_CSS_MODERN}
	recess --compile --compress ${FA_LESS_MODERN} > ${FA_CSS_MODERN_MIN}
	recess --compile ${FA_LESS_IE7} > ${FA_CSS_IE7}
	recess --compile --compress ${FA_LESS_IE7} > ${FA_CSS_IE7_MIN}


default: build


.PHONY: build
