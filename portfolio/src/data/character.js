/**
 * The inventory screen's read-outs, as a character sheet.
 *
 * The numbers are self-assessments rather than measurements, so they are kept
 * here as data instead of being spread through the markup - the point of the
 * screen is that they line up with what the rest of the page says. Backend
 * sits low on purpose: it is the same admission the "Weakness" card makes, and
 * a sheet where every bar is nearly full would say nothing.
 */

/** The two headline bars, in the HP/MP slot of the usual character sheet. */
export const vitals = [
    { id: 'frontend', label: 'FRONTEND', value: 96, tone: 'hp' },
    { id: 'backend', label: 'BACKEND', value: 34, tone: 'mp' }
];

/** STR/DEX/INT and friends, named for things actually done at work. */
export const attributes = [
    { id: 'markup', abbr: 'MRK', label: 'Markup', value: 96 },
    { id: 'styling', abbr: 'STY', label: 'Styling', value: 94 },
    { id: 'scripting', abbr: 'SCR', label: 'Scripting', value: 92 },
    { id: 'frameworks', abbr: 'FRM', label: 'Frameworks', value: 88 },
    { id: 'tooling', abbr: 'TLS', label: 'Tooling', value: 78 },
    { id: 'design', abbr: 'DSN', label: 'Design', value: 74 },
    { id: 'backend', abbr: 'BCK', label: 'Backend', value: 34 }
];

/** Buffs and debuffs, taken from the Strength and Weakness cards. */
export const status = {
    buffs: ['Team Player', 'Resourceful', 'Approachable', 'Still Learning'],
    debuffs: ['Backend Depth', 'Database Design']
};

/**
 * The stack as equipment. The slot is the job the tool does rather than a
 * body part - inventing "Head" and "Legs" for a bundler would be structure
 * that is not there. Rarity is how central it is to the day job.
 */
export const equipment = [
    { id: 'html', slot: 'Markup', name: 'HTML5', rarity: 'epic' },
    { id: 'css', slot: 'Styling', name: 'CSS3', rarity: 'epic' },
    { id: 'js', slot: 'Language', name: 'JavaScript', rarity: 'epic' },
    { id: 'react', slot: 'Framework', name: 'React', rarity: 'epic' },
    { id: 'next', slot: 'Framework', name: 'Next.js', rarity: 'rare' },
    { id: 'angular', slot: 'Framework', name: 'Angular', rarity: 'rare' },
    { id: 'vue', slot: 'Framework', name: 'Vue.js', rarity: 'rare' },
    { id: 'node', slot: 'Runtime', name: 'Node', rarity: 'rare' },
    { id: 'git', slot: 'Source', name: 'Git', rarity: 'common' },
    { id: 'webpack', slot: 'Bundler', name: 'Webpack', rarity: 'common' }
];

/**
 * Which skills read as things you do, and which as things you are. The
 * reference sheet splits its abilities the same way, and it happens to match
 * the shape of the existing cards: four craft skills, two traits.
 */
export const PASSIVE_SKILLS = ['strength', 'weakness'];
