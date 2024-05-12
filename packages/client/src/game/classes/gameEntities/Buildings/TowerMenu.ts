import TowerConstructor from "@/game/classes/gameEntities/Buildings/TowerConstructor";
import PlacementTile from "@/game/classes/gameEntities/PlacementTile";

import style from "@/pages/game/style.module.scss";
import { IPosition } from "@/game/interfaces";

export default class TowerMenu {
  tileCoords: IPosition | null = null;
  selectedTower: TowerConstructor | null = null;
  menu: HTMLElement | null = null;
  upgradeBtn: HTMLButtonElement | null = null;
  sellBtn: HTMLButtonElement | null = null;
  coins: number | null = null;
  isOpen: boolean = false;
  placementTile: PlacementTile | null = null;
  handleBuildingRemoval: (
    selectedTower: TowerConstructor,
    placementTile: PlacementTile,
  ) => void = () => {};
  setCoins: (coins: number) => void = () => {};

  constructor() {
    this.init();
  }

  private init() {
    this.menu = document.getElementById("towerMenu")!;
    this.upgradeBtn = this.menu.querySelector('img[alt="Upgrade tower"]')!;
    this.sellBtn = this.menu.querySelector('img[alt="Sell tower"]')!;

    if (!this.menu || !this.upgradeBtn || !this.sellBtn) {
      return;
    }

    this.upgradeBtn.addEventListener("click", () => this.upgradeHandler());
    this.sellBtn.addEventListener("click", () => this.sellHandler());
  }

  private upgradeHandler() {
    if (
      !this.selectedTower ||
      this.coins ||
      this.selectedTower.towerData.upgradePrice > this.coins!
    ) {
      return;
    }

    const cost = Math.round(this.selectedTower.towerData.upgradePrice);

    this.hide();
    this.selectedTower.upgrade();
    this.setCoins(-cost);
  }

  private sellHandler() {
    if (!this.selectedTower || !this.placementTile) {
      return;
    }

    const cost = Math.round(this.selectedTower.towerData.price * 0.5);

    this.hide();
    this.handleBuildingRemoval(this.selectedTower, this.placementTile);
    this.setCoins(cost);
  }

  public show(
    tileCoords: IPosition,
    selectedTower: TowerConstructor,
    placementTile: PlacementTile,
    coins: number,
    handleBuildingRemoval: (
      selectedTower: TowerConstructor,
      placementTile: PlacementTile,
    ) => void,
    setCoins: (coins: number) => void,
  ) {
    if (!this.menu) {
      return;
    }

    this.tileCoords = tileCoords;
    this.selectedTower = selectedTower;
    this.handleBuildingRemoval = handleBuildingRemoval;
    this.setCoins = setCoins;
    this.placementTile = placementTile;
    this.coins = coins;

    this.menu.style.top = `${this.tileCoords!.y - 40}px`;
    this.menu.style.left = `${this.tileCoords!.x - 40}px`;

    this.menu.classList.add(style.active);
    setTimeout(() => {
      this.menu!.classList.add(style.show);
    }, 0);

    this.isOpen = true;

    document.addEventListener("mousedown", e => this.handleClickOutside(e));
  }

  handleClickOutside(e: MouseEvent): void {
    if (e instanceof MouseEvent && !this.menu!.contains(e.target as Node)) {
      this.hide();
    }
  }

  public hide() {
    if (!this.menu) {
      return;
    }

    this.menu!.classList.remove(style.show);
    this.menu!.classList.remove(style.active);

    this.isOpen = false;
    document.removeEventListener("mousedown", e => this.handleClickOutside(e));
  }
}
