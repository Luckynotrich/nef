//file_list_gen.js

const { readdir, rm, writeFile } = require('node:fs/promises');
const { isNumberObject } = require('node:util/types');
const apndFile = require('./dist/js/apnd-file');


async function fileListGen(path, file, size, test) {
  let range = [240, 420, 640, 1280, 1600, 2560, 3840,7680]/* 1920, 960, */
  //file = "./test-proof.scss"// redefine file name for testing
  let pathParts = path.split('/');
  let direct = pathParts.pop();
  let imagePath = '/' + direct;
  let bg = '.logo';
  let gradiant = ' linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),';
  let image = 'background-image: ';
  let url = ' url("';
  let bg_end = '");\n';
  let title = '//' + direct + '\n';
  let files = [];
  
  try {
    await rm(file);
  }
  catch {

    writeFile(file, title);
  }
  let listFile
  try {
     files = await readdir(path);
     await files.sort();
     setTimeout(() => {console.log(files)}, 1000);
  } catch (err) {
    console.error(err);
  }

  for (let i = 0; i < files.length; i++) {
  apndFile(file, `@media only screen and ( min-width: ${range[i]}px)\n and ( max-width: ${range[i+1]}px)\n{\n`);
  listFile = bg + '{\n' + '' + image;
  listFile = listFile + url + imagePath + '/' + files[i] + bg_end;
    // listFile = listFile + `@include logoSet${range[i]};\n`; 
  
  listFile = listFile + '}}\n';

await apndFile(file, listFile)


};
}
fileListGen('./dist/css/logo', './src/scss/_logo_size.scss', '0', true);
