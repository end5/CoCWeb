import { Dictionary } from 'Engine/Utilities/Dictionary';

export interface ImageSetInfo {
    arbitraryPath: string;
    absolutePaths: string[];
    doesNotExist: boolean;
}

class ImageLibrary extends Dictionary<string, ImageSetInfo> {
    private getFilename(path: string): string {
        const filenameRegex = /(?:[\w .-]+\/)*([\w .-]+)/;
        const filename = path.match(filenameRegex);
        if (filename && filename[1])
            return filename[1];
        throw new Error("No filename found");
    }

    public register(path: string) {
        const name = this.getFilename(path);
        this.set(name, { arbitraryPath: path, absolutePaths: [], doesNotExist: false });
    }
}

export const ImageLib = new ImageLibrary();
