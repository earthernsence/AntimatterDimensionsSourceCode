import { GameMechanicState } from "./game-mechanic";

/**
 * @abstract
 */
export class BitUpgradeState extends GameMechanicState {
  constructor(config) {
    super(config);
    if (this.id < 0 || this.id > 31) throw new Error(`Id ${this.id} out of bit range`);
  }

  /**
   * @abstract
   */
  get bits() { throw new NotImplementedError(); }
  set bits(value) { throw new NotImplementedError(); }

  get isUnlocked() {
    return Boolean(this.bits & (1 << this.id));
  }

  get canBeApplied() {
    return this.isUnlocked && this.isEffectActive;
  }

  get canBeUnlocked() {
    return !this.isUnlocked;
  }

  // eslint-disable-next-line no-empty-function
  onUnlock() { }

  unlock() {
    if (!this.canBeUnlocked) return;
    this.bits |= (1 << this.id);
    this.onUnlock();
  }
}

export class DeepBitUpgradeState extends BitUpgradeState {
  constructor(config) {
    super(config);
    if (this.deepId) {
      this.id = this.deepId;
      this.usedBits = this.deepBits;
    } else {
      this.usedBits = this.bits;
    }
  }

  /**
   * @abstract
   */
  get deepBits() { throw new NotImplementedError(); }
  set deepBits(value) { throw new NotImplementedError(); }

  get isUnlocked() {
    return Boolean(this.usedBits & (1 << this.id));
  }

  unlock() {
    if (!this.canBeUnlocked) return;
    this.usedBits |= (1 << this.id);
    this.onUnlock();
  }
}