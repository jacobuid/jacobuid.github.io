import { useMemo, useRef } from 'react';
import ContactScene from './components/ContactScene';
import Hud from './components/Hud';
import LevelScene from './components/LevelScene';
import SceneRail from './components/SceneRail';
import SideQuestScene from './components/SideQuestScene';
import SkillsScene from './components/SkillsScene';
import StartScene from './components/StartScene';
import useActiveScene from './hooks/useActiveScene';
import useSceneParallax from './hooks/useSceneParallax';
import useSceneSnap from './hooks/useSceneSnap';
import timeline, { sideQuests } from './data/timeline';
import skills from './data/skills';
import './App.css';

/* Career length, counted from the first paid development work. */
const CAREER_START_YEAR = 2010;

/* Every scene in scroll order. The HUD reads the active one, the rail lists
   them all, and both index into this - so a scene cannot appear in one and be
   missing from the other. */
const buildScenes = () => [
    { id: 'start', tag: 'START', name: 'Insert coin' },
    ...timeline.map((entry) => ({
        id: entry.id,
        tag: entry.level,
        name: entry.title
    })),
    { id: 'side-quests', tag: 'BONUS', name: 'Side quests' },
    { id: 'skills', tag: 'ITEMS', name: 'Inventory' },
    { id: 'contact', tag: 'END', name: 'Continue?' }
];

function App() {
    const scrollRef = useRef(null);

    useSceneParallax(scrollRef);
    const goToScene = useSceneSnap(scrollRef);
    const activeIndex = useActiveScene(scrollRef);

    const scenes = useMemo(buildScenes, []);
    const careerYears = useMemo(
        () => new Date().getFullYear() - CAREER_START_YEAR,
        []
    );

    const questIndex = timeline.length + 1;

    return (
        <div className="app">
            <Hud />

            <SceneRail
                scenes={scenes}
                activeIndex={activeIndex}
                onSelect={goToScene}
            />

            <main className="app__scroll" ref={scrollRef}>
                <StartScene
                    index={0}
                    totalLevels={timeline.length}
                    careerYears={careerYears}
                />

                {timeline.map((entry, position) => (
                    <LevelScene key={entry.id} entry={entry} index={position + 1} />
                ))}

                <SideQuestScene quests={sideQuests} index={questIndex} />

                <SkillsScene
                    skills={skills}
                    index={questIndex + 1}
                    careerYears={careerYears}
                />

                <ContactScene index={questIndex + 2} careerYears={careerYears} />
            </main>
        </div>
    );
}

export default App;
