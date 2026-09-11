/**
 * The resume, as levels. Ordered the way the page scrolls: school first,
 * career second, contract work bundled into a bonus stage at the end.
 *
 * `start` / `end` are { year, month } with a 1-12 month. `end: null` means the
 * role is current, and durations are computed at runtime from it.
 */
const timeline = [
    {
        id: 'minden-high',
        panelSide: 'right',
        sprite: 'tide',
        backdrop: 'mhs',
        /* Sampled from each export's own top edge, so the extension is
           seamless. Per orientation: the two are not always graded alike. */
        backdropSky: { landscape: '#259afd', portrait: '#249bfe' },
        /* Height of the clear sky above the roofline, measured from the
           image's bottom edge in multiples of its width. Re-measure with
           the scratchpad backdrop script if the artwork is re-cropped. */
        backdropHorizon: { landscape: 0.327, portrait: 1.105 },
        spriteAlign: 'sky',
        kind: 'school',
        level: '1-1',
        title: 'Minden High School',
        role: 'High School Diploma',
        place: 'Minden, Louisiana',
        start: { year: 2001 },
        end: { year: 2004 },
        precision: 'year',
        flavor: 'Tutorial level',
        summary:
            'Where the save file starts. Four years in Minden, Louisiana, and a diploma on the way out — the last stretch before any of this became a career.',
        drops: ['High School Diploma', 'Minden, LA'],
        theme: 'dawn'
    },
    {
        id: 'lsu-shreveport',
        panelSide: 'left',
        sprite: 'campus',
        backdrop: 'lsus-uc',
        /* Sampled from each export's own top edge, so the extension is
           seamless. Per orientation: the two are not always graded alike. */
        backdropSky: { landscape: '#48a6fd', portrait: '#45a6fd' },
        /* Height of the clear sky above the roofline, measured from the
           image's bottom edge in multiples of its width. Re-measure with
           the scratchpad crop script if the artwork is ever re-cropped. */
        backdropHorizon: { landscape: 0.406, portrait: 1.193 },
        spriteAlign: 'sky',
        kind: 'school',
        level: '1-2',
        title: 'LSU Shreveport',
        role: 'B.S. Computer Information Systems',
        place: 'Shreveport, Louisiana',
        start: { year: 2005 },
        end: { year: 2009 },
        precision: 'year',
        flavor: 'Class selected: Developer',
        summary:
            'A Bachelor of Science in Computer Information Systems, earned 2005 to 2009. Systems, databases and programming coursework — the groundwork everything after it was built on, and the reason the design job down the hall turned into a development career.',
        drops: [
            'B.S. Computer Information Systems',
            'Print + web design for the University Center'
        ],
        theme: 'campus'
    },
    {
        id: 'lsu-design',
        panelSide: 'right',
        /* No sign: the room is covered in LSUS marks already - the banner, the
           pool table, the shirts, the anchor on the far wall - and a wordmark
           over it hid the wall rather than labelling the scene. */
        /* Inside the University Center the job was actually done in - The
           Port and the Port Grille. The degree scene next door has the
           exterior, so the two no longer look like one another. */
        backdrop: 'lsus-port',
        backdropSky: { landscape: '#4f2a89', portrait: '#3e1f77' },
        backdropHorizon: { landscape: 0.562, portrait: 2.167 },
        /* Indoors: no weather. */
        clouds: false,
        kind: 'job',
        level: '1-3',
        title: 'LSU Shreveport',
        role: 'Student Graphic Designer',
        place: 'Shreveport, Louisiana',
        start: { year: 2008, month: 8 },
        end: { year: 2010, month: 4 },
        flavor: 'First quest accepted',
        summary:
            'Print media for the University Center: event advertisements, brochures, stationery and web content. The job that sparked the move into User Interface design and development.',
        drops: [
            'Print + web design',
            'Adobe toolkit',
            'University Center'
        ],
        exit: 'Graduated, and went looking for the first paid development work',
        theme: 'port'
    },
    {
        id: 'marketicity',
        panelSide: 'right',
        sprite: 'marketicity',
        backdrop: 'st-louis',
        /* Sampled from each export's own top edge. The two differ by 48 units
           in red - the sunset is graded differently per crop - which is why
           the sky colour is per orientation. The gradient starts well below
           the top rows, so the flat extension still meets a flat edge. */
        backdropSky: { landscape: '#659ff7', portrait: '#367eed' },
        backdropHorizon: { landscape: 0.392, portrait: 1.76 },
        /* Waterline the riverboat rides on, same units as the horizon. */
        backdropBoat: { landscape: 0.042, portrait: 0.174 },
        /* The sunset sky is doing the work here - the boat is the motion. */
        clouds: false,
        spriteAlign: 'sky',
        kind: 'job',
        level: '2-1',
        title: 'Marketicity, LLC',
        role: 'Intern Web Developer',
        place: 'Greater St. Louis Area',
        start: { year: 2010, month: 5 },
        end: { year: 2010, month: 8 },
        flavor: 'First paid quest',
        summary:
            'Hired as an intern to build a skill set and hand it straight back to the company. Constructed web templates and WordPress templates, and learned the fundamentals of how a small business actually runs. Interned under an amazing web designer and picked up new design patterns for approaching each coding problem.',
        drops: ['Web templates', 'WordPress', 'Small-business fundamentals'],
        exit: 'Internship ended',
        theme: 'summer'
    },
    {
        id: 'match',
        panelSide: 'left',
        sprite: 'matchLogo',
        /* The app on a phone, riding below the wordmark. */
        prop: 'matchCell',
        spriteAlign: 'sky',
        backdrop: 'dallas',
        /* Sampled from each export's own top edge, per orientation. */
        backdropSky: { landscape: '#031344', portrait: '#011245' },
        backdropHorizon: { landscape: 0.319, portrait: 2.117 },
        /* A night skyline: no clouds in the artwork, and its stars are painted
           in, so the twinkle is an overlay on top of them. */
        clouds: false,
        /* How far down the artwork's own stars reach, in the same units as the
           horizon. Authored by eye - a painted star and a lit office window
           are both isolated dots, so this cannot be measured. */
        backdropStars: { landscape: 0.209, portrait: 0.802 },
        twinkle: true,
        kind: 'job',
        level: '2-2',
        title: 'Match.com',
        role: 'Associate UI Developer',
        place: 'Dallas / Fort Worth Area',
        start: { year: 2011, month: 2 },
        end: { year: 2013, month: 8 },
        flavor: 'First boss fight',
        summary:
            'Hired to administer content production assets — landing pages and emails. Developed site landing pages that used JavaScript to drive the log-in functionality. Built maximum-compatibility email templates that hold up across most desktop and mobile email clients, which is its own kind of hard mode. Designed the User Interface framework and architecture for the WordPress-driven Match.com blog.',
        drops: [
            'Landing pages',
            'JavaScript log-in flows',
            'Bulletproof email templates',
            'WordPress UI architecture'
        ],
        exit: 'Offer from PricewaterhouseCoopers, 20% compensation increase',
        theme: 'neon'
    },
    {
        id: 'pwc',
        panelSide: 'right',
        sprite: 'pwcLogo',
        spriteAlign: 'sky',
        backdrop: 'pwc',
        /* Sampled from each export's own top edge, per orientation. */
        backdropSky: { landscape: '#162d89', portrait: '#001657' },
        backdropHorizon: { landscape: 0.562, portrait: 2.167 },
        /* The artwork paints its own cloud cover across the night sky, so a
           second drifting set would read as two weathers at once. */
        clouds: false,
        kind: 'job',
        level: '3-1',
        title: 'PricewaterhouseCoopers',
        role: 'Senior UI/UX Developer',
        place: 'Dallas / Fort Worth Area',
        start: { year: 2013, month: 9 },
        end: { year: 2015, month: 2 },
        flavor: 'High score',
        summary:
            'Brought on with the sole responsibility of maintaining and updating the User Interface for an ASP.NET MVC solution. Refactored the UI architecture into a modular framework, added style and script bundling, and rewrote the stylesheets into a class-based, object-oriented format that .NET developers could actually work with. Collaborated with designers on the overall look and feel of the brand. The result was an internal asset management portal that increased revenue by over one million dollars a month.',
        drops: [
            'Modular UI framework',
            'Style + script bundling',
            'OO stylesheets for .NET devs',
            '+$1M/month revenue'
        ],
        exit: 'Offer from ARGO, and a commute cut from 2 hrs to 30 mins a day',
        theme: 'tower'
    },
    {
        id: 'argo',
        panelSide: 'left',
        sprite: 'argoLogo',
        spriteAlign: 'sky',
        backdrop: 'argo',
        /* Sampled from each export's own top edge, per orientation. */
        backdropSky: { landscape: '#37a0fd', portrait: '#2d98fe' },
        backdropHorizon: { landscape: 0.412, portrait: 1.719 },
        /* Same here: the daytime sky already has clouds painted into it. */
        clouds: false,
        kind: 'job',
        level: '3-2',
        title: 'ARGO',
        role: 'Software Engineer, User Interface',
        place: 'Dallas / Fort Worth Area',
        start: { year: 2015, month: 2 },
        end: { year: 2015, month: 4 },
        flavor: 'Short run, deep end',
        summary:
            'Brought onto the NextGen team to help build the framework meant to replace the proprietary language ARGO ran on. My part was a web components library in PolymerJS — Google\u2019s take on the then-new Web Components standard — alongside Git, Node.js, RequireJS and Dojo Toolkit.',
        drops: [
            'PolymerJS component library',
            'Web Components standard',
            'RequireJS + Dojo Toolkit'
        ],
        theme: 'lab'
    },
    {
        id: 'realpage',
        panelSide: 'right',
        sprite: 'realpageLogo',
        spriteAlign: 'sky',
        backdrop: 'realpage',
        /* Sampled from each export's own top edge, per orientation. This scene
           is an interior, so the "sky" being extended is its ceiling. */
        backdropSky: { landscape: '#a9a8b8', portrait: '#a8a6b4' },
        backdropHorizon: { landscape: 0.562, portrait: 2.167 },
        /* Indoors - no weather to speak of. */
        clouds: false,
        kind: 'job',
        level: '3-3',
        title: 'RealPage, Inc.',
        role: 'Developer III',
        place: 'Dallas / Fort Worth Area',
        start: { year: 2015, month: 5 },
        end: { year: 2017, month: 11 },
        flavor: 'Two-team run',
        summary:
            'Joined the Online Leasing team, using AngularJS and Node.js to build a scalable, dynamic user interface for customers. Then moved to the Foundation Team — a group commissioned to rebuild RealPage applications on modern frameworks like Angular and Vue.js, with Laravel behind them.',
        drops: ['AngularJS', 'Node.js', 'Angular', 'Vue.js', 'Laravel'],
        theme: 'dusk'
    },
    {
        id: 'usaa',
        panelSide: 'right',
        sprite: 'usaaLogo',
        spriteAlign: 'sky',
        backdrop: 'usaa-sa',
        /* Sampled from each export's own top edge, per orientation. */
        backdropSky: { landscape: '#2b94fd', portrait: '#1e8dfd' },
        /* Measured to the skyline rather than taken from backdrop.py, which
           stops at the first wide non-sky run - here the artwork's own painted
           clouds, only a few rows down. Left at that the drifting clouds were
           penned into a 101px strip instead of the whole sky. */
        backdropHorizon: { landscape: 0.467, portrait: 1.505 },
        /* Clear blue over the campus, so the drawn clouds have room to drift -
           the default, listed here because it is a choice on a photo scene. */
        clouds: true,
        kind: 'job',
        level: '4-1',
        title: 'USAA',
        role: 'Frontend Software Developer',
        place: 'Dallas / Fort Worth Area',
        start: { year: 2017, month: 11 },
        end: null,
        flavor: 'Current stage',
        summary:
            'Building and supporting enterprise-level React components. My team and I maintain the USAA Enterprise Component Library — the shared building blocks other teams assemble their apps from. Skills picked up along the way: GitLab dependency management, terminal commands, Artifactory management, OpenShift configuration and deployment, and true teamwork.',
        drops: [
            'Enterprise React component library',
            'GitLab dependency management',
            'Artifactory',
            'OpenShift config + deploy'
        ],
        theme: 'shield'
    }
];

