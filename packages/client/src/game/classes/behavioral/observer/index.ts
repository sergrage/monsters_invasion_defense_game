// пока оставил event как string

interface Observer {
  update(event: string): void;
}

class EventObserver implements Observer {
  private callback: (event: string) => void;

  constructor(callback: (event: string) => void) {
    this.callback = callback;
  }

  update(event: string): void {
    this.callback(event);
  }
}

export default EventObserver;
