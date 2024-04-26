interface Waypoint {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface EnemyOptions {
  position: Position;
  c: CanvasRenderingContext2D;
}

interface EnemyType {
  new (options: EnemyOptions): any;
}

class EnemiesGenerator {
  private c: CanvasRenderingContext2D;
  private waypoints: Waypoint[];

  constructor(c: any, waypoints: Waypoint[]) {
    this.c = c;
    this.waypoints = waypoints;
  }

  generate(amount: number, EnemyType: EnemyType): any[] {
    // тип EnemyType здесь нужно указать, если он известен
    const enemies: any[] = [];

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
