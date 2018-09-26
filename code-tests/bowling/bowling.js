const { flatten, sumArray } = require("./array");
const { Frame } = require("./frame");
const MAX_FRAMES = 10;
const STRIKE_FRAMES = 2;
const SPARE_FRAMES = 1;

const sumNextBowls = (frames, n) => sumArray(flatten(frames).slice(0, n));

class BowlingGame {
  constructor() {
    this.frames = []; // <-- All state is here, basically. The rest is PURE man
  }

  roll(noOfPins) {
    let frame = this.currentFrame();

    if (this.isGameFinished()) {
      throw Error("Game is over, no more bowls :(");
    }

    if (this.frames.length === 0 || !frame || frame.isComplete()) {
      frame = new Frame();
      this.frames.push(frame);
    }
    frame.roll(noOfPins);
  }

  isGameFinished() {
    return this.frames.length == MAX_FRAMES && this.currentFrame().isComplete();
  }

  currentFrame() {
    return this.frames.length > 0 ? this.frames[this.frames.length - 1] : null;
  }

  // Score is always calculated each time,
  // as it is both easily derivable from history and
  // reduces state complexity
  score() {
    return this.frames.reduce((acc, frame, i) => {
      let bonus = 0;
      const remainingFrames = this.frames.slice(i + 1);

      if (frame.isStrike()) {
        bonus = sumNextBowls(remainingFrames, 2);
      } else if (frame.isSpare()) {
        bonus = sumNextBowls(remainingFrames, 1);
      }
      return acc + sumArray(frame) + bonus;
    }, 0);
  }
}

module.exports = { BowlingGame };
