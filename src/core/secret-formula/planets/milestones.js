export const explorationMilestones = {
  autobuyerRaPets: {
    explorations: 1,
    reward: () => `Unlock Mars, the Bringer of War.
    Unlock the Ra Pets autobuyer ${Ra.pets.laitela.isUnlocked ? "(no autobuyer for Lai'tela)" : ""}`
  },
  venus: {
    explorations: 2,
    reward: "Unlock Venus, the Bringer of Peace",
  },
  mercury: {
    explorations: 3,
    reward: "Unlock Mercury, the Winged Messenger",
  },
  jupiter: {
    explorations: 4,
    reward: "Unlock Jupiter, the Bringer of Jollity",
  },
  saturn: {
    explorations: 5,
    reward: "Unlock Saturn, the Bringer of Old Age",
  },
  uranus: {
    explorations: 6,
    reward: "Unlock Uranus, the Magician"
  },
  autobuyerRaUpgrades: {
    explorations: 7,
    reward: () => `Unlock Neptune, the Mystic.
    Unlock the Ra Upgrades autobuyer ${Ra.pets.laitela.isUnlocked ? "(no autobuyer for Lai'tela)" : ""}`
  },
  planetPointGainBoost: {
    explorations: 10,
    reward: () => {
      if (player.explorations < 10) return `Boost Planet Point gain based on total Explorations.\n
      Currently ${formatX(1, 2, 2)}`;
      return `Boost Planet Point gain based on total Explorations.\n
    Currently ${formatX(Math.clampMin(Math.log(player.explorations - 7), 1), 2, 2)}`;
    }
  },
  earthlol2: {
    explorations: 12,
    invisible: true,
    reward: () => `Boo`
  }
};