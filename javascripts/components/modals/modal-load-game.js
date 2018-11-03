Vue.component('modal-load-game', {
  template:
    `<modal-options @close="emitClose" :closeButton="true">
        <modal-load-record :saveId="0" />
        <modal-load-record :saveId="1" />
        <modal-load-record :saveId="2" />
    </modal-options>`
});

Vue.component('modal-load-record', {
  props: {
    saveId: Number
  },
  data: function() {
    const save = saves[this.saveId];
    return {
      antimatter: new Decimal(save ? save.money : 10)
    };
  },
  computed: {
    isSelected: function() {
      return currentSave === this.saveId;
    }
  },
  methods: {
    loadSave: function() {
      change_save(this.saveId);
    },
    formatMoney: function(money) {
      formatPostBreak = true;
      let formatted = this.shortenMoney(money);
      formatPostBreak = false;
      return formatted;
    },
    update() {
      if (this.isSelected) {
        this.antimatter.copyFrom(player.money);
      }
    }
  },
  template:
    `<div>
      <strong>Save #{{ saveId + 1 }}:<span v-if="isSelected"> (selected)</span></strong>
      <span style="width: 320px;">Antimatter: {{ formatMoney(antimatter) }}</span>
      <primary-button @click="loadSave">Load</primary-button>
    </div>`
});