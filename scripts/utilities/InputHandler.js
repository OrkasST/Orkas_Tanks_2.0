export class InputHandler {
  constructor(...events) {
    this.input = [];
    for (let i = 0; i < events.length; i++) {
      document.addEventListener(events[i], (e) =>
        this.input.push([events[i], e])
      );
    }
  }

  getLastInput(num = 0) {
    return this.input[this.input.length - 1 - num];
  }
}
