/**
 * Renders `[label](href)` links inside otherwise plain copy, so the resume
 * prose can keep the reference links it had without either storing JSX in the
 * data files or reaching for dangerouslySetInnerHTML.
 */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const toSegments = (text) => {
    const segments = [];
    let cursor = 0;

    for (const match of text.matchAll(LINK_PATTERN)) {
        if (match.index > cursor) {
            segments.push({ key: `t${cursor}`, text: text.slice(cursor, match.index) });
        }

        segments.push({ key: `l${match.index}`, label: match[1], href: match[2] });
        cursor = match.index + match[0].length;
    }

    if (cursor < text.length) {
        segments.push({ key: `t${cursor}`, text: text.slice(cursor) });
    }

    return segments;
};

function RichText({ children }) {
    const segments = toSegments(children);

    return (
        <>
            {segments.map((segment) =>
                typeof segment.href === 'string' ? (
                    <a
                        key={segment.key}
                        href={segment.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {segment.label}
                    </a>
                ) : (
                    <span key={segment.key}>{segment.text}</span>
                )
            )}
        </>
    );
}

export default RichText;
