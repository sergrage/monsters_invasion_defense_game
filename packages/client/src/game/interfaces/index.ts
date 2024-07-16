import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

export interface IPosition {
  x: number;
  y: number;
}

export interface IFrames {
  max: number;
  current?: number;
  elapsed?: number;
  hold?: number;
}

export interface IContext {
  position: IPosition;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export interface IEnemyImg {
  right: string;
  left: string;
  back: string;
  front: string;
}

export interface IEnemyParams {
  width: number;
  height: number;
  waypointIndex: number;
  radius: number;
  health: number;
  speed: number;
  reward: number;
}

export interface ITowerExtraParams {
  width: number;
  height: number;
  towerImgs: string[];
  offset: IPosition;
}

export interface ITowerParams {
  title: string;
  preview: string;
  previewEl?: HTMLImageElement;
  width: number;
  height: number;
  radius: number;
  damage: number;
  speed: number;
  price: number;
  upgradePrice: number;
  imgs: string[];
  offset: IPosition;
  frames: IFrames;
  extraParams?: ITowerExtraParams;
  projectile: {
    offset: IPosition;
    imageSrc: string;
    needRotation: boolean;
  };
}

export interface IEnemyConstructor extends IContext {
  frames: IFrames;
  imageSrc: IEnemyImg;
  enemyParams: IEnemyParams;
}

export interface ITowerConstructor extends IContext {
  towerData: ITowerParams;
}

export interface IProjectileConstructor extends IContext {
  enemy: Enemy;
  imageSrc: string;
  needRotation: boolean;
  damage: number;
  towerTitle: string;
}

export interface ISprite extends IContext {
  imageSrc: string;
  towerExtraParams?: ITowerExtraParams;
  frames: IFrames;
  offset?: IPosition;
  needRotation?: boolean;
}

export interface IWave {
  [key: string]: {
    amount: number;
    delay: number;
  };
}

export interface ILevel {
  coins: number;
  hearts: number;
  waves: IWave[];
}
