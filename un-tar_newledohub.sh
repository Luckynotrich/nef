#!/bin/bash
if [ -f build_error_log.log ]; then rm build_error_log.log; fi
touch build_error_log.log
errorlog=./build_error_log.log
problems(){
    if [ $? -ne 0 ];
    then echo "There were problems with $1!"
    exit 1
    else
    echo "$1 ran with no problems"
fi
}
clear;

if [ -f newledohub_last.tar.bz2 ]; then rm newledohub_last.tar.bz2 2>>$errorlog; fi
if [ -f newledohub.tar ]; then rm newledohub.tar 2>>$errorlog; fi

#          space  between array  | element| and comma required
#                                V        V
declare -a files=( "package.json" "app.js" "un-tar_newledohub.sh");


# initializing tar
tar -cvf newledohub.tar /dev/null 2>>$errorlog

# adding files

for i in "${files[@]}"
do
if [ -f  "$i" ];
then
tar -uvf newledohub.tar "$i" 2>>$errorlog;
fi
done
echo " =================================";
echo " Hang on a mo, this takes a while";
echo " =================================";
#   packing newledo_last
tar -jcvf newledohub_last.tar.bz2 newledohub.tar 2>>$errorlog;

#unpacking .bz2
tar -jxvf newledohub.tar.bz2 newledohub.tar 2>>$errorlog;

#unpack .tar
for i in "${files[@]}"
do
tar -xvf newledohub.tar "$i" 2>>$errorlog;
echo "unpacked $1"
done

tar -xvf newledohub.tar ./dist 2>>$errorlog;

if [ $? -eq 0 ]; then rm newledohub.tar 2>>$errorlog; fi

ls -l

