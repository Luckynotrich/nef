#!/bin/bash
 clear;
if [ -f newledohub2.tar.bz2 ]; then rm newledohub2.tar.bz2; fi

PARAMS=(
    -jcvf newledohub2.tar.bz2
    ./dist/js
    ./dist/routes
    ./src/js
    ./dist/fluxscape.html
    ./dist/css/fluxscape/fluxscape.css*
    ./dist/contact-page.html
    ./dist/css/contact/contact-style.css*
    ./dist/site-vision.html
    ./dist/css/site-vision/site-vision.css*
    ./dist/projects.html
    ./dist/css/projects/projects.css*
    ./dist/css/projects/happenings.css*
    ./dist/css/newledo/main.css*
    app.js index.html package.json buildCode.sh un-tar_newledohub.sh .env
    )
tar "${PARAMS[@]}"
# tar -jcvf newledohub2.tar.bz2 ./dist/js .dist/routes ./src/js app.js index.html package.json build2.sh un-tar_newledohub.sh
