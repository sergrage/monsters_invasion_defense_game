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

export interface IProjectileContext extends IContext {
  enemy: Enemy;
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

export interface ITowerParams {
  width: number;
  height: number;
  radius: number;
  speed: number;
  price: number;
  upgradePrice: number;
}

export interface ITowerExtraParams {
  width: number;
  height: number;
  towerImg: string;
  offset: IPosition;
}

export interface IEnemyConstructor extends IContext {
  frames: IFrames;
  imageSrc: IEnemyImg;
  enemyParams: IEnemyParams;
}

export interface ITowerConstructor extends IContext {
  frames: IFrames;
  imageSrc: string;
  towerExtraParams?: ITowerExtraParams;
  offset: IPosition;
  towerParams: ITowerParams;
}

export interface IProjectileConstructor extends IProjectileContext {
  imageSrc: string;
}

export interface ISprite extends IContext {
  imageSrc: string;
  towerExtraParams?: ITowerExtraParams;
  frames: IFrames;
  offset?: IPosition;
}

export interface ILevel {
  coins: number;
  hearts: number;
  waves: { [key: string]: number }[];
}
