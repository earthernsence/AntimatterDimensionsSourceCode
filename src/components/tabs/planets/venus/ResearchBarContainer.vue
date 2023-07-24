<script>
import ResearchBar from "./ResearchBar";

export default {
  name: "ResearchBarContainer",
  components: { ResearchBar },
  data() {
    return {
      unlockedPlanets: [],
      visible: false,
    };
  },
  methods: {
    update() {
      this.unlockedPlanets = Research.planets.all.filter(planet => planet.isUnlocked);
      this.visible = Satellites.totalAmount >= 1;
    }
  }
};
</script>

<template>
  <div
    v-if="visible"
    class="c-all-research"
  >
    <ResearchBar
      v-for="planet of unlockedPlanets"
      :key="planet.name"
      :planet="planet.name"
    />
  </div>
</template>

<style scoped>
.c-all-research {
  display: flex;
  width: 100rem;
  height: 75rem;
  position: relative;
  border: 0.25rem solid white;
  border-radius: var(--var-border-radius, 0.4rem);
  margin: auto;
}
</style>