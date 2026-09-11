import Scene from './Scene';
import './ContactScene.css';

const LINKS = [
    {
        id: 'github',
        href: 'https://github.com/jacobuid',
        label: 'Github',
        icon: 'github'
    },
    {
        id: 'linkedin',
        href: 'https://www.linkedin.com/in/jacobuid/',
        label: 'LinkedIn',
        icon: 'linkedin'
    },
    {
        id: 'email',
        href: 'mailto:jacobuid@gmail.com',
        label: 'jacobuid@gmail.com',
        icon: 'gmail'
    }
];

function ContactScene({ index, careerYears }) {
    return (
        <Scene
            id="contact"
            theme="contact"
            index={index}
            label="Continue: get in touch"
            panelSide="right"
            backdrop="me-developer"
            /* Sampled from each export's own top edge, per orientation. */
            backdropSky={{ landscape: '#0a1f3f', portrait: '#0a1f3e' }}
            backdropHorizon={{ landscape: 0.562, portrait: 2.169 }}
            /* Indoors at night - the only sky is through the window. */
            clouds={false}
        >
            <section className="nes-container is-dark is-rounded with-title panel contact">
                <p className="title">Continue?</p>

                <span className="panel__level">FINAL SCREEN — credits</span>

                <h2 className="panel__role">Let&apos;s build something</h2>

                <p className="panel__body">
                    {careerYears} years of frontend, from WordPress templates to an enterprise
                    React component library. Currently a Frontend Software Developer at USAA,
                    based in Tyler, Texas.
                </p>

                <ul className="contact__links">
                    {LINKS.map((link) => (
                        <li key={link.id}>
                            <a
                                className="nes-btn is-primary contact__link"
                                href={link.href}
                                target={link.id === 'email' ? undefined : '_blank'}
                                rel={link.id === 'email' ? undefined : 'noreferrer'}
                            >
                                <i className={`nes-icon ${link.icon} is-small`} />
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="contact__blog">
                    Also writing at{' '}
                    <a
                        href="https://jacobdking.blogspot.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        jacobdking.blogspot.com
                    </a>
                    , and the older experiments still live in the{' '}
                    <a
                        href="https://github.com/jacobuid/jacobuid.github.io/tree/master/old/sandbox"
                        target="_blank"
                        rel="noreferrer"
                    >
                        sandbox
                    </a>
                    .
                </p>
            </section>
        </Scene>
    );
}

export default ContactScene;
