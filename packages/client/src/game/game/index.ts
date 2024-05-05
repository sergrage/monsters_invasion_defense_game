import Sprite from "@/game/classes/gameEntities/Sprite";
import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";
import Building from "@/game/classes/gameEntities/Buildings/Building";
import Projectile from "@/game/classes/gameEntities/Projectiles/Projectile";
import PlacementTile from "@/game/classes/gameEntities/PlacementTile";
import EventSubject from "@/game/classes/behavioral/eventSubject";
import MapGenerator from "@/game/classes/creational/mapGenerator";
import TilesGenerator from "@/game/classes/creational/tilesGenerator";
import EnemiesGenerator from "@/game/classes/creational/EnemiesGenerator";
import ElectroTower from "@/game/classes/gameEntities/Buildings/ElectroTower";

import myImageExplosion from "@/game/img/explosion.png";
import { ILevel, Position } from "@/game/interfaces";

class Game {
  coins: number;
  hearts: number;
  enemies: Enemy[];
  buildings: Building[];
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  placementTiles: PlacementTile[] | null;
  mouse: { x: number | undefined; y: number | undefined };
  activeTile: PlacementTile | null;
  explosions: Sprite[];
  eventSubject: EventSubject;
  mapGenerator: MapGenerator;
  enemiesGenerator: EnemiesGenerator;
  tilesGenerator: TilesGenerator;
  level: ILevel;

  constructor(
    coins: number,
    hearts: number,
    mapGenerator: MapGenerator,
    enemiesGenerator: EnemiesGenerator,
    tilesGenerator: TilesGenerator,
    eventSubject: EventSubject,
    level: ILevel,
  ) {
    this.coins = coins;
    this.hearts = hearts;
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
    this.level = level;

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
    this.initializeTiles();
    this.spawnEnemies();
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

  initializeTiles() {
    this.placementTiles = this.tilesGenerator.generatePlacementTiles();
  }

  // generate next wave
  spawnEnemies() {
    if (this.canvas) {
      this.enemies = this.enemiesGenerator.generate(
        this.level.waves[0],
        this.canvas,
      );

      // remove generated wave
      this.level.waves.splice(0, 1);
    } else {
      console.error("Canvas is null. Cannot spawn more enemies.");
    }
  }

  initGame() {
    if (this.image)
      this.image.onload = () => {
        this.animate();
      };
  }

  handleEnemyLogic(animationId: number) {
    // id for stopping the animation
    // let id = animationId;

    // fire next wave
    if (this.enemies.length === 0 && this.level.waves.length > 0) {
      // need to add new wave approaching alert message
      console.log("new wave is approaching");
      // stop animation before new wave starts
      // cancelAnimationFrame(animationId);
      // this.buildings.forEach(building => building.clearProjectiles());

      // pause the game before new wave starts
      // setTimeout(() => {
      console.log("new wave!");

      // resume the animation
      // id = requestAnimationFrame(this.animate);
      this.spawnEnemies();
      // }, 3000);
    }

    // no enemies & no waves left -> level completed logic
    if (this.enemies.length === 0 && this.level.waves.length === 0) {
      console.log("you won!");
      cancelAnimationFrame(animationId);
      return;
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update();

      if (this.canvas && enemy.position.x > this.canvas.width) {
        this.setHearts(-1);
        this.enemies.splice(i, 1);

        if (this.hearts <= 0) {
          cancelAnimationFrame(animationId);
          this.setGameOver();
        }
      }
    }
  }

  handleTilesLogic() {
    if (Array.isArray(this.placementTiles))
      this.placementTiles.forEach(tile => {
        tile.update(this.mouse);
      });
  }

  animate() {
    const animationId = requestAnimationFrame(this.animate);
    if (this.ctx) {
      this.ctx.drawImage(this.image!, 0, 0);
      // console.log("animate!");
      this.handleEnemyLogic(animationId);
      this.handleTilesLogic();
      this.handleBuildingsLogic();
    }
  }

  handleBuildingsLogic() {
    this.buildings.forEach(building => {
      this.updateBuilding(building);
      this.handleBuildingTarget(building);
      this.handleBuildingProjectiles(building);
    });
  }

  updateBuilding(building: Building) {
    building.update();
  }

  handleBuildingTarget(building: Building) {
    const validEnemies = this.findValidEnemies(building);
    building.target = validEnemies[0];
  }

  findValidEnemies(building: Building) {
    return this.enemies.filter(enemy => {
      const distance = this.calculateDistance(enemy.center, building.center);
      return distance < enemy.radius + building.radius;
    });
  }

  handleBuildingProjectiles(building: Building) {
    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      const projectile = building.projectiles[i];
      this.updateProjectile(projectile);
      this.handleProjectileCollision(projectile, building, i);
    }
  }

  updateProjectile(projectile: Projectile) {
    projectile.update();
  }

  handleProjectileCollision(
    projectile: Projectile,
    building: Building,
    i: number,
  ) {
    const distance = this.calculateDistance(
      projectile.enemy.center,
      projectile.position,
    );
    if (distance < projectile.radius + projectile.radius) {
      this.handleEnemyHit(projectile.enemy);
      this.handleProjectileHit(projectile, building, i);
    }
  }

  handleEnemyHit(enemy: Enemy) {
    enemy.health -= 20;
    if (enemy.health <= 0) {
      const enemyIndex = this.enemies.findIndex(e => e === enemy);
      if (enemyIndex > -1) {
        this.enemies.splice(enemyIndex, 1);
        this.setCoins(25);
      }
    }
  }

  handleProjectileHit(projectile: Projectile, building: Building, i: number) {
    // this.ctx && this.canvas type guard + добавил canvas т.к. его ожидает sprite
    if (this.ctx && this.canvas) {
      this.explosions.push(
        new Sprite({
          position: { x: projectile.position.x, y: projectile.position.y },
          canvas: this.canvas,
          imageSrc: myImageExplosion,
          frames: { max: 4 },
          offset: { x: 0, y: 0 },
          c: this.ctx,
        }),
      );
      building.projectiles.splice(i, 1);
    }
  }

  calculateDistance(point1: Position, point2: Position) {
    const xDifference = point1.x - point2.x;
    const yDifference = point1.y - point2.y;
    return Math.hypot(xDifference, yDifference);
  }

  handleCanvasClick() {
    // change isOccupied to occupied. Bug?
    if (this.activeTile && !this.activeTile.occupied && this.coins - 50 >= 0) {
      this.setCoins(-50);

      // this.ctx && this.canvas type guard + добавил canvas т.к. его ожидает building
      if (this.ctx && this.canvas) {
        this.buildings.push(
          new ElectroTower({
            position: {
              x: this.activeTile.position.x - 80,
              y: this.activeTile.position.y - 220,
            },
            canvas: this.canvas,
            c: this.ctx,
          }),
        );
      }

      this.activeTile.occupied = true;
      this.buildings.sort((a, b) => a.position.y - b.position.y);
    }
  }

  handleMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    this.activeTile = null;
    if (Array.isArray(this.placementTiles))
      for (let i = 0; i < this.placementTiles.length; i++) {
        const tile = this.placementTiles[i];
        if (
          this.mouse.x > tile.position.x &&
          this.mouse.x < tile.position.x + tile.size &&
          this.mouse.y > tile.position.y &&
          this.mouse.y < tile.position.y + tile.size
        ) {
          this.activeTile = tile;
          break;
        }
      }
  }
}

export default Game;
