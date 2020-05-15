import { ImageExtensions, ImageSets } from "./ImageSets";

/**
 * ...
 *
 * @author Yoffy, Fake-Name
 */

export type ImageSetKey = keyof typeof ImageSets;

export class ImageManager {
    // Hashmap of all images
    private static imageTable = {} as Record<ImageSetKey, string[]>;

    private MAXSIZE = 400;

    public constructor() {
        this.loadImages(ImageSets, ImageExtensions, (result) => {
            ImageManager.imageTable = result;
        });
    }

    private loadImages(
        imageSets: Record<ImageSetKey, string[]>,
        exts: string[],
        callback: (imageTable: Record<ImageSetKey, string[]>) => void
    ) {
        const keys = Object.keys(ImageSets) as ImageSetKey[];

        const imageTable = {} as Record<ImageSetKey, string[]>;

        let keyIndex = 0;
        let pathListIndex = 0;
        let fileIndex = 0;
        let fileExtIndex = 0;
        let failedLoadCounter = 0;

        const img = new Image();
        img.onload = () => {
            if (!imageTable[keys[keyIndex]]) imageTable[keys[keyIndex]] = [];
            imageTable[keys[keyIndex]].push(img.src);

            fileExtIndex++;

            if (fileExtIndex > exts.length) {
                fileExtIndex = 0;
                fileIndex++;
            }

            img.src =
                imageSets[keys[keyIndex]][pathListIndex] +
                (fileExtIndex > 0 ? `_${fileIndex}` : "") +
                exts[fileExtIndex];
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
                img.src =
                    imageSets[keys[keyIndex]][pathListIndex] +
                    (fileExtIndex > 0 ? `_${fileIndex}` : "") +
                    exts[fileExtIndex];
            else callback(imageTable);
        };
    }

    public getLoadedImageCount(): number {
        return Object.keys(ImageManager.imageTable).length;
    }

    public showImage(imageID: ImageSetKey, align = "left"): string {
        if (!(imageID in ImageManager.imageTable)) return "";
        let imageString = "";

        let imageIndex = 0;
        const image = new Image();
        if (ImageManager.imageTable[imageID] === undefined) throw new Error("Image not found");

        // More than 1 image? Pick one at random.
        imageIndex = Math.floor(Math.random() * ImageManager.imageTable[imageID].length);

        image.src = ImageManager.imageTable[imageID][imageIndex];

        if (align == "left" || align == "right") {
            // Scale images down to fit the box
            const ratio: number = image.width / image.height;
            let scaler: number;

            if (ratio >= 1) {
                scaler = this.MAXSIZE / image.width;
                imageString = `<img src='${image.src}' width='${this.MAXSIZE}' height='${Math.ceil(
                    image.height * scaler
                )}' align='${align}' id='img'>`;
            } else {
                scaler = this.MAXSIZE / image.height;
                imageString = `<img src='${image.src}' width='${Math.ceil(
                    image.width * scaler
                )}' height='${this.MAXSIZE}' align='${align}' id='img'>`;
            }
        }

        return imageString;
    }
}
