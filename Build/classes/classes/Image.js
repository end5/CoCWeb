"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Yoffy
 */
class Image {
    Image(id, url, w, h) {
        _id = id;
        _url = url;
        _width = w;
        _height = h;
    }
    get id() {
        return _id;
    }
    get url() {
        return _url;
    }
    get width() {
        return _width;
    }
    get height() {
        return _height;
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map