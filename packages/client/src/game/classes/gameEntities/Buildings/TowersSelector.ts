import towersData from "@/game/mocks/towersData";
import { ITowerParams } from "@/game/interfaces";

import style from "./style.module.scss";

export default class TowersSelector {
  previewRoot: HTMLElement | null = null;
  towers: ITowerParams[] | null = [];
  selectedTower: number | null = null;
  coins: number;

  constructor(coins: number) {
    // get towers form database
    this.towers = towersData || null;
    this.coins = coins;
    this.init();
  }

  public init() {
    if (!this.towers) return;

    // select preview section
    this.previewRoot = document.getElementById("towerSelector");

    // add tower preview images
    this.towers.forEach((tower, index) => {
      const towerImg = document.createElement("img");
      towerImg.classList.add(style.towerPreview);
      towerImg.setAttribute("src", tower.preview);
      towerImg.setAttribute("alt", tower.title);
      towerImg.setAttribute("title", tower.title);
      towerImg.setAttribute("data-index", index.toString());

      this.previewRoot?.appendChild(towerImg);
    });

    this.updateAvailableTowers();
    this.previewRoot?.addEventListener(
      "click",
      this.clickTowerHandler.bind(this),
    );
  }

  // select tower
  private clickTowerHandler(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== "IMG") return;

    // get tower index
    this.selectedTower = Number(target.dataset.index);
  }

  // return selected tower data
  public getSelectedTower(): ITowerParams | null {
    if (!this.towers || this.selectedTower === null) {
      return null;
    }

    return this.towers[this.selectedTower];
  }

  public updateCoins(coins: number): void {
    this.coins = coins;

    this.updateAvailableTowers();
  }

  // if no coins => disable towers
  private updateAvailableTowers() {
    if (!this.towers) return;

    this.towers.forEach(tower => {
      const towerImg = this.previewRoot!.querySelector(
        `img[title="${tower.title}"]`,
      );

      if (this.coins < tower.price) {
        towerImg!.classList.add(style.disabled);
      } else {
        towerImg!.classList.remove(style.disabled);
      }
    });
  }
}
