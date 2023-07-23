export const explorationMilestones = {
  autobuyerRaPets: {
    explorations: 1,
    reward: () => `Unlock the Ra Pets autobuyer ${Ra.pets.laitela.isUnlocked ? "(no autobuyer for Lai'tela)" : ""}
    and a new Planet for each exploration up to 7. Unlock Mars, the Bringer of War.`
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
    reward: "Unlock Mercury, the Bringer of Jollity",
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
  earthlol: {
    explorations: 10,
    invisible: true,
    reward: () => `Boo`
  },
  earthlol2: {
    explorations: 12,
    invisible: true,
    reward: () => `Boo`
  }
};