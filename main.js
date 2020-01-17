const Jimp = require('jimp');
const fs = require('fs');
const extra =  require('fs-extra');
const os = require('os');
const watch = require('node-watch');
const path = require('path');
const alphaAutoCrop = require('./jimp-plugin-alpha-autocrop.js');

const watchfolder = os.homedir() + '/Desktop/to-process';
const baseTemplateFolder = os.homedir() + '/Desktop/masks';

watch( watchfolder, { recursive: true }, (eventType, filename) => {
    if ((path.extname(filename) === '.png' || path.extname(filename) === '.jpg') && eventType === 'update') {
        if (fs.existsSync(filename)) {
            const subdir = path.relative(watchfolder, filename);
            const templatename = subdir.split(path.sep)[0];
            processImage(templatename, filename);
        }
    }
});

function processImage(template, filenametoprocess) {
    const folderName = `${os.homedir()}/Desktop/out/${Date.now()}`;
    fs.mkdirSync(folderName);

    fs.readdir(baseTemplateFolder + path.sep + template, function (err, maskfilenames) {
        if (err) {
            onError(err);
            return;
        }
        maskfilenames.forEach(function (maskfilename) {
            Jimp.read(filenametoprocess, (err, paperdoll) => {
                paperdoll.alphaAutoCrop = alphaAutoCrop;

                if (maskfilename.indexOf('.png') !== -1) {
                    if (err) throw err;
                    const result = Jimp.read(`${templateFolder}/${maskfilename}`, (err, mask) => {
                        paperdoll
                        .mask(mask)
                        .alphaAutoCrop()
                        .write(`${folderName}/${maskfilename}`); // save
                    });
                } else if (maskfilename.indexOf('.json') !== -1) {
                    extra.copySync(`${baseTemplateFolder}/${template}/${maskfilename}`, `${folderName}/manifest.json` );
                }
            });
        });
    });

}


const templateFolder = './exampleimages/vincent_price_avatar';
