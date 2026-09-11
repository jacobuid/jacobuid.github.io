import { useMemo } from 'react';

/**
 * Sprites are authored as ASCII grids: one character per pixel, where each
 * character maps to a colour in `palette`. Any character missing from the
 * palette (by convention '.') is left transparent.
 *
 * Only the newlines that come from wrapping the template literal are stripped.
 * Interior rows are kept verbatim, so a layer that starts part-way down the
 * canvas offsets itself with rows of '.' rather than truly blank lines.
 */
const parseRows = (art) => {
    const rows = art.split('\n');

    while (rows.length > 0 && rows[0].length === 0) rows.shift();
    while (rows.length > 0 && rows[rows.length - 1].length === 0) rows.pop();

    return rows;
};

/**
 * Horizontal run-length encoding, so a 33-wide row of one colour becomes a
 * single <rect> instead of 33 of them.
 */
const buildRects = (rows, palette) => {
    const rects = [];

    rows.forEach((row, y) => {
        let x = 0;

        while (x < row.length) {
            const character = row[x];

            let width = 1;
            while (row[x + width] === character) width += 1;

            const fill = palette[character];
            if (typeof fill === 'string') {
                rects.push({ key: `${y}:${x}`, x, y, width, fill });
            }

            x += width;
        }
    });

    return rects;
};

function PixelArt({ art, palette, columns, rows, className, style }) {
    const gridRows = useMemo(() => parseRows(art), [art]);
    const rects = useMemo(() => buildRects(gridRows, palette), [gridRows, palette]);

    const viewColumns =
        columns ?? gridRows.reduce((widest, row) => Math.max(widest, row.length), 0);
    const viewRows = rows ?? gridRows.length;

    return (
        <svg
            className={className}
            style={style}
            viewBox={`0 0 ${viewColumns} ${viewRows}`}
            shapeRendering="crispEdges"
            aria-hidden="true"
            focusable="false"
        >
            {rects.map((rect) => (
                <rect
                    key={rect.key}
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={1}
                    fill={rect.fill}
                />
            ))}
        </svg>
    );
}

export default PixelArt;
