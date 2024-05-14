class EventBus {
  listeners: Map<string, Set<() => void>>;

  constructor() {
    this.listeners = new Map();
  }

  on(
    eventName: string,
    callback: (...args: Record<string, number | string>[]) => void,
  ): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    const listener = this.listeners.get(eventName);
    if (listener) {
      listener.add(callback);
    }
  }

  off(eventName: string, callback: () => void) {
    if (!this.listeners.has(eventName)) {
      throw new Error("No event");
    }
    const eventSet = this.listeners.get(eventName);
    if (eventSet) {
      eventSet.delete(callback);
    }
  }

  emit(eventName: string, ...args: unknown[]) {
    if (!this.listeners.has(eventName)) {
      throw new Error("No event");
    }

    const events = this.listeners.get(eventName);
    if (events) {
      events.forEach(item => {
        item(...(args as []));
      });
    }
  }
}

export default EventBus;
