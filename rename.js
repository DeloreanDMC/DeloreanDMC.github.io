const fs = require("fs");
const path = require('path');
var ncp = require('ncp').ncp;

const files = fs.readdirSync(__dirname);

files.forEach(file_name=>{
    if ( file_name.indexOf("rename")!==-1 ||
         file_name.indexOf("images_c")!==-1
    ) return;
    console.log(file_name);
    // Путь до файла
    let filePath = path.join(__dirname,file_name);
    // Проверка это файл или директория 
    let isDirectory = file_name.indexOf("static")!==-1;
    // Содержимое
    let text = isDirectory ? "" : fs.readFileSync(filePath,"utf8");
    
    // Переименовать index.html => screen.html
    if (file_name === "index.html") {
        const newfilePath = path.join(__dirname,"controller.html");
        fs.writeFileSync(newfilePath,text);
        fs.unlinkSync(filePath);
        filePath = newfilePath;
    }

    // asset rename
    if (file_name.indexOf('asset')!==-1) {
        // const searchRegExp = /index.html",/g;
        // const replaceWith = 'controller.html",';
        // const newText = text.replace(searchRegExp,replaceWith);
        // fs.writeFileSync(path.join(__dirname,file_name),newText);
        fs.unlinkSync(filePath);
        return;
    }

    if (file_name.indexOf('precache')!==-1) {
        const searchRegExp = /index.html/g;
        const replaceWith = 'controller.html';
        const newText = text.replace(searchRegExp,replaceWith);
        fs.writeFileSync(path.join(__dirname,file_name),newText);
    }

});

ncp(__dirname,path.join(__dirname,"../../build"));