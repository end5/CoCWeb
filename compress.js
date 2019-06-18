var AdmZip = require('adm-zip');
 
// creating archives
var zip = new AdmZip();

// add local file
zip.addLocalFile("index.html");
zip.addLocalFile("page.css");
zip.addLocalFolder("Build/", "Build/");
zip.addLocalFolder("res/", "res/");

zip.writeZip("CoCWeb.zip");
