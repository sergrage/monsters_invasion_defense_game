import EventSubject from "@/game/classes/behavioral/eventSubject";
import MapGenerator from "@/game/classes/creational/mapGenerator";
import TilesGenerator from "@/game/classes/creational/tilesGenerator";
import EnemiesGenerator from "@/game/classes/creational/EnemiesGenerator";
import TowersSelector from "@/game/classes/gameEntities/Buildings/TowerSelector";
import TowerConstructor from "@/game/classes/gameEntities/Buildings/TowerConstructor";
import Projectile from "@/game/classes/gameEntities/Projectiles/ProjectileConstructor";
import Sprite from "@/game/classes/gameEntities/Sprite";
import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";
import PlacementTile from "@/game/classes/gameEntities/PlacementTile";
import TowerMenu from "@/game/classes/gameEntities/Buildings/TowerMenu";

import myImageExplosion from "@/game/img/explosion.png";
import { ILevel, IPosition } from "@/game/interfaces";

class Game {
  coins: number;
  hearts: number;
  enemies: Enemy[];
  buildings: TowerConstructor[];
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  placementTiles: PlacementTile[] | null;
  mouse: { x: number | undefined; y: number | undefined };
  activeTile: PlacementTile | null;
  explosions: Sprite[];
  eventSubject;
  mapGenerator;
  enemiesGenerator;
  tilesGenerator;
  level;
  towersSelector;
  towerMenu;

  constructor(
    coins: number,
    hearts: number,
    mapGenerator: MapGenerator,
    enemiesGenerator: EnemiesGenerator,
    tilesGenerator: TilesGenerator,
    eventSubject: EventSubject,
    level: ILevel,
    towersSelector: TowersSelector,
    towerMenu: TowerMenu,
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
    this.towersSelector = towersSelector;
    this.towerMenu = towerMenu;
  }

  // Метод для изменения количества монет
  setCoins(newCoins: number) {
    this.coins += newCoins;
    this.towersSelector.updateCoins(this.coins);
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
    if (!this.canvas || this.level.waves.length === 0) {
      return;
    }
    this.enemies = this.enemiesGenerator.generate(
      this.level.waves[0],
      this.canvas,
    );

    // remove generated wave
    this.level.waves.splice(0, 1);
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
    // cancelAnimationFrame(animationId);
    // this.buildings.forEach(building => building.clearProjectiles());
    // id = requestAnimationFrame(this.animate);

    // fire next wave
    if (this.enemies.length === 0 && this.level.waves.length > 0) {
      let timeout;
      clearTimeout(timeout);

      console.log("new wave is approaching");

      timeout = setTimeout(() => {
        console.log("new wave!");

        this.spawnEnemies();
      }, 3000);
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

  updateBuilding(building: TowerConstructor) {
    building.update();
  }

  handleBuildingTarget(building: TowerConstructor) {
    const validEnemies = this.findValidEnemies(building);
    building.target = validEnemies[0];
  }

  findValidEnemies(building: TowerConstructor) {
    const validEnemies = this.enemies.filter(enemy => {
      const distance = this.calculateDistance(enemy.center, building.center);
      return distance < enemy.radius + building.radius;
    });

    // // sort by distance - mb don't need?
    // validEnemies.sort(
    //   (a, b) =>
    //     this.calculateDistance(a.center, building.center) -
    //     this.calculateDistance(b.center, building.center),
    // );

    return validEnemies;
  }

  handleBuildingProjectiles(building: TowerConstructor) {
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
    building: TowerConstructor,
    i: number,
  ) {
    const distance = this.calculateDistance(
      projectile.enemy.center,
      projectile.position,
    );
    if (distance < projectile.radius + projectile.radius) {
      this.handleEnemyHit(projectile);
      this.handleProjectileHit(projectile, building, i);
    }
  }

  handleEnemyHit(projectile: Projectile) {
    const { enemy, damage } = projectile;

    enemy.health -= damage;
    if (enemy.health <= 0) {
      const enemyIndex = this.enemies.findIndex(e => e === enemy);

      if (enemyIndex > -1) {
        const deadEnemy = this.enemies.splice(enemyIndex, 1);
        const reward = deadEnemy[0].reward;

        this.setCoins(reward);
      }
    }
  }

  handleProjectileHit(
    projectile: Projectile,
    building: TowerConstructor,
    i: number,
  ) {
    if (this.ctx && this.canvas) {
      const explosion = new Sprite({
        position: { x: projectile.position.x, y: projectile.position.y },
        canvas: this.canvas,
        imageSrc: myImageExplosion,
        frames: { max: 4 },
        offset: { x: 0, y: 0 },
        ctx: this.ctx,
      });
      explosion.draw();
      building.projectiles.splice(i, 1);
    }
  }

  calculateDistance(point1: IPosition, point2: IPosition) {
    const xDifference = point1.x - point2.x;
    const yDifference = point1.y - point2.y;
    return Math.hypot(xDifference, yDifference);
  }

  handleCanvasClick() {
    if (!this.activeTile) {
      return;
    }

    // if no tile is not occupied -> create tower
    if (!this.activeTile.occupied) {
      this.handleTowerCreation();
      return;
    }

    // if tile is occupied -> show tower menu
    this.handleTowerMenu();
  }

  handleTowerCreation() {
    const selectedTower = this.towersSelector.getSelectedTower();

    if (
      !this.ctx ||
      !this.canvas ||
      selectedTower === null ||
      this.coins < selectedTower.price ||
      !this.activeTile
    ) {
      return;
    }

    this.buildings.push(
      new TowerConstructor({
        position: {
          x: this.activeTile.position.x,
          y: this.activeTile.position.y,
        },
        canvas: this.canvas,
        ctx: this.ctx,
        towerData: selectedTower,
      }),
    );

    this.setCoins(-selectedTower.price);
    this.activeTile.occupied = true;
    this.buildings.sort((a, b) => a.position.y - b.position.y);
  }

  handleTowerMenu() {
    if (!this.activeTile) {
      return;
    }

    // get coords to position tower menu and find selected tower
    const tileCoords = this.activeTile.position;
    const selectedTower = this.buildings.find(
      building =>
        building.position.x === tileCoords?.x &&
        building.position.y === tileCoords?.y,
    );

    if (!selectedTower) {
      return;
    }

    this.towerMenu.show(
      tileCoords,
      selectedTower,
      this.handleBuildingRemoval.bind(this),
      this.triggerCoinsChangeEvent.bind(this),
    );
  }

  // remove selected tower after selling
  handleBuildingRemoval(selectedTower: TowerConstructor) {
    if (!selectedTower || !this.activeTile) {
      return;
    }

    this.buildings = this.buildings.filter(
      building =>
        building.position.x !== selectedTower.position.x ||
        building.position.y !== selectedTower.position.y,
    );
    this.activeTile.occupied = false;
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
