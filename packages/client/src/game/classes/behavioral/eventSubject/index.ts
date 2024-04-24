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

export default EventSubject;
