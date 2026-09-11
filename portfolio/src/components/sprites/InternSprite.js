import PixelArt from '../PixelArt';
import { INK, SPRITE_COLUMNS, SPRITE_ROWS } from './canvas';

const PALETTE = {
    k: INK,
    m: '#c8cdd8',
    M: '#8d94a3',
    s: '#1b2436',
    g: '#43d9ad',
    d: '#8b5a2b',
    D: '#5e3a18',
    c: '#f4f4f8',
    o: '#6b4423'
};

const DESK = `
.
.
.
.
.
.
............kkkkkkkkkkkkkkkk
............kmmmmmmmmmmmmmmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmssssssssssssmk
............kmmmmmmmmmmmmmmk
............kkkkkkkkkkkkkkkk
..................kkkk
..................kMMk
...............kkkkkkkkkk
..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
..kddddddddddddddddddddddddddddddddddk
..kDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDk
..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
....kk............................kk
....kk............................kk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
`;

/* Blank rows between lines, or it renders as one solid block. */
const CODE = `
.
.
.
.
.
.
.
.
.
..............ggggggggg
.
................gggggg
.
..............gggggggggggg
`;

const MUG = `
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.............................kkkkkk
.............................kooook
.............................kcccck
.............................kcccck
.............................kkkkkk
`;

const STEAM = `
.
.
.
.
.
.
.
.
.
.
.
...............................c
................................c
...............................c
................................c
`;

function InternSprite() {
    return (
        <div className="sprite">
            <PixelArt
                className="sprite__layer"
                art={DESK}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer sprite__layer--screen"
                art={CODE}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer"
                art={MUG}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer sprite__layer--smoke"
                art={STEAM}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
        </div>
    );
}

export default InternSprite;
