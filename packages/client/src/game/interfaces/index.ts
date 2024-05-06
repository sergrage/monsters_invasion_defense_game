import Enemy from "../classes/gameEntities/Enemies/Enemy";

export interface Position {
  x: number;
  y: number;
}

export interface Frames {
  max: number;
  current?: number;
  elapsed?: number;
  hold?: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface IContext {
  position: Position;
  canvas: HTMLCanvasElement;
  c: CanvasRenderingContext2D;
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

export interface ITowerImg {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
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

export interface IEnemyConstructor extends IContext {
  frames: Frames;
  imageSrc: IEnemyImg;
  enemyParams: IEnemyParams;
}

export interface ITowerConstructor extends IContext {
  frames: Frames;
  imageSrc: ITowerImg;
  offset: Offset;
  towerParams: ITowerParams;
}

export interface IProjectileConstructor extends IProjectileContext {
  imageSrc: string;
}

export interface ISprite extends IContext {
  imageSrc: string;
  frames: Frames;
  offset?: Offset;
}

export interface ILevel {
  coins: number;
  hearts: number;
  waves: { [key: string]: number }[];
}
