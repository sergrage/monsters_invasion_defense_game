import EventObserver from "../observer";

class EventSubject {
  private observers: { [event: string]: EventObserver[] };

  constructor() {
    this.observers = {};
  }

  attach(event: string, observer: EventObserver): void {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  detach(event: string, observer: EventObserver): void {
    if (!this.observers[event]) return;
    this.observers[event] = this.observers[event].filter(
      obs => obs !== observer,
    );
  }

  // add default null data value because of triggerGameOverEvent fgame method
  notify(event: string, data: any = null): void {
    if (!this.observers[event]) return;
    this.observers[event].forEach(observer => observer.update(data));
  }
}

export default EventSubject;
