<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import ResearchUpgradeButton from "./ResearchUpgradeButton";

import ResearchRepeatableMultiplierButton from "./ResearchRepeatableMultiplierButton";

export default {
  name: "ResearchModal",
  components: { ModalWrapper, ResearchUpgradeButton, ResearchRepeatableMultiplierButton },
  props: {
    planet: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      researchPoints: new Decimal(0),
    };
  },
  computed: {
    research() {
      return Planets[this.planet].researchUpgrades;
    },
    grid() {
      return [
        Array.range(0, 3).map(upgrade => this.research[upgrade])
      ];
    }
  },
  methods: {
    update() {
      this.researchPoints.copyFrom(Currency.researchPoints.value);
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      Research {{ planet.capitalize() }}
    </template>
    <div class="c-modal-message__text-fit">
      You have {{ quantifyInt("Research Point", researchPoints) }}
    </div>
    <div class="l-research-upgrade-modal__grid">
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-research-upgrade-grid__row"
      >
        <ResearchUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          class="l-research-upgrade-grid__cell"
        />
      </div>
    </div>
    <div class="l-research-upgrades-bottom-row">
      <ResearchRepeatableMultiplierButton
        :planet="planet"
        class="l-research-upgrades-tab__mult-btn"
      />
    </div>
  </ModalWrapper>
</template>

<style scoped>
.c-modal-message__text-fit {
  width: auto;
}

.l-research-upgrades-bottom-row .l-research-upgrades-tab__mult-btn {
  align-items: center;
  margin: 0.5rem 1.1rem;
}

.l-research-upgrade-modal__grid {
  margin-top: 1rem;
}

.l-research-upgrade-grid {
  display: flex;
  flex-direction: column;
}

.l-research-upgrade-grid__row {
  display: flex;
  flex-direction: row;
}

.l-research-upgrade-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>