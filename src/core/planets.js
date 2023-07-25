import { GameMechanicState, SetPurchasableMechanicState } from "./game-mechanics";

export function planetResetRequest() {
  if (Player.canExplore) askPlanetConfirmation();
}

function askPlanetConfirmation() {
  if (player.options.confirmations.planets) {
    Modal.planets.show();
  } else {
    planetsReset();
  }
}

function unlockNextPlanet() {
  if (player.explorations > 6) return;
  const planets = ["mars", "venus", "mercury", "jupiter", "saturn", "uranus", "neptune"];
  const resets = player.explorations;
  Planets[planets[resets]].isUnlocked = true;
  Research.planets[planets[resets]].isUnlocked = true;
}

export function planetsReset() {
  EventHub.dispatch(GAME_EVENT.EXPLORATION_RESET_BEFORE);
  Currency.planetPoints.add(gainedPlanetPoints());
  unlockNextPlanet();
  Currency.explorations.add(1);
  Ra.reset();
  console.log(`New PP: ${Currency.planetPoints.value}\nNew explorations: ${Currency.explorations.value}`);
  EventHub.dispatch(GAME_EVENT.EXPLORATION_RESET_AFTER);
}

class Planet extends GameMechanicState {
  get data() {
    return player.planets[this.config.shortName];
  }

  get name() {
    return this.config.shortName;
  }

  get adjective() {
    return this.config.adjective;
  }

  get isUnlocked() {
    return this.data.isUnlocked;
  }

  set isUnlocked(value) {
    this.data.isUnlocked = value;
  }

  get researchUpgrades() {
    return Planets.researchUpgrades.filter(planet => planet.planet === this.name);
  }
}

class ResearchUpgradeState extends SetPurchasableMechanicState {
  constructor(config) {
    super(config);
    this.planet = config.planet;
  }

  get currency() {
    return Currency.researchPoints;
  }

  get set() {
    return player.planets.venus.research[this.planet].upgrades;
  }

  get isAvailableForPurchase() {
    return this.config.checkRequirement?.() ?? true;
  }

  get isEffectActive() {
    return this.isBought;
  }

  purchase() {
    return super.purchase();
  }
}

export class ExplorationMilestoneState {
  constructor(config) {
    this.config = config;
  }

  get isReached() {
    return Currency.explorations.value >= this.config.explorations;
  }
}

export const ExplorationMilestone = mapGameDataToObject(
  GameDatabase.exploration.explorationMilestones,
  config => new ExplorationMilestoneState(config)
);

const planets = mapGameDataToObject(
  GameDatabase.exploration.planets,
  config => new Planet(config)
);

const researchUpgrades = mapGameDataToObject(
  GameDatabase.exploration.research,
  config => new ResearchUpgradeState(config)
);

export const Planets = {
  ...planets,
  researchUpgrades: researchUpgrades.all.compact()
};