import PixelArt from '../PixelArt';
import { INK, SPRITE_COLUMNS, SPRITE_ROWS } from './canvas';

const PALETTE = {
    k: INK,
    m: '#8d94a3',
    w: '#f6f3e8',
    l: '#b9bfc9',
    g: '#92cc41'
};

/* Truancy tracking, as an attendance checklist on a clipboard. */
const CLIPBOARD = `
.
.................kkkkkk
.................kmmmmk
..........kkkkkkkkkkkkkkkkkkkk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwllllllllllwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kwwwwwwwwwwwwwwwwwwk
..........kkkkkkkkkkkkkkkkkkkk
.
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
`;

/* Ticks land one after another, like a form being worked through. */
const TICKS_EARLY = `
.
.
.
.
.
.............gg
.............gg
.
.
.
.
.
.
.............gg
.............gg
`;

const TICKS_LATE = `
.
.
.
.
.
.
.
.
.
.............gg
.............gg
.
.
.
.
.
.
.............gg
.............gg
`;

function ClipboardSprite() {
    return (
        <div className="sprite">
            <PixelArt
                className="sprite__layer"
                art={CLIPBOARD}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer sprite__layer--assemble"
                art={TICKS_EARLY}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer sprite__layer--assemble-late"
                art={TICKS_LATE}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
        </div>
    );
}

export default ClipboardSprite;
