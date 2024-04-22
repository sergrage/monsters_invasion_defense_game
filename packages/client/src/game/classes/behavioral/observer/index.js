export class EventObserver {
  constructor(callback) {
    this.callback = callback;
  }

  update(event) {
    this.callback(event);
  }
}

export class EventSubject {
  constructor() {
    this.observers = {};
  }

  attach(event, observer) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  detach(event, observer) {
    if (!this.observers[event]) return;
    this.observers[event] = this.observers[event].filter(
      obs => obs !== observer,
    );
  }

  notify(event, data) {
    if (!this.observers[event]) return;
    this.observers[event].forEach(observer => observer.update(data));
  }
}
