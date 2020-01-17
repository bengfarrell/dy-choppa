module.exports = function autocrop() {
    var w = this.bitmap.width;
    var h = this.bitmap.height;
    const l = findLeftSide(this, w, h);
    const r = findRightSide(this, w, h);
    const t = findTopSide(this, w, h);
    const b = findBottomSide(this, w, h);
    this.crop(l, t, w - (w - r + l), h - (h - b + t));
    return this;
};

function findLeftSide(scope, w, h) {
    for (let x = 0; x < w; x++) {
        for ( let y = 0; y < h; y++) {
            var clr = scope.getPixelColor(x, y);
            var rgba = scope.constructor.intToRGBA(clr);

            if (rgba.a !== 0) {
                return x;
            }
        }
    }
}

function findRightSide(scope, w, h) {
    for (let x = w; x > 0; x--) {
        for ( let y = 0; y < h; y++) {
            var clr = scope.getPixelColor(x, y);
            var rgba = scope.constructor.intToRGBA(clr);

            if (rgba.a !== 0) {
                return x;
            }
        }
    }
}

function findTopSide(scope, w, h) {
    for ( let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            var clr = scope.getPixelColor(x, y);
            var rgba = scope.constructor.intToRGBA(clr);

            if (rgba.a !== 0) {
                return y;
            }
        }
    }
}

function findBottomSide(scope, w, h) {
    for ( let y = h; y > 0; y--) {
        for (let x = 0; x < w; x++) {
            var clr = scope.getPixelColor(x, y);
            var rgba = scope.constructor.intToRGBA(clr);

            if (rgba.a !== 0) {
                return y;
            }
        }
    }
}

