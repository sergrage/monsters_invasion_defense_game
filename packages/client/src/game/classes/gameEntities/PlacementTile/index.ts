class PlacementTile {
  constructor({ position = { x: 0, y: 0 }, c }) {
    this.position = position;
    this.size = 64;
    this.color = "rgba(255, 255, 255, 0.15)";
    this.occupied = false;
    this.c = c; // Store the canvas context
  }

  draw() {
    this.c.fillStyle = this.color;
    this.c.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(mouse) {
    this.draw();
    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = "white";
    } else this.color = "rgba(255, 255, 255, 0.15)";
  }
}

export default PlacementTile;
