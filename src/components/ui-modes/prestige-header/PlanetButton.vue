<script>
export default {
  name: "PlanetButton",
  data() {
    return {
      gainedPP: new Decimal(0),
      canExplore: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-planet-button": true,
        "o-planet-button--unavailable": !this.canExplore
      };
    },
    text() {
      if (this.canExplore) return `Explore the Planets for ${quantifyInt("Planet Point", this.gainedPP)}`;
      return `Reach 100 Ra levels to Explore the Planets.`;
    }
  },
  methods: {
    update() {
      this.gainedPP.copyFrom(gainedPlanetPoints());
      this.canExplore = Player.canExplore;
    },
    explore() {
      planetResetRequest();
    }
  }
};
</script>

<template>
  <button
    :class="buttonClassObject"
    class="o-prestige-button"
    @click="explore"
  >
    {{ text }}
  </button>
</template>

<style>
.o-planet-button--unavailable {
  opacity: 0.5;
  cursor: default;
}
</style>