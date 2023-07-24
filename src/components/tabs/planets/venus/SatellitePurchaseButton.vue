<script>
export default {
  name: "SatellitePurchaseButton",
  data() {
    return {
      planetPoints: new Decimal(0),
      cost: new Decimal(0),
      canAfford: false,
    };
  },
  computed: {
    classObject() {
      return {
        "l-satellite-purchase-button": true,
        "c-satellite-purchase-button": true,
        "c-satellite-purchase-button--unavailable": !this.canAfford,
        "c-satellite-purchase-button--available": this.canAfford
      };
    }
  },
  methods: {
    update() {
      this.planetPoints.copyFrom(Currency.planetPoints.value);
      this.cost.copyFrom(Satellites.cost);
      this.canAfford = Satellites.canAfford;
    },
    purchase() {
      Satellites.purchase();
    }
  }
};
</script>

<template>
  <div>
    <button
      :class="classObject"
      @click="purchase"
    >
      Purchase a Satellite to do research on a Planet of your choice.
      <br>
      Cost: {{ quantifyInt("Planet Point", cost) }}
      <span class="c-symbol-overlay">
        <i class="fa-solid fa-satellite" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.l-satellite-purchase-button {
  display: flex;
  flex-direction: row;
  width: 35rem;
  justify-content: space-between;
  align-items: center;
}

.c-satellite-purchase-button {
  display: flex;
  height: 100%;
  position: relative;
  font-family: Typewriter;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-earth);
  background: var(--color-background);
  border-color: var(--color-earth);
  border-style: solid;
  border-width: var(--var-border-width, 0.2rem);
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}

.c-satellite-purchase-button--unavailable {
  color: var(--color-text);
  background-color: dimgrey
}

.c-satellite-purchase-button--available {
  color: var(--color-earth);
  background: var(--color-background);
  cursor: pointer;
}

.c-satellite-purchase-button--available:hover {
  color: var(--color-text);
  background: var(--color-earth);
}

.c-satellite-purchase-button--unavailable:hover {
  background: var(--color-bad);
}

.c-symbol-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 35%;
  z-index: 1;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  opacity: 0.33;
  color: var(--color-text);
  text-shadow: 0 0 3rem;
  pointer-events: none;
  user-select: none;
}
</style>