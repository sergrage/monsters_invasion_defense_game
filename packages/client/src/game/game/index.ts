import Sprite from "@/game/classes/gameEntities/Sprite";
import myImageExplosion from "../img/explosion.png";
import Enemy from "@/game/classes/gameEntities/Enemy";
import Building from "@/game/classes/gameEntities/building";

class Game {
  coins: number;
  hearts: number;
  enemyCount: number;
  enemies: Enemy[];
  buildings: Building[];
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  placementTiles: any[] | null;
  mouse: { x: number | undefined; y: number | undefined };
  activeTile: any;
  explosions: Sprite[];
  eventSubject: any;
  mapGenerator: any;
  enemiesGenerator: any;
  tilesGenerator: any;

  constructor(
    coins: number,
    hearts: number,
    mapGenerator: any,
    enemiesGenerator: any,
    tilesGenerator: any,
    eventSubject: any,
  ) {
    this.coins = coins;
    this.hearts = hearts;
    this.enemyCount = 3;
    this.enemies = [];
    this.buildings = [];
    this.canvas = null;
    this.ctx = null;
    this.image = null;
    this.placementTiles = null;
    this.mouse = { x: undefined, y: undefined };
    this.animate = this.animate.bind(this);
    this.activeTile = null;
    this.explosions = [];
    this.eventSubject = eventSubject;

    // Injected dependencies
    this.mapGenerator = mapGenerator;
    this.enemiesGenerator = enemiesGenerator;
    this.tilesGenerator = tilesGenerator;
  }

  // Метод для изменения количества монет
  setCoins(newCoins: number) {
    this.coins += newCoins;
    this.triggerCoinsChangeEvent();
  }

  // Метод для вызова события об изменении количества монет
  triggerCoinsChangeEvent() {
    this.eventSubject.notify("coinsChanged", this.coins);
  }

  setHearts(newHearts: number) {
    this.hearts += newHearts;
    // Вызываем событие о изменении количества монет
    this.triggerHeartsChangeEvent();
  }

  setGameOver() {
    this.triggerGameOverEvent();
  }

  // Метод для вызова события об изменении количества монет
  triggerHeartsChangeEvent() {
    this.eventSubject.notify("heartsChanged", this.hearts);
  }

  triggerGameOverEvent() {
    this.eventSubject.notify("gameOver");
  }

  initialize() {
    this.initializeMap();
    this.initializeEnemies();
    this.initializeTiles();
  }

  initializeMap() {
    const { image, canvas, ctx } = this.mapGenerator as {
      image: HTMLImageElement;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
    };
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;

    this.canvas.addEventListener("click", this.handleCanvasClick.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  initializeEnemies() {
    this.enemies = this.enemiesGenerator.generate(this.enemyCount, Enemy);
  }

  initializeTiles() {
    this.placementTiles = this.tilesGenerator.generatePlacementTiles();
  }

  initGame() {
    this.image.onload = () => {
      this.animate();
    };
  }

  handleEnemyLogic(animationId) {
    if (this.enemies.length === 0) {
      this.handleSpawnMoreEnemies(2);
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update();
      if (enemy.position.x > this.canvas.width) {
        this.setHearts(-1);
        this.enemies.splice(i, 1);
        if (this.hearts <= 0) {
          cancelAnimationFrame(animationId);
          this.setGameOver();
          // document.querySelector("#gameOver").style.display = "flex";
        }
      }
    }
  }

  handleTilesLogic() {
    this.placementTiles.forEach(tile => {
      tile.update(this.mouse);
    });
  }

  handleSpawnMoreEnemies(count: number) {
    this.enemyCount += count;
    this.enemies = this.enemiesGenerator.generate(
      this.enemyCount + count,
      Enemy,
    );
  }

  animate() {
    const animationId = requestAnimationFrame(this.animate);
    this.ctx.drawImage(this.image, 0, 0);
    console.log("animate!");
    this.handleEnemyLogic(animationId);
    this.handleTilesLogic();
    this.handleBuildingsLogic();
  }

  handleBuildingsLogic() {
    this.buildings.forEach(building => {
      this.updateBuilding(building);
      this.handleBuildingTarget(building);
      this.handleBuildingProjectiles(building);
    });
  }

  updateBuilding(building) {
    building.update();
  }

  handleBuildingTarget(building) {
    const validEnemies = this.findValidEnemies(building);
    building.target = validEnemies[0];
  }

  findValidEnemies(building) {
    return this.enemies.filter(enemy => {
      const distance = this.calculateDistance(enemy.center, building.center);
      return distance < enemy.radius + building.radius;
    });
  }

  handleBuildingProjectiles(building) {
    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      const projectile = building.projectiles[i];
      this.updateProjectile(projectile);
      this.handleProjectileCollision(projectile, building, i);
    }
  }

  updateProjectile(projectile) {
    projectile.update();
  }

  handleProjectileCollision(projectile, building, i) {
    const distance = this.calculateDistance(
      projectile.enemy.center,
      projectile.position,
    );
    if (distance < projectile.enemy.radius + projectile.radius) {
      this.handleEnemyHit(projectile.enemy);
      this.handleProjectileHit(projectile, building, i);
    }
  }

  handleEnemyHit(enemy) {
    enemy.health -= 20;
    if (enemy.health <= 0) {
      const enemyIndex = this.enemies.findIndex(e => e === enemy);
      if (enemyIndex > -1) {
        this.enemies.splice(enemyIndex, 1);
        this.setCoins(25);
      }
    }
  }

  handleProjectileHit(projectile, building, i) {
    this.explosions.push(
      new Sprite({
        position: { x: projectile.position.x, y: projectile.position.y },
        imageSrc: myImageExplosion,
        frames: { max: 4 },
        offset: { x: 0, y: 0 },
        c: this.ctx,
      }),
    );
    building.projectiles.splice(i, 1);
  }

  calculateDistance(point1, point2) {
    const xDifference = point1.x - point2.x;
    const yDifference = point1.y - point2.y;
    return Math.hypot(xDifference, yDifference);
  }

  handleCanvasClick() {
    if (
      this.activeTile &&
      !this.activeTile.isOccupied &&
      this.coins - 50 >= 0
    ) {
      this.setCoins(-50);
      this.buildings.push(
        new Building({
          position: {
            x: this.activeTile.position.x,
            y: this.activeTile.position.y,
          },
          c: this.ctx,
        }),
      );
      this.activeTile.isOccupied = true;
      this.buildings.sort((a, b) => a.position.y - b.position.y);
    }
  }

  handleMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    this.activeTile = null;
    for (let i = 0; i < this.placementTiles.length; i++) {
      const tile = this.placementTiles[i];
      if (
        this.mouse.x + 160 > tile.position.x &&
        this.mouse.x - 160 < tile.position.x + tile.size &&
        this.mouse.y + 160 > tile.position.y &&
        this.mouse.y - 160 < tile.position.y + tile.size
      ) {
        this.activeTile = tile;
        break;
      }
    }
  }
}

export default Game;
