import { useState } from 'react';
import RichText from './RichText';
import Scene from './Scene';
import { attributes, equipment, PASSIVE_SKILLS, status, vitals } from '../data/character';
import './SkillsScene.css';

/**
 * The inventory, as a character sheet.
 *
 * Laid out wide rather than tall: the scene is a landscape stage, so the panels
 * sit in columns - who you are on the left, what you are made of in the middle,
 * what you can do on the right, and what you are carrying along the bottom. A
 * portrait sheet would have meant a long scroll inside one scene.
 *
 * Selecting an ability writes its full description into the panel below the
 * list, the way a game menu does. It used to open a modal; a sheet that has to
 * throw a dialog over itself to tell you about its own contents is not a sheet,
 * and a menu screen is exactly the place where the description belongs in the
 * frame.
 *
 * Every bar is a segmented meter rather than a smooth one, drawn by laying
 * hard-edged gaps over a plain fill: a gradient bar would be the one thing on
 * the page that was not built out of blocks.
 */

const percent = (value) => `${value}%`;

function SkillsScene({ skills, index, careerYears }) {
    const active = skills.filter((skill) => !PASSIVE_SKILLS.includes(skill.id));
    const passive = skills.filter((skill) => PASSIVE_SKILLS.includes(skill.id));

    const [selectedId, setSelectedId] = useState(active[0]?.id ?? skills[0]?.id);

    const selected = skills.find((skill) => skill.id === selectedId) ?? skills[0];

    const renderAbility = (skill) => (
        <li key={skill.id}>
            <button
                className="sheet__ability"
                type="button"
                aria-pressed={skill.id === selectedId}
                onClick={() => setSelectedId(skill.id)}
            >
                <span className="sheet__ability-glyph" aria-hidden="true" />
                <span className="sheet__ability-name">[{skill.title}]</span>
                <span className="sheet__ability-badge">{skill.badge}</span>
            </button>
        </li>
    );

    return (
        <Scene
            id="skills"
            theme="skills"
            index={index}
            label="Inventory: skills and tools"
            layout="wide"
        >
            <div className="sheet">
                <section className="nes-container is-dark is-rounded with-title sheet__panel sheet__who">
                    <p className="title">Character</p>

                    <p className="sheet__name">JACOB KING</p>
                    <p className="sheet__class">Level {careerYears} Frontend Developer</p>

                    <dl className="sheet__vitals">
                        {vitals.map((vital) => (
                            <div className="sheet__vital" key={vital.id}>
                                <dt className="sheet__vital-label">{vital.label}</dt>
                                <dd className="sheet__vital-value">
                                    <span
                                        className={`meter meter--${vital.tone}`}
                                        style={{ '--fill': percent(vital.value) }}
                                    >
                                        <span className="meter__fill" />
                                    </span>
                                    <span className="sheet__vital-number">
                                        {vital.value}/100
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="nes-container is-dark is-rounded with-title sheet__panel sheet__attributes">
                    <p className="title">Attributes</p>

                    <dl className="sheet__stats">
                        {attributes.map((attribute) => (
                            <div className="sheet__stat" key={attribute.id}>
                                <dt className="sheet__stat-label">
                                    <span className="sheet__stat-abbr">{attribute.abbr}</span>
                                    {attribute.label}
                                </dt>
                                <dd className="sheet__stat-value">
                                    <span
                                        className="meter"
                                        style={{ '--fill': percent(attribute.value) }}
                                    >
                                        <span className="meter__fill" />
                                    </span>
                                    <span className="sheet__stat-number">{attribute.value}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="nes-container is-dark is-rounded with-title sheet__panel sheet__status">
                    <p className="title">Status</p>

                    <p className="sheet__status-head sheet__status-head--buff">Buffs</p>
                    <ul className="sheet__effects">
                        {status.buffs.map((buff) => (
                            <li className="sheet__effect sheet__effect--buff" key={buff}>
                                [{buff}]
                            </li>
                        ))}
                    </ul>

                    <p className="sheet__status-head sheet__status-head--debuff">Debuffs</p>
                    <ul className="sheet__effects">
                        {status.debuffs.map((debuff) => (
                            <li className="sheet__effect sheet__effect--debuff" key={debuff}>
                                [{debuff}]
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="nes-container is-dark is-rounded with-title sheet__panel sheet__abilities">
                    <p className="title">Skills &amp; Abilities</p>

                    <p className="sheet__group">Active</p>
                    <ul className="sheet__ability-list">{active.map(renderAbility)}</ul>

                    <p className="sheet__group">Passive</p>
                    <ul className="sheet__ability-list">{passive.map(renderAbility)}</ul>

                    {/* The description area. aria-live so choosing a different
                        ability is announced rather than silently swapping. */}
                    <div className="sheet__detail" aria-live="polite">
                        <p className="sheet__detail-head">
                            {selected.title}
                            <span className="sheet__detail-badge">{selected.badge}</span>
                        </p>
                        <p className="sheet__detail-body">
                            <RichText>{selected.body}</RichText>
                        </p>
                    </div>
                </section>

                <section className="nes-container is-dark is-rounded with-title sheet__panel sheet__equipment">
                    <p className="title">Equipment</p>

                    <ul className="sheet__slots">
                        {equipment.map((item) => (
                            <li className="sheet__slot" key={item.id} data-rarity={item.rarity}>
                                <span className="sheet__slot-kind">{item.slot}</span>
                                <span className="sheet__slot-name">{item.name}</span>
                                <span className="sheet__slot-rarity">{item.rarity}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Scene>
    );
}

export default SkillsScene;
