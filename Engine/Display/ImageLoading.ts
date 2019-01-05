interface ImageLoadInfo {
    path: string;
    paths: string[];
    index: number;
    fileExtension: string[];
    concretePath: string;
    onFinish: (info: ImageLoadInfo) => void;
}

const extentions = [".jpg", ".png", ".jpeg", ".gif"];

export function loadImages(path: string, onSuccess: (imagePath: string[]) => void) {
    loadNextImage({
        path,
        paths: [],
        index: 1,
        fileExtension: extentions.slice(),
        concretePath: "",
        onFinish: (info: ImageLoadInfo) => {
            onSuccess(info.paths);
        }
    });
}

function loadNextImage(info: ImageLoadInfo) {
    info.concretePath = info.path + "_" + info.index + info.fileExtension[0];
    const img = new Image();
    img.onload = () => {
        info.paths.push(info.concretePath);
        loadNextImage(info);
    };
    img.onerror = () => {
        info.fileExtension.shift();
        if (info.fileExtension.length > 0) {
            info.index = 1;
            loadNextImage(info);
        }
        else {
            info.onFinish(info);
        }
    };

    img.src = info.concretePath;
}
