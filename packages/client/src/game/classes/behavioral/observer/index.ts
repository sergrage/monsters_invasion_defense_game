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

export default EventObserver;
