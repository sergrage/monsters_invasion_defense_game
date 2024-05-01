interface Observer {
  update(event: number): void; // Change the parameter type to number
}

class EventObserver implements Observer {
  private callback: (event: number) => void; // Change the parameter type to number

  constructor(callback: (event: number) => void) {
    // Change the parameter type to number
    this.callback = callback;
  }

  update(event: number): void {
    // Change the parameter type to number
    this.callback(event);
  }
}

export default EventObserver;
