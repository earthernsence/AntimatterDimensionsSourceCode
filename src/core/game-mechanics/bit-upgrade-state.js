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
    if (this.deepId === undefined) {
      this.typeOfBits = "bits";
    } else {
      this.typeOfBits = "deepBits";
    }
  }

  /**
   * @abstract
   */
  get deepBits() { throw new NotImplementedError(); }
  set deepBits(value) { throw new NotImplementedError(); }

  get deepId() {
    return this.config.deepId;
  }

  get realId() {
    if (this.config.deepId) return this.config.deepId;
    return this.id;
  }

  get isUnlocked() {
    return Boolean(this[this.typeOfBits] & (1 << this.realId));
  }

  unlock() {
    if (!this.canBeUnlocked) return;
    this[this.typeOfBits] |= (1 << this.realId);
    this.onUnlock();
  }
}