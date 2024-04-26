class TilesGenerator {
  ctx: CanvasRenderingContext2D;
  placementTilesData: number[];
  PlacementTile: any; // Change `any` to the actual type of PlacementTile if possible

  constructor(
    ctx: CanvasRenderingContext2D,
    placementTilesData: number[],
    PlacementTile: any,
  ) {
    this.ctx = ctx;
    this.placementTilesData = placementTilesData;
    this.PlacementTile = PlacementTile;
  }

  generatePlacementTiles(): any[] {
    // Change `any` to the actual type of PlacementTile if possible
    const placementTilesData2D: number[][] = [];
    for (let i = 0; i < this.placementTilesData.length; i += 20) {
      placementTilesData2D.push(this.placementTilesData.slice(i, i + 20));
    }

    const placementTiles: any[] = []; // Change `any` to the actual type of PlacementTile if possible
    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(
            new this.PlacementTile({
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
