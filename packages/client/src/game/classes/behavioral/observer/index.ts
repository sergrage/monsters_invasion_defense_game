interface Observer {
  update(event: any): void;
}

class EventObserver implements Observer {
  private callback: (event: any) => void;

  constructor(callback: (event: any) => void) {
    this.callback = callback;
  }

  update(event: any): void {
    this.callback(event);
  }
}

class EventSubject {
  private observers: { [event: string]: Observer[] };

  constructor() {
    this.observers = {};
  }

  attach(event: string, observer: Observer): void {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  detach(event: string, observer: Observer): void {
    if (!this.observers[event]) return;
    this.observers[event] = this.observers[event].filter(
      obs => obs !== observer,
    );
  }

  notify(event: string, data: any): void {
    if (!this.observers[event]) return;
    this.observers[event].forEach(observer => observer.update(data));
  }
}

export default EventObserver;
