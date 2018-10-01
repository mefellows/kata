const chai = require("chai");
const expect = chai.expect;
const { BowlingGame } = require("../bowling");
const { Frame } = require("../frame");

const rollTimes = (game, n) => {
  for (let i = 0; i < n; i++) {
    game.roll(i);
    game.roll(i);
  }
};

describe("BowlingGame", () => {
  let game = new BowlingGame();

  beforeEach(() => {
    game = new BowlingGame();
  });

  describe("#roll", () => {
    describe("when no frame has been played", () => {
      it("starts a new frame", () => {
        game.roll(1);
        game.roll(3);
        expect(game.frames.length).to.eql(1);
      });
      it("allows user to roll", () => {
        game.roll(1);
        game.roll(3);
        expect(game.isGameFinished()).to.eql(false);
      });
    });
    describe("when a full game has been played", () => {
      it("throws an error", () => {
        rollTimes(game, 10);
        expect(game.isGameFinished()).to.eql(true);
      });
    });
  });

  describe("#score", () => {
    describe("when no frames have been played", () => {
      it("the score should be 00", () => {
        game.frames = [];
        expect(game.score()).to.eql(0);
      });
    });
    describe("when one frame has been played with scores 5, 5", () => {
      it("the score should be 10", () => {
        game.frames = [new Frame([5, 5])];
        expect(game.score()).to.eql(10);
      });
    });
    describe("when two frames have been played with scores 4,6 | 5,0", () => {
      it("the score should be 20", () => {
        game.frames = [new Frame([4, 6]), new Frame([5, 0])];
        expect(game.score()).to.eql(20);
      });
    });
    describe("when two frames have been played with scores 10 | 5 and 4", () => {
      it("the score should be 28", () => {
        game.frames = [new Frame([10]), new Frame([5, 4])];
        expect(game.score()).to.eql(28);
      });
    });
    describe("when three frames have been played with scores 10 | 10 | 10", () => {
      it("the score should be 60", () => {
        game.frames = [new Frame([10]), new Frame([10]), new Frame([10])];
        expect(game.score()).to.eql(60);
      });
    });
    describe("when 10 strikes have been scored in a row", () => {
      it("the score should be 270", () => {
        game.frames = new Array(10).fill(new Frame([10]));
        expect(game.score()).to.eql(270);
      });
    });
    describe("when a perfect game is played", () => {
      it("the score should be 300", () => {
        game.frames = new Array(11).fill(new Frame([10]));
        expect(game.score()).to.eql(300);
      });
    });
  });

  describe("e2e scenarios", () => {
    describe("when no frame has been played", () => {
      it("the score should be 0", () => {
        expect(game.score()).to.eql(0);
      });
      it("the game should not be finished", () => {
        expect(game.isGameFinished()).to.eql(false);
      });
    });
    describe("when all 10 frames have been played", () => {
      describe("and no strike or spare was scored in the final frame", () => {
        it("the game should end", () => {
          game.frames = new Array(10).fill(new Frame([1, 1]));
          expect(game.isGameFinished()).to.eql(true);
        });
      });
      describe("and a strike was scored in the final frame", () => {
        it("the game allows a maximum score of 300", () => {
          game.frames = new Array(11).fill(new Frame([10]));
          expect(game.isGameFinished()).to.eql(true);
          expect(game.score()).to.eql(300);
        });
        it("the game allow two more bowls", () => {
          game.frames = new Array(10).fill(new Frame([10]));
          game.roll(1);
          game.roll(1);
          expect(game.isGameFinished()).to.eql(true);
          expect(() => game.roll(1)).to.throw(Error);
        });
      });
      describe("and a spare was scored in the final frame", () => {
        it("the game allow one more frame", () => {
          game.frames = new Array(9).fill(new Frame([0, 0]));
          game.roll(5);
          game.roll(5);
          game.roll(5);
          expect(game.isGameFinished()).to.eql(true);
          expect(() => game.roll(1)).to.throw(Error);
        });
      });
    });
  });
});
