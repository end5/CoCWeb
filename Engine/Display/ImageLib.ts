import { Dictionary } from 'Engine/Utilities/Dictionary';
import { randomChoice } from 'Engine/Utilities/SMath';

interface ImageLoadInfo {
    info: ImageInfo;
    name: string;
    index: number;
    fileExtension: string[];
    concretePath: string;
}

interface ImageInfo {
    path: string;
    paths: string[];
    loaded: boolean;
    failed: boolean;
}

class ImageLibrary extends Dictionary<string, ImageInfo> {
    private readonly extentions = [".jpg", ".png", ".jpeg"];

    public load(path: string) {
        const name = this.getFilename(path);
        this.set(name, { path, loaded: false, failed: false, paths: [] });
    }

    public loadRandom(name: string, onSuccess: (imagePath: string) => void) {
        const imageInfo = this.get(name);
        if (!imageInfo) throw new Error("Not loaded at start: " + name);
        if (!imageInfo.loaded)
            this.loadImage(imageInfo, name, 1, this.extentions.slice(), (info) => {
                info.loaded = true;
                if (info.path.length > 0)
                    onSuccess(randomChoice(info.paths));
            });
        else if (imageInfo.path.length > 0)
            onSuccess(randomChoice(imageInfo.paths));
    }

    private getFilename(path: string): string {
        const filenameRegex = /(?:[\w .-]+\/)*([\w .-]+)/;
        const filename = path.match(filenameRegex);
        if (filename && filename[1])
            return filename[1];
        throw new Error("No filename found");
    }

    public loadImage(info: ImageInfo, name: string, index: number, fileExtension: string[], onFinish: (info: ImageInfo) => void) {
        new Promise<ImageLoadInfo>((resolve, reject) => {
            const concretePath = info.path + "_" + index + fileExtension[0];
            const loadInfo: ImageLoadInfo = { info, name, index, fileExtension, concretePath };
            const img = new Image();
            img.onload = () => resolve(loadInfo);
            img.onerror = () => reject(loadInfo);

            img.src = concretePath;
            return loadInfo;
        }).then(
            (value: ImageLoadInfo) => {
                info.paths.push(value.concretePath);
                this.loadImage(value.info, value.name, ++value.index, value.fileExtension, onFinish);
            },
            (reason: ImageLoadInfo) => {
                reason.fileExtension.shift();
                if (reason.fileExtension.length > 0)
                    this.loadImage(reason.info, reason.name, 1, reason.fileExtension, onFinish);
                else
                    onFinish(reason.info);
            }
        );
    }
}

export const ImageLib = new ImageLibrary();
