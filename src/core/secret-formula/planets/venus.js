export const venus = {
  id: 1,
  shortName: "venus",
  legalName: "Venus, the Bringer of Peace",
  effects: {
    research: () => Math.clampMin(0, Math.floor(Research.planets.venus.level / 3))
  }
};