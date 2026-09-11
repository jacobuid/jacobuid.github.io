import CampusSprite from './sprites/CampusSprite';
import InternSprite from './sprites/InternSprite';
import MarketicitySprite from './sprites/MarketicitySprite';
import DellWpSprite from './sprites/DellWpSprite';
import MatchCellSprite from './sprites/MatchCellSprite';
import ArgoLogoSprite from './sprites/ArgoLogoSprite';
import MatchLogoSprite from './sprites/MatchLogoSprite';
import PwcLogoSprite from './sprites/PwcLogoSprite';
import RealpageLogoSprite from './sprites/RealpageLogoSprite';
import UsaaLogoSprite from './sprites/UsaaLogoSprite';
import TideSprite from './sprites/TideSprite';
import WorkstationSprite from './sprites/WorkstationSprite';
import './sprites/sprites.css';

const SPRITES = {
    campus: CampusSprite,
    intern: InternSprite,
    marketicity: MarketicitySprite,
    dellWp: DellWpSprite,
    argoLogo: ArgoLogoSprite,
    matchCell: MatchCellSprite,
    matchLogo: MatchLogoSprite,
    pwcLogo: PwcLogoSprite,
    realpageLogo: RealpageLogoSprite,
    usaaLogo: UsaaLogoSprite,
    tide: TideSprite,
    workstation: WorkstationSprite
};

/** Thin dispatcher so scenes name a sprite instead of importing one. */
function SceneSprite({ name }) {
    const Sprite = SPRITES[name];

    if (typeof Sprite === 'undefined') return null;

    return <Sprite />;
}

export default SceneSprite;
