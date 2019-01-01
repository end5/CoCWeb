import { SpriteLib } from 'Engine/Display/SpriteLib';
import { ImageElement } from './Elements/ImageElement';
import { ParagraphElement } from './Elements/ParagraphElement';
import { List } from 'Engine/Utilities/List';
import { ImageLib } from 'Engine/Display/ImageLib';

class ContentView {
    public readonly imageElement: ImageElement = new ImageElement();
    public readonly textElement: ParagraphElement = new ParagraphElement();
    public readonly spriteElement: ImageElement = new ImageElement();
    public readonly parsers: List<(text: string) => string> = new List();

    public text(content: string): ContentView {
        for (const parser of this.parsers)
            content = parser(content);
        this.textElement.text(content);
        return this;
    }

    public image(imageName: string): ContentView {
        ImageLib.loadRandom(imageName, (imagePath) => {
            if (imagePath && imagePath !== '') {
                this.imageElement.load(imagePath);
                this.imageElement.show();
            }
            else
                this.imageElement.hide();
        });
        return this;
    }

    public sprite(spriteName: string): ContentView {
        if (SpriteLib.get(spriteName) === undefined)
            console.error('Unknown sprite');
        else {
            this.spriteElement.load(SpriteLib.get(spriteName)!);
            this.spriteElement.show();
        }
        return this;
    }

    public clear(): ContentView {
        this.textElement.clear();
        this.imageElement.hide();
        this.spriteElement.hide();
        return this;
    }
}

export const CView = new ContentView();
