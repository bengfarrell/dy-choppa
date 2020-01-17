const Jimp = require('jimp');
const fs = require('fs');
const watch = require('node-watch');
const path = require('path');
const alphaAutoCrop = require('./jimp-plugin-alpha-autocrop.js');

const watchfolder = './examplewatchfolder';
watch( watchfolder, { recursive: true }, (eventType, filename) => {
    if (path.extname(filename) === '.png' && eventType === 'update') {
        if (fs.existsSync(filename)) {
            const subdir = path.relative(watchfolder, filename);
            const templatename = subdir.split('/')[0];
        }
    }
});

/*
const templateFolder = './exampleimages/vincent_price_avatar';

fs.readdir(templateFolder, function (err, filenames) {
    if (err) {
        onError(err);
        return;
    }
    filenames.forEach(function (filename) {
        Jimp.read('./exampleimages/price.jpg', (err, paperdoll) => {
            paperdoll.alphaAutoCrop = alphaAutoCrop;

            if (filename.indexOf('.png')) {
                if (err) throw err;

                const result = Jimp.read(`${templateFolder}/${filename}`, (err, mask) => {
                    paperdoll
                        .mask(mask)
                        .alphaAutoCrop()
                        .write(`./out/${filename}`); // save
                });
            }
        });
    });
});
*/
