const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const pluralize = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

/**
 * A { year, month } marker, where month is 1-12. `null` means "still going".
 * Resolving null to today is what keeps the USAA scene honest without a redeploy.
 */
const resolveMarker = (marker) => {
    if (marker !== null && typeof marker !== 'undefined') return marker;

    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1 };
};

export const formatMarker = (marker) => {
    const { year, month } = resolveMarker(marker);
    return `${MONTH_NAMES[month - 1]} ${year}`;
};

export const formatRange = (start, end) => {
    const endLabel = end === null ? 'Present' : formatMarker(end);
    return `${formatMarker(start)} — ${endLabel}`;
};

/**
 * The resume gives education as bare years. Rendering a month range for those
 * would assert precision that is not on the resume, so schooling formats to
 * years and skips the duration chip entirely.
 */
export const formatYearRange = (start, end) => `${start.year} — ${end.year}`;

/**
 * Inclusive of both the start and end month, which is how LinkedIn counts and
 * therefore how the numbers on the resume PDF read.
 */
export const formatDuration = (start, end) => {
    const from = resolveMarker(start);
    const to = resolveMarker(end);

    const totalMonths =
        (to.year - from.year) * 12 + (to.month - from.month) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return pluralize(months, 'mo');
    if (months === 0) return pluralize(years, 'yr');

    return `${pluralize(years, 'yr')} ${pluralize(months, 'mo')}`;
};
