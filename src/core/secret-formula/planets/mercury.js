export const mercury = {
  id: 2,
  shortName: "mercury",
  legalName: "Mercury, the Winged Messenger",
  effects: {
    research: () => Math.clampMin(1, Math.floor(Research.planets.venus.level / 3))
  }
};