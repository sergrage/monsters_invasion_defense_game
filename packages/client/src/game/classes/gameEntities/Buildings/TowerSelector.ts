import towersData from "@/game/mocks/towersData";

import style from "./style.module.scss";
import { ITowerParams } from "@/game/interfaces";

export default class TowerSelector {
  previewRoot: HTMLElement | null = null;
  selectCircle: HTMLElement | null = null;
  towers: ITowerParams[] | null = [];
  selectedTowerIndex: number | null = null;
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
    if (!this.previewRoot) {
      return;
    }

    this.selectCircle = this.previewRoot!.querySelector("div");

    // add tower preview images
    this.towers.forEach((tower, index) => {
      const towerImg = document.createElement("img");
      towerImg.classList.add(style.towerPreview);
      towerImg.setAttribute("src", tower.preview);
      towerImg.setAttribute("alt", tower.title);
      towerImg.setAttribute("title", tower.title);
      towerImg.setAttribute("data-index", index.toString());

      const imgEl = this.previewRoot!.appendChild(towerImg);
      tower.previewEl = imgEl;
    });

    this.updateAvailableTowers();
    this.previewRoot.addEventListener(
      "click",
      this.clickTowerHandler.bind(this),
    );
  }

  // select tower
  private clickTowerHandler(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== "IMG") {
      return;
    }

    const towerIndex = Number(target.dataset.index);

    // if already selected => unselect
    if (towerIndex === this.selectedTowerIndex) {
      this.selectedTowerIndex = null;
      this.selectCircle?.classList.remove(style.show);
    } else {
      this.selectedTowerIndex = towerIndex;
    }

    this.showSelectedTower();
  }

  // return selected tower data
  public getSelectedTower(): ITowerParams | null {
    if (!this.towers || this.selectedTowerIndex === null) {
      return null;
    }

    return this.towers[this.selectedTowerIndex];
  }

  public updateCoins(coins: number): void {
    this.coins = coins;
    this.updateAvailableTowers();
  }

  // if not enough coins => disable towers
  private updateAvailableTowers() {
    if (!this.towers) return;

    this.towers.forEach(tower => {
      if (this.coins < tower.price) {
        tower.previewEl!.classList.add(style.disabled);
      } else {
        tower.previewEl!.classList.remove(style.disabled);
      }
    });
  }

  private showSelectedTower() {
    if (!this.towers) {
      return;
    }

    this.towers.forEach(tower => {
      if (
        this.selectedTowerIndex !== null &&
        this.towers![this.selectedTowerIndex].title === tower.title
      ) {
        this.selectCircle?.classList.add(style.show);
        this.selectCircle!.style.left = `${tower.previewEl!.offsetLeft - 10}px`;
      }
    });
  }
}
