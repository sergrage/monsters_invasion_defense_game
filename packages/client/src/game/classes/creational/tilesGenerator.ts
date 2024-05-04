import PlacementTile from "@/game/classes/gameEntities/PlacementTile";
import { Position } from "@/game/interfaces";

interface TileOptions {
  position: Position;
  c: CanvasRenderingContext2D;
}

interface TileType {
  new (options: TileOptions): PlacementTile;
}

class TilesGenerator {
  ctx: CanvasRenderingContext2D;
  placementTilesData: number[];
  PlacementTile: TileType;

  constructor(
    ctx: CanvasRenderingContext2D,
    placementTilesData: number[],
    PlacementTile: TileType,
  ) {
    this.ctx = ctx;
    this.placementTilesData = placementTilesData;
    this.PlacementTile = PlacementTile;
  }

  generatePlacementTiles(): PlacementTile[] {
    const placementTilesData2D: number[][] = [];

    // Divide array into 1x20 rows
    for (let i = 0; i < this.placementTilesData.length; i += 20) {
      placementTilesData2D.push(this.placementTilesData.slice(i, i + 20));
    }

    const placementTiles: PlacementTile[] = [];

    // Generate placement tiles
    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(
            new this.PlacementTile({
              // tile size
              position: {
                x: x * 64,
                y: y * 64,
              },
              c: this.ctx,
            }),
          );
        }
      });
    });

    return placementTiles;
  }
}

export default TilesGenerator;
