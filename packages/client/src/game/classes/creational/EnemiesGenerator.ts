import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";
import monsters from "@/game/classes/gameEntities/Enemies";

import { Position } from "@/game/interfaces";

interface Waypoint {
  x: number;
  y: number;
}

interface EnemyOptions {
  position: Position;
  c: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export interface EnemyType {
  new (options: EnemyOptions): Enemy;
}

class EnemiesGenerator {
  private c: CanvasRenderingContext2D;
  private waypoints: Waypoint[];

  constructor(c: CanvasRenderingContext2D, waypoints: Waypoint[]) {
    this.c = c;
    this.waypoints = waypoints;
  }

  generate(
    wave: { [key: string]: number },
    canvas: HTMLCanvasElement,
  ): Enemy[] {
    const enemies: Enemy[] = [];

    // iterate through wave
    for (const [key, amount] of Object.entries(wave)) {
      // generate each zombie type
      for (let i = 1; i < amount + 1; i++) {
        const EnemyType = monsters[key as unknown as keyof typeof monsters];

        // enemy size offset
        const xOffset = i * 150;

        enemies.push(
          new EnemyType({
            position: {
              x: this.waypoints[0].x - xOffset,
              y: this.waypoints[0].y,
            },
            c: this.c,
            canvas,
          }),
        );
      }
    }

    return enemies;
  }
}

export default EnemiesGenerator;
