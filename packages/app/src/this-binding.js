export class Timer {
  constructor() {
    this.seconds = 0;
    // ✅ Fix #1: Bind in constructor
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.seconds++;
    console.log(`Elapsed: ${this.seconds}s`);
  }

  start() {
    // ❌ Broken: setInterval loses `this` context
    // setInterval(this.tick, 1000);

    // ✅ Fix #2: Arrow function preserves lexical `this`
    setInterval(() => this.tick(), 1000);
  }
}

export class ModernTimer {
  seconds = 0;

  // ✅ Fix #3: Class field = arrow function (auto-binds)
  tick = () => {
    this.seconds++;
    console.log(`Elapsed: ${this.seconds}s`);
  };

  start() {
    setInterval(this.tick, 1000);
  }
}
