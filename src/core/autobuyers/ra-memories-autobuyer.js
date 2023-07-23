import { AutobuyerState } from "./autobuyer";

export class RaPetAutobuyerState extends AutobuyerState {
  get name() { return this.data.name; }
  get data() {
    return player.auto.raMemories.all[this.id - 1];
  }

  get pet() {
    if (this.name === "Nameless") return Ra.pets.enslaved;
    return Ra.pets[this.name.toLowerCase()];
  }

  get isUnlocked() {
    return player.explorations > 0;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    while (this.pet.memories > this.pet.requiredMemories) this.pet.levelUp();
  }

  static get entryCount() { return 4; }
  static get autobuyerGroupName() { return "Ra Pets"; }
  static get isActive() { return player.auto.raMemories.isActive; }
  static set isActive(value) { player.auto.raMemories.isActive = value; }
}

export class RaPetUpgradeAutobuyerState extends AutobuyerState {
  get name() { return this.data.name; }
  get data() { return player.auto.raPetUpgrades.all[this.id - 1]; }

  get pet() {
    if (this.name === "Nameless") return Ra.pets.enslaved;
    return Ra.pets[this.name.toLowerCase()];
  }

  get isUnlocked() {
    return player.explorations > 6;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    // We want to purchase the cheaper option out of the two upgrades first
    const memoryUpgradeCost = this.pet.memoryUpgradeCost;
    const chunkUpgradeCost = this.pet.chunkUpgradeCost;

    if (this.pet.canBuyChunkUpgrade || this.pet.canBuyMemoryUpgrade) {
      if (memoryUpgradeCost < chunkUpgradeCost) this.pet.purchaseMemoryUpgrade();
      else this.pet.purchaseChunkUpgrade();
    }
  }

  static get entryCount() { return 4; }
  static get autobuyerGroupName() { return "Ra Pets Upgrades"; }
  static get isActive() { return player.auto.raPetUpgrades.isActive; }
  static set isActive(value) { player.auto.raPetUpgrades.isActive = value; }
}