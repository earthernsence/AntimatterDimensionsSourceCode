<script>
import ExplorationMilestonesButton from "@/components/tabs/planets/milestones/ExplorationMilestonesButton";

export default {
  name: "ExplorationMilestonesTab",
  components: {
    ExplorationMilestonesButton
  },
  data() {
    return {
      explorations: 0
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.exploration.explorationMilestones)
        .sort((a, b) => a.explorations - b.explorations)
        .map(config => new ExplorationMilestoneState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length / 3);
    }
  },
  methods: {
    update() {
      this.explorations = Currency.explorations.value;
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) * 3 + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-exploration-milestone-grid">
    <div>You have {{ quantify("Exploration", explorations, 3) }}.</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-exploration-milestone-grid__row"
    >
      <ExplorationMilestonesButton
        v-for="column in 3"
        :key="row * 3 + column"
        :get-milestone="getMilestone(row, column)"
        class="l-exploration-milestone-grid__cell"
      />
    </div>
  </div>
</template>

<style>
.l-exploration-milestone-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-exploration-milestone-grid__row {
  display: flex;
  flex-direction: row;
}

.l-exploration-milestone-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>