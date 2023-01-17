//file_list_gen.js

const { readdir, rm, writeFile} = require('node:fs/promises');
const apndFile = require('./apnd-file');


async function fileListGen(path, file) {
  let pathParts = path.split('/');
    let direct = pathParts.pop();
    let imagePath = './' + direct;
    let bg = '.bg__';
    let background = '{\n'+'background-image: url("';
    let backset = '");\n'+'@include backSet;'+'\n';
    let title = '//' + direct + '\n';
  try {
    await rm(file);
  }
  catch {

    writeFile(file, title);
  }

  try {
    


    const files = await readdir(path);
    files.sort();
    for (let i = 0; i < files.length; i++) {
      let listFile = files[i];
      listFile = imagePath + '/' + listFile 
      listFile = bg + `${i +1}` + background + listFile + backset + '}\n';
        apndFile(file, listFile)
    }
  } catch (err) {
    console.error(err);
  }
}
fileListGen('./dist/css/l_images', './dist/scss/_lrg_bg_images.scss')
fileListGen('./dist/css/s_images', './dist/scss/_sml_bg_images.scss')