/**
 * Contract and concurrent work. Bundled because these overlap the main path
 * rather than following it — 3rd Party Solutions ran alongside USAA, and the
 * 2011 contracts ran alongside Match.com.
 */
/**
 * Concurrent and part-time roles - the ones that overlapped the main path
 * rather than following it, so they read as their own timeline rather than a
 * step in the sequence. Ordered oldest first, like the rail they render into.
 */
export const sideQuests = [
    {
        id: 'lsu-design-2',
        title: 'LSU Shreveport',
        role: 'Student Graphic Designer',
        place: 'Shreveport, Louisiana',
        start: { year: 2010, month: 9 },
        end: { year: 2011, month: 1 },
        summary:
            'Back in the University Center between the Marketicity internship and Match.com, on the same print and web design work.'
    },
    {
        id: 'aim-truancy',
        title: 'Aim Truancy Solutions',
        role: 'Contract UI Designer / Developer',
        place: 'Contract',
        start: { year: 2011, month: 5 },
        end: { year: 2011, month: 12 },
        summary:
            'Designed and coded the user interface for the admin control panel AIM staff used daily — Photoshop template, hand-written markup and styles, then integrated into their ASP.NET MVC solution.'
    },
    {
        id: 'endtime-ministries',
        title: 'Endtime Ministries, Inc.',
        role: 'Contract UI Developer',
        place: 'Contract',
        start: { year: 2011, month: 9 },
        end: { year: 2011, month: 11 },
        summary:
            'Consulted with the Lead Graphic Designer and development department on coding solutions for the Endtime Ministries website, and built a base user interface framework for their new WordPress build. Contract ended, work completed.'
    },
    {
        id: 'third-party-solutions',
        title: '3rd Party Solutions',
        role: 'Frontend Developer',
        place: 'Florida, United States',
        start: { year: 2023, month: 6 },
        end: { year: 2023, month: 12 },
        summary:
            'Debugged and updated the marketing website, and built tools for third-party contractors to use in the app. Agile team, everybody supporting each other. It was a good experience.'
    }
];

export default timeline;
