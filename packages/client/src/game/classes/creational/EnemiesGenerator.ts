import { Position } from "@/game/interfaces";
import Enemy from "@/game/classes/gameEntities/Enemy";

interface Waypoint {
  x: number;
  y: number;
}

interface EnemyOptions {
  position: Position;
  c: CanvasRenderingContext2D;
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

  generate(amount: number, EnemyType: EnemyType): Enemy[] {
    // тип EnemyType здесь нужно указать, если он известен
    const enemies: Enemy[] = [];

    for (let i = 1; i < amount + 1; i++) {
      const xOffset = i * 150;
      enemies.push(
        new EnemyType({
          position: {
            x: this.waypoints[0].x - xOffset,
            y: this.waypoints[0].y,
          },
          c: this.c,
        }),
      );
    }

    return enemies;
  }
}

export default EnemiesGenerator;
