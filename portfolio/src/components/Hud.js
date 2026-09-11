import PromptMark from './PromptMark';
import './Hud.css';

/**
 * Fixed status bar: the name, the mark, and the links out.
 *
 * It used to carry a read-out of the level you were on. The scene rail names
 * every scene on hover and each panel states its own level in its title, so
 * the header was saying it a third time - and saying it in the one place that
 * has to sit over every backdrop on the site.
 *
 * The mark is the same `>_` block the start screen opens with, so the header
 * and the first thing you see share an identity.
 */
function Hud() {
    return (
        <header className="hud">
            <div className="hud__bar">
                <span className="hud__mark" aria-hidden="true">
                    <PromptMark />
                </span>

                <span className="hud__brand">JACOB KING</span>

                <nav className="hud__nav" aria-label="Elsewhere">
                    <a
                        href="https://github.com/jacobuid"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <i className="nes-icon github is-small" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jacobuid/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <i className="nes-icon linkedin is-small" />
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Hud;
