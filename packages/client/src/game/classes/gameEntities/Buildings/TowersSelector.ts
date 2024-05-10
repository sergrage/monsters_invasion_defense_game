import { ITowerParams } from "@/game/interfaces";

export default class TowersSelector {
  towers: ITowerParams[] | null = [];
  selectedTower: number | null = null;

  constructor(towersData: ITowerParams[]) {
    // get towers form database
    this.towers = towersData || null;
    this.init();
  }

  private init() {
    if (!this.towers) return;

    // select preview section
    const previewRoot = document.getElementById("towerSelector");

    // add tower preview images
    this.towers.forEach((tower, index) => {
      const towerImg = document.createElement("img");
      towerImg.setAttribute("src", tower.preview);
      towerImg.setAttribute("alt", tower.title);
      towerImg.setAttribute("title", tower.title);
      towerImg.setAttribute("data-index", index.toString());

      previewRoot?.appendChild(towerImg);
    });

    previewRoot?.addEventListener("click", this.clickTowerHandler.bind(this));
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
}
