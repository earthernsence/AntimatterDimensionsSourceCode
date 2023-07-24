import { GameMechanicState } from "./game-mechanics";

export class Satellites {
  static get amount() {
    return player.planets.venus.satellites;
  }

  static set amount(value) {
    player.planets.venus.satellites = value;
  }

  static get purchasedSatellites() {
    return player.planets.venus.purchasedSatellites;
  }

  static set purchasedSatellites(value) { player.planets.venus.purchasedSatellites = value; }

  static get totalAmount() {
    return Satellites.purchasedSatellites + Satellites.freeSatellites;
  }

  static set totalAmount(value) {
    player.planets.venus.totalSatellites = value;
  }

  static get cost() {
    return Decimal.pow(2, Satellites.purchasedSatellites);
  }

  static get canAfford() {
    return Currency.planetPoints.value.gte(Satellites.cost);
  }

  static get assignedSatellites() {
    return player.planets.venus.assignedSatellites;
  }

  static set assignedSatellites(value) {
    player.planets.venus.assignedSatellites = value;
  }

  static get freeSatellites() {
    return Research.planets.venus.effects.research.effectOrDefault(0);
  }

  static purchase() {
    if (!Satellites.canAfford) return;

    Currency.planetPoints.value.subtract(Satellites.cost);
    Satellites.amount++;
    Satellites.purchasedSatellites++;
  }

  static get progressPerSatellite() {
    let base = 10;
    base /= (1 + Research.totalResearchLevel * 0.1);
    return base;
  }
}

class PlanetResearch extends GameMechanicState {
  get data() {
    return player.planets.venus.research[this.config.shortName];
  }

  get name() {
    return this.config.shortName;
  }

  get level() {
    return this.data.level;
  }

  set level(value) { this.data.level = value; }

  get currentProgress() {
    return this.progressPoints / this.goal;
  }

  get isUnlocked() {
    return this.data.unlocked;
  }

  set isUnlocked(value) { this.data.unlocked = value; }

  get satellites() {
    return this.data.satellites;
  }

  set satellites(value) {
    this.data.satellites = value;
  }

  get progressPoints() {
    return this.data.progressPoints;
  }

  set progressPoints(value) { this.data.progressPoints = value; }

  get goal() {
    return Math.pow(10, this.level + 2);
  }

  assignSatellite(add) {
    if (add) {
      if (Satellites.assignedSatellites === Satellites.totalAmount) {
        GameUI.notify.error("You can't assign more Satellites than you have, dummy!");
        return;
      }
      this.data.satellites++;
      Satellites.amount--;
      Satellites.assignedSatellites++;
    } else {
      if (this.satellites === 0) {
        GameUI.notify.error("You can't assign negative Satellites, dummy!");
        return;
      }
      this.data.satellites--;
      Satellites.amount++;
      Satellites.assignedSatellites--;
    }
  }

  levelUp() {
    if (this.progressPoints < this.goal) return;

    this.progressPoints -= this.goal;
    this.level++;

    // Venus research gives free Satellites, and we have to give them to ourselves somehow
    if (Satellites.totalAmount !== (Satellites.amount + Satellites.assignedSatellites)) {
      Satellites.amount = Satellites.totalAmount - Satellites.assignedSatellites;
    }
  }

  tick(realDiff) {
    if (this.satellites === 0) return;
    const seconds = realDiff / 1000;
    this.progressPoints += (this.satellites * Satellites.progressPerSatellite) * seconds;
    this.levelUp();
  }
}

const planets = mapGameDataToObject(
  GameDatabase.exploration.planets,
  config => new PlanetResearch(config)
);

export const Research = {
  planets,
  get totalResearchLevel() {
    return Research.planets.all.map(planet => (planet.isUnlocked ? planet.level : 0)).sum();
  },
  get unlocked() {
    return Satellites.totalAmount >= 1;
  },
  researchTick(realDiff) {
    if (!this.unlocked) return;

    for (const planet of Research.planets.all) planet.tick(realDiff);
  }
};