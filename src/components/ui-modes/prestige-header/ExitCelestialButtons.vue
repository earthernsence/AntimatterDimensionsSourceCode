<script>
export default {
  name: "ExitCelestialButtons",
  data() {
    return {
      hasRealityStudy: false,
      canReality: false,
      currentCelestial: ""
    };
  },
  computed: {
    classObject() {
      return {
        "c-exit-celestial-button--unlocked": this.canReality,
        "c-exit-celestial--locked": !this.canReality,
      };
    }
  },
  methods: {
    update() {
      this.hasRealityStudy = TimeStudy.reality.isBought;
      this.canReality = isRealityAvailable();
      this.currentCelestial = Object.values(Celestials).filter(x => x.isRunning)[0].displayName;
    },
    handleClick(which) {
      if (which === "light") console.log("clicked light");
      else console.log("Clicked dark");
    }
  }
};
</script>

<template>
  <div class="l-celestial-buttons-container">
    <button
      class="c-exit-celestial-button l-exit-celestial-button l-exit-celestial-button__light"
      :class="classObject"
      @click="handleClick(`light`)"
    >
      <div class="l-exit-celestial-button__contents">
        <template v-if="canReality">
          <div class="c-reality-button__header">
            Make a new Reality
          </div>
          <div>Enter the Light</div>
        </template>
        <template v-else>
          Purchase the Reality Time Study in the Eternity tab to unlock a new Reality
        </template>
      </div>
    </button>
    <button
      class="c-exit-celestial-button l-exit-celestial-button l-exit-celestial-button__dark"
      :class="classObject"
      @click="handleClick(`dark`)"
    >
      <div class="l-exit-celestial-button__contents">
        <template v-if="canReality">
          <div class="c-reality-button__header">
            Make a new Reality
          </div>
          <div>Enter the Dark</div>
        </template>
        <template v-else>
          Purchase the Reality Time Study in the Eternity tab to unlock a new Reality
        </template>
      </div>
    </button>
  </div>
</template>

<style scoped>
.l-celestial-buttons-container {
  display: flex;
  flex-direction: row;
  width: 35rem;
  justify-content: space-between;
  align-items: center;
}

.c-exit-celestial-button {
  height: 100%;
  font-family: Typewriter;
  font-size: 1.2rem;
  font-weight: bold;
  background: var(--color-background);
  border-color: var(--color-earth);
  border-style: solid;
  border-width: var(--var-border-width, 0.2rem);
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}

.l-exit-celestial-button {
  width: 15rem;
  height: 6rem;
  color: var(--color-earth);
  cursor: pointer;
}

.l-exit-celestial-button__light {
  color: var(--color-background);
  background-color: white;
}

.l-exit-celestial-button__dark {
  color: white;
  background-color: var(--color-background);
}

.c-exit-celestial-button--unlocked:hover,
.c-exit-celestial-button--unlocked.force-hover {
  color: black;
  background: var(--color-earth);
}

.c-exit-celestial-button--locked:hover {
  color: #1d1d1d;
  background-color: var(--color-bad);
}

.l-exit-celestial-button__contents {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>