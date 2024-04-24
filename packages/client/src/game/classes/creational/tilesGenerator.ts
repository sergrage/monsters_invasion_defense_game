class TilesGenerator {
  constructor(ctx, placementTilesData, PlacementTile) {
    this.ctx = ctx;
    this.placementTilesData = placementTilesData;
    this.PlacementTile = PlacementTile;
  }

  generatePlacementTiles() {
    const placementTilesData2D = [];
    for (let i = 0; i < this.placementTilesData.length; i += 20) {
      placementTilesData2D.push(this.placementTilesData.slice(i, i + 20));
    }

    const placementTiles = [];
    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(
            new this.PlacementTile({
              position: {
                x: x * 64,
                y: y * 64,
              },
              c: this.ctx, // Pass the canvas context here
            }),
          );
        }
      });
    });

    return placementTiles;
  }
}

export default TilesGenerator;
