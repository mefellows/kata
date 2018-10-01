const { flatten, sumArray } = require("./array");
const { Frame, SpareFrame, StrikeFrame } = require("./frame");
const MAX_FRAMES = 10;

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

    if (this.isNewFrame()) {
      frame = new Frame();

      if (this.isSpareBonusRound()) {
        frame = new SpareFrame();
      } else if (this.isStrikeBonusRound()) {
        frame = new StrikeFrame();
      }

      this.frames.push(frame);
    }

    frame.roll(noOfPins);
  }

  isNewFrame() {
    return (
      this.frames.length === 0 ||
      !this.currentFrame() ||
      this.currentFrame().isComplete()
    );
  }

  isGameFinished() {
    const frame = this.currentFrame() || new Frame();

    return (
      this.frames.length >= MAX_FRAMES &&
      frame.isComplete() &&
      !this.isBonusRound()
    );
  }

  isBonusRound() {
    return this.isStrikeBonusRound() || this.isSpareBonusRound();
  }

  isStrikeBonusRound() {
    const frame = this.currentFrame() || new Frame();
    return frame.isStrike() && this.frames.length == MAX_FRAMES;
  }

  isSpareBonusRound() {
    const frame = this.currentFrame() || new Frame();
    return frame.isSpare() && this.frames.length == MAX_FRAMES;
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
