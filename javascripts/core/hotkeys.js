"use strict";

// Add your hotkeys and combinations here
// GameKeyboard.bind for single press combinations
// GameKeyboard.bindRepeatable for repeatable combinations
// Hotkeys obey player.options.hotkeys option
// GameKeyboard.bindHotkey for single press hotkeys
// GameKeyboard.bindRepeatableHotkey for repeatable hotkeys
// GameKeyboard class uses Mousetrap under the hood, so for more details visit
// https://craig.is/killing/mice

GameKeyboard.bindRepeatableHotkey("m", () => maxAll());
GameKeyboard.bindRepeatableHotkey("d", () => softResetBtnClick());
GameKeyboard.bindRepeatableHotkey("g", () => requestGalaxyReset(true));
GameKeyboard.bindRepeatableHotkey("shift+g", () => requestGalaxyReset(false));
GameKeyboard.bindRepeatableHotkey("s", () => sacrificeBtnClick());
GameKeyboard.bindRepeatableHotkey("r", () => replicantiGalaxy());
GameKeyboard.bindRepeatableHotkey("t", () => buyMaxTickSpeed());
GameKeyboard.bindRepeatableHotkey("shift+t", () => buyTickSpeed());
GameKeyboard.bindRepeatableHotkey("c", () => bigCrunchResetRequest());
GameKeyboard.bindRepeatableHotkey("e", () => eternityResetRequest());

// We need to know whether the player is holding R or not for the
// replicanti galaxy
GameKeyboard.bind("r", () => setHoldingR(true), "keydown");
GameKeyboard.bind("r", () => setHoldingR(false), "keyup");


const AUTOBUYER_NAMES = ["1st Dimension", "2nd Dimension", "3rd Dimension", "4th Dimension", "5th Dimension", "6th Dimension", "7th Dimension", "8th Dimension", "Tickspeed", 
"Dimension Boost", "Galaxy", "Big Crunch", "Sacrifice", "Eternity"];

// Toggle autobuyers
function toggleAutobuyer(id) {
  if (!player.options.autobuyersOn) {
    return;
  }
  
  const buyer = Autobuyers.all[id];
  if (buyer.isUnlocked) {
    buyer.toggle();
    GameUI.notify.info(AUTOBUYER_NAMES[id] + " autobuyer " + ((buyer.isActive) ? "enabled" : "disabled"));
  }
}

function toggleBuySingles(id) {
  if (!player.options.autobuyersOn) {
    return;
  }
  
  const buyer = Autobuyers.all[id];
  if (buyer.isUnlocked && buyer.toggleMode !== null) {
    buyer.toggleMode();
    GameUI.notify.info(AUTOBUYER_NAMES[id] + " autobuyer set to buy " + ((buyer.mode == 1) ? "singles" : "bulk"));
  }
}


GameKeyboard.bindHotkey("alt+t", () => toggleAutobuyer(8));
//GameKeyboard.bindHotkey("shift+alt+t", () => toggleBuySingles(8)); Disabled for now because you need to unlock buy max
GameKeyboard.bindHotkey("alt+d", () => toggleAutobuyer(9));
GameKeyboard.bindHotkey("alt+g", () => toggleAutobuyer(10));
GameKeyboard.bindHotkey("alt+c", () => toggleAutobuyer(11));
GameKeyboard.bindHotkey("alt+s", () => toggleAutobuyer(12));
GameKeyboard.bindHotkey("alt+e", () => toggleAutobuyer(13));
GameKeyboard.bindHotkey("alt+r", () => {
  const buyer = Replicanti.galaxies.autobuyer;
  if (buyer.isUnlocked) {
    buyer.toggle();
    GameUI.notify.info("Replicanti Galaxy autobuyer " + ((buyer.isOn) ? "enabled" : "disabled"));
  }
});

(function() {
  function bindDimensionHotkeys(tier) {
    GameKeyboard.bindRepeatableHotkey(`${tier}`, () => buyManyDimension(tier));
    GameKeyboard.bindRepeatableHotkey(`shift+${tier}`, () => buyOneDimension(tier));
    GameKeyboard.bindHotkey(`alt+${tier}`, () => toggleAutobuyer(tier - 1));
    GameKeyboard.bindHotkey(`shift+alt+${tier}`, () => toggleBuySingles(tier - 1));
  }
  for (let i = 1; i < 9; i++) bindDimensionHotkeys(i);
}());

GameKeyboard.bindHotkey("a", () => Autobuyers.toggle());
GameKeyboard.bindHotkey("b", () => BlackHoles.togglePause());
GameKeyboard.bindHotkey("u", () => {
  if (player.realities >= 5) { //Automator must be unlocked

   if (AutomatorBackend.isRunning) {
      AutomatorBackend.pause();
      GameUI.notify.info("Pausing script \"" + AutomatorBackend.scriptName + "\" at line " + AutomatorBackend.currentLineNumber);
  }
    else if (AutomatorBackend.isOn) {
      AutomatorBackend.mode = AUTOMATOR_MODE.RUN;
      GameUI.notify.info("Resuming script \"" + AutomatorBackend.scriptName + "\" from line " + AutomatorBackend.currentLineNumber);
    }
  }
});
GameKeyboard.bindHotkey("shift+u", () => {
  if (player.realities >= 5) {
    GameUI.notify.info((AutomatorBackend.isOn ? "Res" : "S") + "tarting script \"" + AutomatorBackend.scriptName + "\"");

    AutomatorBackend.restart();
    AutomatorBackend.start();
  }
});

GameKeyboard.bindHotkey("esc", () => {
  if (Modal.isOpen) {
    Modal.hide();
  } else {
    Tab.options.show(true);
  }
});

GameKeyboard.bindHotkey("?", () => {
  if (Modal.shortcuts.isOpen) {
    Modal.hide();
    return;
  }
  if (Modal.isOpen) return;
  Modal.shortcuts.show();
});

GameKeyboard.bindHotkey("h", () => {
  if (Modal.h2p.isOpen) {
    Modal.hide();
    return;
  }
  if (Modal.isOpen) return;
  Modal.h2p.show();
  ui.view.h2pActive = true;
});

GameKeyboard.bindHotkey(["ctrl+s", "meta+s"], () => {
  GameStorage.save(false, true);
  return false;
});
GameKeyboard.bindHotkey(["ctrl+e", "meta+e"], () => {
  GameStorage.export();
  return false;
});

GameKeyboard.bind("shift", () => setShiftKey(true), "keydown");
GameKeyboard.bind("shift", () => setShiftKey(false), "keyup");

GameKeyboard.bind("9", () => SecretAchievement(41).unlock());

GameKeyboard.bind(
  ["ctrl+shift+c", "ctrl+shift+i", "ctrl+shift+j", "f12"],
  () => SecretAchievement(23).unlock()
);

GameKeyboard.bind("up up down down left right left right b a", () => {
  SecretAchievement(17).unlock();
  Currency.antimatter.bumpTo(30);
});

GameKeyboard.bindRepeatable("f", () => {
  GameUI.notify.info("Paying respects");
  SecretAchievement(13).unlock();
});
