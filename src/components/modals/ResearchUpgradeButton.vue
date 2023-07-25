<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "ResearchUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay,
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      canBeBought: false,
      isBought: false,
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "o-research-upgrade-btn": true,
        "o-research-upgrade-btn--bought": this.isBought,
        "o-research-upgrade-btn--available": !this.isBought && this.canBeBought,
        "o-research-upgrade-btn--unavailable": !this.isBought && !this.canBeBought
      };
    }
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.canBeBought = upgrade.canBeBought;
      this.isBought = upgrade.isBought;
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="upgrade.purchase()"
  >
    <DescriptionDisplay :config="config" />
    <EffectDisplay
      br
      :config="config"
    />
    <CostDisplay
      v-if="!isBought"
      br
      :config="config"
      name="Research Point"
    />
  </button>
</template>

<style scoped>
.o-research-upgrade-btn {
  width: 19rem;
  height: 9rem;
  font-family: Typewriter, serif;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
  background: var(--color-background);
  border: 0.1rem solid;
  border-color: var(--color-earth);
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}

.o-research-upgrade-btn:hover {
  color: var(--color-text-inverted);
}

.o-research-upgrade-btn--available:hover {
  background-color: var(--color-earth);
  cursor: pointer;

}

.o-research-upgrade-btn--unavailable {
  color: var(--color-text);
  background-color: dimgrey;
  cursor: default;
}

.o-research-upgrade-btn--unavailable:hover {
  color: var(--color-text);
  background-color: var(--color-bad);
  cursor: default;
}

.o-research-upgrade-btn--bought {
  color: black;
  background-color: var(--color-earth);
  cursor: default;
}

.o-research-upgrade-btn--bought:hover {
  color: black;
}
</style>