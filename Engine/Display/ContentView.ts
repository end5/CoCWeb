import { ImageLib } from 'Engine/Display/ImageLib';
import { TextBuffer } from 'Engine/Display/TextBuffer';
import { loadImages } from 'Engine/Display/ImageLoading';
import { ImageElement } from 'Engine/Display/Elements/ImageElement';
import { randomChoice } from 'Engine/Utilities/SMath';

class ContentView {
    public readonly textBuffer = new TextBuffer();
    public imageElement?: ImageElement;
    public spriteElement?: ImageElement;

    public text(content: string): ContentView {
        this.textBuffer.text(content);
        return this;
    }

    public image(imageName: string): ContentView {
        const info = ImageLib.get(imageName);

        if (info)
            if (info.absolutePaths.length === 0) {
                loadImages(info.arbitraryPath, (paths) => {
                    info.absolutePaths = paths;
                    if (this.imageElement)
                        this.loadRandomImage(this.imageElement, paths);
                });
            }
            else if (this.imageElement)
                this.loadRandomImage(this.imageElement, info.absolutePaths);

        return this;
    }

    private loadRandomImage(element: ImageElement, list: string[]) {
        if (list.length > 0) {
            element.load(randomChoice(list));
            element.show();
        }
        else
            element.hide();
    }

    public sprite(spriteName: string): ContentView {
        const info = ImageLib.get(spriteName);

        if (info)
            if (info.absolutePaths.length === 0) {
                loadImages(info.arbitraryPath, (paths) => {
                    info.absolutePaths = paths;
                    if (this.spriteElement)
                        this.loadRandomImage(this.spriteElement, paths);
                });
            }
            else if (this.spriteElement)
                this.loadRandomImage(this.spriteElement, info.absolutePaths);

        return this;
    }

    public clear(): ContentView {
        this.textBuffer.clear();
        if (this.imageElement)
            this.imageElement.hide();
        if (this.spriteElement)
            this.spriteElement.hide();
        return this;
    }
}

export const CView = new ContentView();
