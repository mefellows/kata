const { sumArray } = require("./array");
const MAX_PINS_IN_FRAME = 10;
const BOWLS_PER_FRAME = 2;
const BOWLS_PER_SPARE_FRAME = 1;

class Frame extends Array {
  constructor(data = [], frameSize = BOWLS_PER_FRAME) {
    super();
    this.frameSize = frameSize;

    if (!Array.isArray(data)) {
      throw Error(
        "Invalid arguments to Frame constructor, expected an array or nothing"
      );
    }

    data.forEach((v, i) => (this[i] = v));
  }

  roll(pins) {
    if (!this.isComplete()) {
      this.push(pins);
    } else {
      throw Error("Frame is complete, there are no rolls remaining");
    }
  }

  first() {
    return this[0] || undefined;
  }

  second() {
    return this[1] || undefined;
  }

  isStrike() {
    return this.length > 0 && this[0] == MAX_PINS_IN_FRAME;
  }

  isSpare() {
    return !this.isStrike(this) && sumArray(this) == MAX_PINS_IN_FRAME;
  }

  isComplete() {
    return this.length == this.frameSize || sumArray(this) == MAX_PINS_IN_FRAME;
  }
}

class SpareFrame extends Frame {
  constructor(data = []) {
    super(data, BOWLS_PER_SPARE_FRAME);
  }
}

class StrikeFrame extends Frame {}

module.exports = {
  Frame,
  SpareFrame,
  StrikeFrame
};
