import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";
import monsters from "@/game/classes/gameEntities/Enemies";

import { IPosition, IWave } from "@/game/interfaces";

interface Waypoint {
  x: number;
  y: number;
}

interface EnemyOptions {
  position: IPosition;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export interface EnemyType {
  new (options: EnemyOptions): Enemy;
}

class EnemiesGenerator {
  private ctx: CanvasRenderingContext2D;
  private waypoints: Waypoint[];

  constructor(ctx: CanvasRenderingContext2D, waypoints: Waypoint[]) {
    this.ctx = ctx;
    this.waypoints = waypoints;
  }

  generate(wave: IWave, canvas: HTMLCanvasElement): Enemy[] {
    const enemies: Enemy[] = [];

    for (const [key, { amount, delay }] of Object.entries(wave)) {
      for (let i = 0; i < amount; i++) {
        setTimeout(() => {
          const EnemyType = monsters[key as unknown as keyof typeof monsters];
          const xOffset = (i + 1) * 150;

          enemies.push(
            new EnemyType({
              position: {
                x: this.waypoints[0].x - xOffset,
                y: this.waypoints[0].y,
              },
              ctx: this.ctx,
              canvas,
            }),
          );
        }, delay);
      }
    }

    return enemies;
  }
}

export default EnemiesGenerator;
