<script>
export default {
  name: "ExplorationMilestonesButton",
  props: {
    getMilestone: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isReached: false,
    };
  },
  computed: {
    milestone() {
      return this.getMilestone();
    },
    config() {
      return this.milestone.config;
    },
    explorations() {
      return this.config.explorations;
    },
    reward() {
      return typeof this.config.reward === "function" ? this.config.reward() : this.config.reward;
    },
    rewardClassObject() {
      return {
        "o-exploration-milestone__reward": true,
        "o-exploration-milestone__reward--locked": !this.isReached,
        "o-exploration-milestone__reward--reached": this.isReached,
        "o-exploration-milestone__reward--small-font": this.reward.length > 80
      };
    },
  },
  methods: {
    update() {
      this.isReached = this.milestone.isReached;
    }
  }
};
</script>

<template>
  <div
    v-if="!config.invisible"
    class="l-exploration-milestone"
  >
    <span class="o-exploration-milestone__goal">
      {{ quantifyInt("Exploration", explorations) }}
    </span>
    <button :class="rewardClassObject">
      <span>
        {{ reward }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.l-exploration-milestone {
  display: flex;
  flex-direction: column;
}

.o-exploration-milestone__goal {
  text-align: left;
  font-size: 2rem;
}

.o-exploration-milestone__reward {
  width: 25rem;
  height: 8rem;
  font-family: Typewriter, serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  border: 0.1rem solid var(--color-earth);
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}

.o-exploration-milestone__reward--locked {
  background-color: dimgrey;
}

.o-exploration-milestone__reward--reached {
  background-color: var(--color-earth);
  border-color: black;
}

.o-exploration-milestone__reward--small-font {
  font-size: 1.1rem;
}
</style>