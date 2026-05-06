#!/bin/bash
 clear;
if [ -f newledohub2.tar.bz2 ]; then rm newledohub2.tar.bz2; fi

tar -jcvf newledohub2.tar.bz2 ./dist ./src/js app.js index.html package.json build2.sh un-tar_newledohub.sh
