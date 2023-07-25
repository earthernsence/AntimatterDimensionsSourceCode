export const research = {
  keepPet1: {
    id: "startingPetLevel",
    cost: 1,
    description: "All Ra-Celestials start unlocked and at level 5 upon Exploration reset",
    planet: "mars",
    effect: () => 5,
  },
  satelliteImprovement: {
    id: "satelliteImprovement",
    cost: 10,
    description: `All Satellites produce faster based on Watts`,
    planet: "mars",
    effect: () => Math.clampMin(1, Currency.watts.value.log10()),
    formatEffect: value => `${formatX(value, 2, 1)}`
  },
  raLevelCapIncrease: {
    id: "raLevels",
    cost: 100,
    description: "Increase the max Ra-Celestial level by 5.",
    planet: "mars",
    effect: () => 5
  },
  satelliteImprovement2: {
    id: "satelliteImprovement2",
    cost: 1,
    description: `All Satellites produce faster based on Explorations`,
    planet: "venus",
    effect: () => Math.pow(Currency.explorations.value / 2, 1.5) + 1,
    formatEffect: value => `${formatX(value, 2, 1)}`
  },
  remembranceImprovement: {
    id: "remembranceImprovement",
    cost: 5,
    description: `Remove the downside from Remembrance and it affects all Ra-Celestials`,
    planet: "venus",
  },
  planetPointBoost: {
    id: "planetPointBoost",
    cost: 25,
    description: `Gain more Planet Points based on Research Levels`,
    planet: "venus",
    effect: () => Math.pow(Research.totalResearchLevel / 3, 1.25) + 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  satelliteImprovement3: {
    id: "satelliteImprovement3",
    cost: 3,
    planet: "mercury",
    description: `Reduce the contribution to the Satellite Research generation divisor to 0.05 (down from 0.1)`,
    // In the satellite code we multiply total level by a value -- initially 0.1, now 0.05.
    effect: () => 0.05,
  },
  memoryGeneration: {
    id: "memoryGeneration",
    cost: 10,
    planet: "mercury",
    description: `Increase Ra memory generation based on total Research levels`,
    effect: () => Math.pow(Research.totalResearchLevel / 5, 0.5) + 1
  },
  moreResearchPoints: {
    id: "moreResearchPoints",
    cost: 50,
    planet: "mercury",
    description: () => `Gain ${formatX(2)} more Research Points (applies retroactively)`,
    effect: () => 2,
    onPurchased: () => {
      Currency.researchPoints.add(Research.totalResearchLevel);
    }
  }
};