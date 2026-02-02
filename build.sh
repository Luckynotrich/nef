#!/bin/bash
clear;
if [ -f newledohub.tar.bz2 ]; then rm newledohub.tar.bz2; fi
if [ -f newledohub.tar ]; then rm newledohub.tar; fi

tar -uvf newledohub.tar ./dist

tar -uvf newledohub.tar app.js

tar -uvf newledohub.tar index.html

tar -uvf newledohub.tar package.json

tar -uvf newledohub.tar un-tar_newledohub.sh

tar -tvf newledohub.tar
echo " =================================";
echo " Hang on a mo, this takes a while";
echo " =================================";
tar -jcvf newledohub.tar.bz2 newledohub.tar
