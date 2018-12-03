import { SpriteLib } from "./SpriteLibrary";
import { ImageElement } from "../Engine/Display/Elements/ImageElement";
import { ParagraphElement } from "../Engine/Display/Elements/ParagraphElement";
import { SpriteName } from "./SpriteName";
import { getImage } from "./ImageLibrary";
import { List } from "../Engine/Utilities/List";

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
        if (imageName) {
            this.imageElement.load(getImage(imageName));
            this.imageElement.show();
        }
        else
            this.imageElement.hide();
        return this;
    }

    public sprite(spriteName: SpriteName): ContentView {
        if (spriteName === SpriteName.None)
            this.spriteElement.hide();
        else if (SpriteLib.get(spriteName) === undefined)
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
