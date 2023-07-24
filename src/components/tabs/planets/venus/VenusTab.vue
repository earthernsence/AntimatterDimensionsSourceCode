<script>
import ResearchBarContainer from "./ResearchBarContainer";
import SatellitePurchaseButton from "./SatellitePurchaseButton";

export default {
  name: "VenusTab",
  components: {
    SatellitePurchaseButton,
    ResearchBarContainer,
  },
  data() {
    return {
      satellites: 0,
      totalSatellites: 0,
      progressPerSatellite: 0,
    };
  },
  methods: {
    update() {
      this.satellites = Satellites.amount;
      this.totalSatellites = Satellites.totalAmount;
      this.progressPerSatellite = Satellites.progressPerSatellite;
    }
  }
};
</script>

<template>
  <div class="l-venus-tab">
    <span class="c-satellites-text">
      You have <span class="c-venus-tab__satellites">{{ formatInt(satellites) }}</span>
      {{ pluralize("Satellite", satellites) }}.
      (<span class="c-venus-tab__satellites">{{ formatInt(totalSatellites) }}</span> total)
    </span>
    <SatellitePurchaseButton />
    <br>
    <div class="c-venus-tab-header">
      Planetary Research is, in a lot of ways, similar to elements of both Ra and Teresa.
      <br>
      However, you have a limited number of Satellites to use, which produce progress 
      in each Research. You will be able to research all 7 Planets.
      <br>
      Total Research level divides progress per Satellite. Current progress per Satellite: 
      {{ format(progressPerSatellite, 2, 2) }} progress/sec.
      <br>
      Researching each Planet will boost the Planet in some way.
    </div>
    <br>
    <ResearchBarContainer />
  </div>
</template>

<style scoped>
.l-venus-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
}

.c-venus-tab-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
}

.c-satellites-text {
  font-size: 1.5rem;
  color: var(--color-text);
}

.c-venus-tab__satellites {
  font-size: 1.75rem;
  color: var(--color-earth);
}
</style>