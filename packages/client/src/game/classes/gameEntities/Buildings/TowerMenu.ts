import TowerConstructor from "@/game/classes/gameEntities/Buildings/TowerConstructor";

import style from "@/pages/game/style.module.scss";
import { IPosition } from "@/game/interfaces";

export default class TowerMenu {
  tileCoords: IPosition | null = null;
  selectedTower: TowerConstructor | null = null;
  menu: HTMLElement | null = null;
  upgradeBtn: HTMLButtonElement | null = null;
  sellBtn: HTMLButtonElement | null = null;
  coins: number;
  handleBuildingRemoval: (selectedTower: TowerConstructor) => void = () => {};
  triggerCoinsChangeEvent: () => void = () => {};

  constructor(coins: number) {
    this.coins = coins;

    this.init();
  }

  private init() {
    this.menu = document.getElementById("towerMenu")!;
    this.upgradeBtn = this.menu.querySelector('button[title="Upgrade"]')!;
    this.sellBtn = this.menu.querySelector('button[title="Sell"]')!;

    if (!this.menu || !this.upgradeBtn || !this.sellBtn) {
      return;
    }

    this.upgradeBtn.addEventListener("click", () => this.upgradeHandler());
    this.sellBtn.addEventListener("click", () => this.sellHandler());
  }

  private upgradeHandler() {
    if (
      !this.selectedTower ||
      this.selectedTower.towerData.upgradePrice > this.coins
    ) {
      return;
    }

    this.coins -= this.selectedTower.towerData.upgradePrice;

    this.hide();
    this.selectedTower.upgrade();
    this.triggerCoinsChangeEvent();
  }

  private sellHandler() {
    if (!this.selectedTower) {
      return;
    }

    this.coins += this.selectedTower.towerData.price * 0.5;
    this.hide();
    this.handleBuildingRemoval(this.selectedTower);
    this.triggerCoinsChangeEvent();
  }

  public show(
    tileCoords: IPosition,
    selectedTower: TowerConstructor,
    handleBuildingRemoval: (selectedTower: TowerConstructor) => void,
    triggerCoinsChangeEvent: () => void,
  ) {
    if (!this.menu) {
      return;
    }

    this.tileCoords = tileCoords;
    this.selectedTower = selectedTower;
    this.handleBuildingRemoval = handleBuildingRemoval;
    this.triggerCoinsChangeEvent = triggerCoinsChangeEvent;

    this.menu.style.top = `${this.tileCoords!.y}px`;
    this.menu.style.left = `${this.tileCoords!.x}px`;

    this.menu.classList.add(style.active);
  }

  public hide() {
    if (!this.menu) {
      return;
    }

    this.menu.classList.remove(style.active);
  }
}
