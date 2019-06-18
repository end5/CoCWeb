define(["require", "exports", "./ImageSets"], function (require, exports, ImageSets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageManager {
        constructor() {
            this.MAXSIZE = 400;
            this.loadImages(ImageSets_1.ImageSets, ImageSets_1.ImageExtensions, (result) => {
                ImageManager.imageTable = result;
            });
        }
        loadImages(imageSets, exts, callback) {
            const keys = Object.keys(ImageSets_1.ImageSets);
            const imageTable = {};
            let keyIndex = 0;
            let pathListIndex = 0;
            let fileIndex = 0;
            let fileExtIndex = 0;
            let failedLoadCounter = 0;
            const img = new Image();
            img.onload = () => {
                if (!imageTable[keys[keyIndex]])
                    imageTable[keys[keyIndex]] = [];
                imageTable[keys[keyIndex]].push(img.src);
                fileExtIndex++;
                if (fileExtIndex > exts.length) {
                    fileExtIndex = 0;
                    fileIndex++;
                }
                img.src = imageSets[keys[keyIndex]][pathListIndex] + (fileExtIndex > 0 ? "_" + fileIndex : '') + exts[fileExtIndex];
            };
            img.onerror = () => {
                fileExtIndex++;
                failedLoadCounter++;
                // Failed find
                if (failedLoadCounter === exts.length) {
                    failedLoadCounter = 0;
                    fileExtIndex = 0;
                    // Failed finding <name>.<ext>
                    if (fileIndex === 0) {
                        fileIndex++;
                    }
                    // Failed finding <name>_<number>.<ext>
                    else {
                        fileIndex = 0;
                        pathListIndex++;
                    }
                }
                if (pathListIndex >= keys[keyIndex].length) {
                    pathListIndex = 0;
                    keyIndex++;
                }
                if (keyIndex < keys.length)
                    img.src = imageSets[keys[keyIndex]][pathListIndex] + (fileExtIndex > 0 ? "_" + fileIndex : '') + exts[fileExtIndex];
                else
                    callback(imageTable);
            };
        }
        getLoadedImageCount() {
            return Object.keys(ImageManager.imageTable).length;
        }
        showImage(imageID, align = "left") {
            if (!(imageID in ImageManager.imageTable))
                return '';
            var imageString = "";
            var imageIndex = 0;
            var image = new Image();
            if (ImageManager.imageTable[imageID] === undefined)
                throw new Error('Image not found');
            // More than 1 image? Pick one at random.
            imageIndex = Math.floor(Math.random() * ImageManager.imageTable[imageID].length);
            image.src = ImageManager.imageTable[imageID][imageIndex];
            if (align == "left" || align == "right") {
                //Scale images down to fit the box
                var ratio = image.width / image.height;
                var scaler;
                if (ratio >= 1) {
                    scaler = this.MAXSIZE / image.width;
                    imageString = "<img src='" + image.src + "' width='" + this.MAXSIZE + "' height='" + Math.ceil(image.height * scaler) + "' align='" + align + "' id='img'>";
                }
                else {
                    scaler = this.MAXSIZE / image.height;
                    imageString = "<img src='" + image.src + "' width='" + Math.ceil(image.width * scaler) + "' height='" + this.MAXSIZE + "' align='" + align + "' id='img'>";
                }
            }
            return imageString;
        }
    }
    //Hashmap of all images
    ImageManager.imageTable = {};
    exports.ImageManager = ImageManager;
});
//# sourceMappingURL=ImageManager.js.map