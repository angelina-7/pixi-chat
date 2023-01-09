import { Rectangle, Texture, Container, Sprite } from "pixi.js";

export function sliceTexture(left: number, right: number, top: number, bottom: number, bt: Texture): Texture[][]{
    const lw = left;
    const cw = right - left;
    const rw = bt.width - right;

    const th = top;
    const ch = bottom - top;
    const bh = bt.height - bottom;

    return [
        [
            slice(bt, 0, 0, lw, th),
            slice(bt, left, 0, cw, th),
            slice(bt, right, 0, rw, th),
        ],
        [
            slice(bt, 0, top, lw, ch),
            slice(bt, left, top, cw, ch),
            slice(bt, right, top, rw, ch),
        ],
        [
            slice(bt, 0, bottom, lw, bh),
            slice(bt, left, bottom, cw, bh),
            slice(bt, right, bottom, rw, bh),
        ],
    ];
}

export const sliceBtn = sliceTexture.bind(null, 25, 105, 25, 105)

function slice(texture, x, y, w, h) {
    return new Texture(texture, new Rectangle(x, y, w, h))
}


export function createPanel(tiles: Texture[][], width: number, height: number, color: number) {
    const container = new Container();

    // Corners
    const tl = new Sprite(tiles[0][0]);
    const tr = new Sprite(tiles[0][2]);
    const bl = new Sprite(tiles[2][0]);
    const br = new Sprite(tiles[2][2]);

    // Horizontal segments
    const t = new Sprite(tiles[0][1]);
    const b = new Sprite(tiles[2][1]);

    // Vertical segments
    const l = new Sprite(tiles[1][0]);
    const r = new Sprite(tiles[1][2]);

    container.addChild(tl, tr, bl, br);

    if (width < (tl.width + tr.width)) {
        const half = width / 2;
        tl.width = half;
        tr.width = half;
        bl.width = half;
        br.width = half;
        l.width = half;
        r.width = half;
    }
    if (height < (tl.height + bl.height)) {
        const half = height / 2;
        tl.height = half;
        tr.height = half;
        bl.height = half;
        br.height = half;
        t.height = half;
        b.height = half;
    }

    tl.position.set(0, 0);
    tr.position.set(width - tr.width, 0);
    bl.position.set(0, height - bl.height);
    br.position.set(width - br.width, height - br.height);

    // Horizontal segments
    if (width > (tl.width + tr.width)) {
        t.width = width - (tl.width + tr.width);
        b.width = width - (bl.width + br.width);

        t.position.set(tl.width, 0);
        b.position.set(bl.width, height - b.height);

        container.addChild(t, b);
    }

    // Vertical segments
    if (height > (tl.height + bl.height)) {
        l.height = height - (tl.height + bl.height);
        r.height = height - (tr.height + br.height);

        l.position.set(0, tl.height);
        r.position.set(width - r.width, tr.height);

        container.addChild(l, r);
    }

    if ((width > (tl.width + tr.width)) && (height > (tl.height + bl.height))) {
        const c = new Sprite(tiles[1][1]);
        c.width = width - (tl.width + tr.width);
        c.height = height - (tl.height + bl.height);

        c.position.set(tl.width, tl.height);
        c.tint = color;

        container.addChild(c);
    }

    tl.tint = color;
    tr.tint = color;
    t.tint = color;
    l.tint = color;
    r.tint = color;
    b.tint = color;
    bl.tint = color;
    br.tint = color;
   

    return container;
}