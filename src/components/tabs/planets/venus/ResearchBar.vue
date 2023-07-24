<script>
// So what if there were 7 teresa bars
import PlusMinusButton from "@/components/PlusMinusButton";

export default {
  name: "ResearchBar",
  components: { PlusMinusButton },
  props: {
    planet: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // This is a decimal up to 1
      currentProgress: 0,
      // Our currentProgress transformed into a CSS-usable value
      percentage: "",
      level: 0,
      satellites: 0,
    };
  },
  computed: {
    research() {
      return Research.planets[this.planet];
    }
  },
  methods: {
    update() {
      this.currentProgress = this.research.currentProgress;
      this.percentage = `${(this.currentProgress * 100).toFixed(2)}%`;
      this.level = this.research.level;
      this.satellites = this.research.satellites;
    },
    handleClick(add) {
      this.research.assignSatellite(add);
    },
    getEffect() {
      switch (this.planet) {
        case "mars":
          return `${formatX(this.research.effects.research.effectValue)} to Solar Dimensions`;
        case "venus":
          return `Gain a free Satellite every 3 levels. 
          Currently ${quantifyInt("free Satellite", this.research.effects.research.effectValue)}`;
        case "mercury":
          return "W";
        default:
          throw "Unknown planet in ResearchBar";
      }
    }
  }
};
</script>

<template>
  <div class="c-research-container">
    <div class="c-research-bar">
      <div
        class="c-research-bar-inner"
        :style="{ height: percentage }"
      >
        <div class="c-research-bar-label">
          {{ formatPercents(currentProgress, 2) }} to {{ level + 1 }}
        </div>
      </div>
    </div>
    <div class="c-button-container">
      <PlusMinusButton
        type="plus"
        @click="handleClick(true)"
      />
      <PlusMinusButton
        type="minus"
        @click="handleClick(false)"
      />
    </div>
    <div class="c-planet-label">
      {{ planet.capitalize() }}
    </div>
    <div class="c-satellite-amount-label">
      {{ quantifyInt("Satellite", satellites) }}
    </div>
    <div class="c-satellite-amount-label">
      Level {{ level }}
      <span :ach-tooltip="getEffect()"><i class="fas fa-question-circle" /></span>
    </div>
  </div>
</template>

<style scoped>
.c-research-container {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 60rem;
  position: relative;
  align-items: center;
  border: 0.25rem solid white;
  border-radius: var(--var-border-radius, 0.4rem);
  margin: auto;
}

.c-button-container {
  display: flex;
  flex-direction: row;
  width: 10rem;
  height: 1.5rem;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

.c-research-bar {
  width: 13rem;
  height: 50rem;
  position: relative;
  background: #37a4ba55;
  border: 0.1rem solid var(--color-earth);
  border-radius: var(--var-border-radius, 0.4rem);
  margin: auto
}

.c-research-bar-inner {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--color-earth);
}

.c-research-bar-label {
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: bold;
  color: black;
}

.c-planet-label {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-earth);
}

.c-current-satellites-label {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}
</style>