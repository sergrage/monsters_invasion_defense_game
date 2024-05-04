import { Position } from "@/game/interfaces";
import Orc from "@/game/classes/gameEntities/Enemies/DemoOrc";

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
  new (options: EnemyOptions): Orc;
}

class EnemiesGenerator {
  private c: CanvasRenderingContext2D;
  private waypoints: Waypoint[];

  constructor(c: CanvasRenderingContext2D, waypoints: Waypoint[]) {
    this.c = c;
    this.waypoints = waypoints;
  }

  generate(
    amount: number,
    EnemyType: EnemyType,
    canvas: HTMLCanvasElement,
  ): Orc[] {
    const enemies: Orc[] = [];

    for (let i = 1; i < amount + 1; i++) {
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

    return enemies;
  }
}

export default EnemiesGenerator;
