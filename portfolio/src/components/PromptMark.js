import PixelArt from './PixelArt';

/**
 * A pixel rebuild of the existing `>_` logo mark. The original PNG pairs the
 * terminal block with Helvetica, which fights the rest of the page - the block
 * is the part of that identity worth keeping.
 */
const COLUMNS = 24;
const ROWS = 18;

const PALETTE = {
    d: '#212529',
    w: '#ffffff'
};

const BLOCK = `
dddddddddddddddddddddddd
dddddddddddddddddddddddd
dddddddddddddddddddddddd
ddddwwdddddddddddddddddd
dddddwwddddddddddddddddd
ddddddwwdddddddddddddddd
dddddddwwddddddddddddddd
ddddddddwwdddddddddddddd
dddddddddwwddddddddddddd
ddddddddwwdddddddddddddd
dddddddwwddddddddddddddd
ddddddwwdddddddddddddddd
dddddwwddddddddddddddddd
ddddwwdddddddddddddddddd
dddddddddddddddddddddddd
dddddddddddddddddddddddd
dddddddddddddddddddddddd
dddddddddddddddddddddddd
`;

const CURSOR = `
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
.............wwwwwwww
.............wwwwwwww
`;

function PromptMark() {
    return (
        <span className="prompt-mark">
            <PixelArt
                className="prompt-mark__block"
                art={BLOCK}
                palette={PALETTE}
                columns={COLUMNS}
                rows={ROWS}
            />
            <PixelArt
                className="prompt-mark__cursor"
                art={CURSOR}
                palette={PALETTE}
                columns={COLUMNS}
                rows={ROWS}
            />
        </span>
    );
}

export default PromptMark;
