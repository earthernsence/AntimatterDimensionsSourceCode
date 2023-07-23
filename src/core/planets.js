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
}

export function planetsReset() {
  Currency.planetPoints.add(gainedPlanetPoints());
  unlockNextPlanet();
  Currency.explorations.add(1);
  Ra.reset();
  console.log(`New PP: ${Currency.planetPoints.value}\nNew explorations: ${Currency.explorations.value}`);
}

class BasePlanet {
  constructor(config) {
    this._config = config;
    this.shortName = config.shortName;
    this.legalName = config.legalName;
  }

  get isUnlocked() {
    return player.planets[this.shortName].isUnlocked;
  }

  set isUnlocked(value) {
    player.planets[this.shortName].isUnlocked = value;
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
  GameDatabase.planets.explorationMilestones,
  config => new ExplorationMilestoneState(config)
);

export const Planets = {
  mars: new BasePlanet(GameDatabase.planets.mars),
  venus: new BasePlanet(GameDatabase.planets.venus),
  mercury: new class MercuryPlanet extends BasePlanet {}(GameDatabase.planets.mercury)
};