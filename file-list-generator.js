//file_list_gen.js

const { readdir, rm, writeFile} = require('node:fs/promises');
const { isNumberObject } = require('node:util/types');
const apndFile = require('./apnd-file');


async function fileListGen(path, file, size) {
  let pathParts = path.split('/');
    let direct = pathParts.pop();
    let imagePath = './' + direct;
    let bg = '.bg__';
    let background = '{\n'+'background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("';
    let bg_end = '");\n';
    let backset = '@include backSet;'+'\n';
    let title = '//' + direct + '\n';
    let screen = `@media screen and ( max-width: ${size}px)\n{\n`
  try {
    await rm(file);
  }
  catch {

    writeFile(file, title);
  }

  try {
    const files = await readdir(path);
    files.sort();
    const num = parseInt(size);
    let test = (num > 0);
    console.log('num ',num,' ',test);
    if(test)apndFile(file,screen);
    for (let i = 0; i < files.length; i++) {
      let listFile = files[i];
      listFile = imagePath + '/' + listFile 
      listFile = bg + `${i +1}` + background + listFile + bg_end;
      if(!test){listFile = listFile + backset;}
      listFile = listFile + '}\n';
        apndFile(file, listFile)
    }
    if(test)apndFile(file,'}')
  } catch (err) {
    console.error(err);
  }
}
fileListGen('./dist/css/images_1024', './dist/scss/_bg_images_1024.scss','0');
fileListGen('./dist/css/images_640', './dist/scss/_bg_images_640.scss','1024')
fileListGen('./dist/css/images_420', './dist/scss/_bg_images_420.scss','640');
fileListGen('./dist/css/images_240', './dist/scss/_bg_images_240.scss','420');