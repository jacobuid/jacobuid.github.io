import PromptMark from './PromptMark';
import Scene from './Scene';
import SceneSprite from './SceneSprite';
import './StartScene.css';

function StartScene({ index, totalLevels, careerYears }) {
    return (
        <Scene
            id="start"
            theme="start"
            index={index}
            label="Jacob King, frontend developer"
            panelSide="left"
            sprite={<SceneSprite name="workstation" />}
        >
            <div className="start">
                <p className="start__prompt">
                    <PromptMark />
                </p>

                <h1 className="start__name">Jacob King</h1>
                <p className="start__role">Frontend Software Developer</p>

                <ul className="start__stats">
                    <li>
                        <span className="start__stats-value">{careerYears}</span>
                        <span className="start__stats-label">years played</span>
                    </li>
                    <li>
                        <span className="start__stats-value">{totalLevels}</span>
                        <span className="start__stats-label">levels cleared</span>
                    </li>
                    <li>
                        <span className="start__stats-value">TX</span>
                        <span className="start__stats-label">Tyler, Texas</span>
                    </li>
                </ul>

                <p className="start__hint">
                    HTML · CSS · JavaScript · React · Angular · Vue · Node
                </p>
            </div>

            <p className="scroll-hint">▼ SCROLL TO START</p>
        </Scene>
    );
}

export default StartScene;
