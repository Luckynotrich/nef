//file_list_gen.js

const { readdir, rm, writeFile } = require('node:fs/promises');
const { isNumberObject } = require('node:util/types');
const sizeOf = require('image-size');
const apndFile = require('../../../../dist/js/apnd-file');
const { existsSync } = require('node:fs');

//event names must match folder names in dist/happenings/images
const events = ['eclipser-mixer', 'ferrock', 'mushroom_event_1'];

//scss files array size must match sizes and screens arrays
const scssFiles = ['images_1024.scss', 'images_640.scss',
  'images_420.scss', 'images_240.scss'/* , 'first_images.scss' */];
const sizes = ['1024', '640', '420', '240'];
const screens = ['2048', '1280', '840', '0'];
const border = 5;

const path = './dist/css/happenings/images/';

const scssPath = './src/scss/happenings/';
const titles = []

async function fileListGen() {
  for (let i = 0; i < events.length; i++) {
    let currentPath = '';
    let files = [];
    let backgrounds = [];
    for (let j = 0; j < sizes.length; j++) {
      currentPath = path + events[i] + '/' + events[i] + '_' + sizes[j];
      let screen = `@media only screen and ( min-width: ${Number(screens[j])+Number(4*border)}px)\n`
      if(j > 0) screen = screen + ` and ( max-width: ${Number(screens[j-1])+Number(4*border)}px)\n`
      screen = screen+`{\n`
      try { await apndFile(titles[j], screen) } catch (err) { console.log('error', err) }
      try {
        files = await readdir(currentPath);
        await files.sort();
        setTimeout(() => {/* console.log(files) */ }, 1000);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        for (let k = 0; k < files.length; k++) {
          let file = currentPath + '/' + files[k];
          let width = sizeOf(file).width;
          let height = sizeOf(file).height;
          // console.log('files[k],width,height ', files[k], width, ' , ', height);
          if (files[k].includes('.jpg') || files[k].includes('.jpeg')) {
            backgrounds[k] = '#' + '_' + (k + 1) + '_' + events[i] + '{' + '\n' + 'background-image: url("./images/' + events[i]
              + '/' + events[i] + '_' + sizes[j] + '/' + files[k] + '");\n'
              + 'background-repeat: no-repeat;\n' + 'background-position: center;\n'
              + 'width: ' + width + 'px;\n' + 'height: ' + height + 'px;\n'
              +'border: '+border+'px solid #ffffff;\n' 
              + '}\n';
          }
        }
        for (let k = 0; k < backgrounds.length; k++) {
          try { await apndFile(titles[j], backgrounds[k]) 
            // setTimeout(() => {/* console.log(files) */ }, 100);
          } catch (err) { console.log('error ', err) }
          
        }
        setTimeout(() => {/* console.log(files) */ }, 2000);
         try { await apndFile(titles[j], '\n}\n') } catch (err) { console.log('error ', err) }

      }
    }
  }
}
async function createNewFiles() {
  for (let file = 0; file < scssFiles.length; file++) {
    titles[file] = scssPath + '_' + scssFiles[file];

    try {
      if (existsSync(scssFiles[file])) {
        await rm(scssPath + '_' + scssFiles[file] + scssFiles[file]);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      await writeFile(scssPath + '_' + scssFiles[file], '//' + titles[file] + '\n');
    }
  }
}
async function processImages() {
  await createNewFiles();
  await fileListGen();
}
processImages();

