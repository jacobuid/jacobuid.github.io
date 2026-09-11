import PixelArt from '../PixelArt';
import { INK, SPRITE_COLUMNS, SPRITE_ROWS } from './canvas';

const PALETTE = {
    k: INK,
    b: '#cfd6e4',
    d: '#7a8398',
    W: '#ffffff',
    r: '#e8425f',
    p: '#ff9ebb'
};

const BROWSER = `
.
.
.
.
....kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
....kbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbk
....kbdbdbdbbbbbbbbbbbbbbbbbbbbbbbbk
....kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWk
....kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
.
..................kkkk
..............kkkkkkkkkkkk
.
`;

const HEART = `
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
................rr....rr
...............prrrr.rrrr
..............pprrrrrrrrrr
..............rrrrrrrrrrrr
...............rrrrrrrrrr
................rrrrrrrr
.................rrrrrr
..................rrrr
...................rr
`;

function MatchSprite() {
    return (
        <div className="sprite">
            <PixelArt
                className="sprite__layer"
                art={BROWSER}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
            <PixelArt
                className="sprite__layer sprite__layer--pulse"
                art={HEART}
                palette={PALETTE}
                columns={SPRITE_COLUMNS}
                rows={SPRITE_ROWS}
            />
        </div>
    );
}

export default MatchSprite;
