<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "PlanetsModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedPlanetPoints: new Decimal(),
      explorations: 0,
    };
  },
  computed: {
    unlockedPlanetString() {
      if (this.explorations > 6) return `and instead of unlocking a new Planet, 
      you will gain a small boost to Planet Points gained based on total Explorations.`;
      return `but in return, you will Unlock a new Planet: ${nextUnlockedPlanet()}.`;
    },
    message() {
      return `Exploring the Planets will reset your Ra levels, ${this.unlockedPlanetString}`;
    },
    gainedResources() {
      return `You will gain ${quantify("Planet Point", this.gainedPlanetPoints, 2, 0)} 
      and ${quantify("Exploration", 1, 2, 0)}.`;
    }
  },
  methods: {
    update() {
      this.explorations = player.explorations;
      this.gainedPlanetPoints = gainedPlanetPoints();
    },
    handleYesClick() {
      planetsReset();
    },
  },
};
</script>

<template>
  <ResetModal
    header="You are about to Explore the Planets"
    :message="message"
    :gained-resources="gainedResources"
    :confirm-fn="handleYesClick"
  />
</template>