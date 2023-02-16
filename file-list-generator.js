//file_list_gen.js

const { readdir, rm, writeFile } = require('node:fs/promises');
const { isNumberObject } = require('node:util/types');
const apndFile = require('./apnd-file');


async function fileListGen(path, file, size, test) {
  let pathParts = path.split('/');
  let direct = pathParts.pop();
  let imagePath = './' + direct;
  let bg = '.bg__';
  let gradiant = ' linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),';
  let background = 'background-image:';
  let url = ' url("';
  let bg_end = '");\n';
  let backset = '@include backSet;' + '\n';
  let backSet240 = '@include backSet240;\n';
  let backSet420 = '@include backSet420;\n';
  let title = '//' + direct + '\n';
  let screen = `@media only screen and ( max-width: ${size}px)\n{\n`
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

    console.log('num ', num, ' ', test);
    if (test === true) apndFile(file, screen);
    for (let i = 0; i < files.length; i++) {

      let listFile = bg + `${i + 1}` + '{\n' + '' + background;
      //if (i == 0 || i == 3) {
        listFile = listFile + gradiant;
        console.log('gradiant added ', i)
      //}
      //else console.log(' i ',i,' comparison',(i==0 || i==3))
      listFile = listFile + url + imagePath + '/' + files[i] + bg_end;
      if (!test) { listFile = listFile + backset; }
      if (num === 420) { listFile = listFile + backSet240; }
      if (num === 640) { listFile = listFile + backSet420; }
      listFile = listFile + '}\n';
      apndFile(file, listFile)
    }
    if (test) apndFile(file, '}')
  } catch (err) {
    console.error(err);
  }
}
fileListGen('./dist/css/images_1024', './dist/scss/_bg_images_1024.scss', '0', false);
fileListGen('./dist/css/images_640', './dist/scss/_bg_images_640.scss', '1024', true)
fileListGen('./dist/css/images_420', './dist/scss/_bg_images_420.scss', '640', true);
fileListGen('./dist/css/images_240', './dist/scss/_bg_images_240.scss', '320', true);