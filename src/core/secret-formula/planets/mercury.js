export const mercury = {
  id: 2,
  shortName: "mercury",
  legalName: "Mercury, the Winged Messenger",
  adjective: "Mercurian",
  effects: {
    research: () => Math.clampMin(1,
      Math.pow(
        Math.log10(Math.sqrt(getGameSpeedupFactor())),
        Math.clampMin(1, Research.planets.mercury.level / 2 + 1)
      )
    )
  }
};