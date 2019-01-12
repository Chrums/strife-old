import Event from '@core/Event';

export default class Dispatcher {
    
    private events: any[][] = [];
    private listeners = new Map();
    
    public on<E extends Event>(type) {
        return (callback) => {
            if (!this.listeners.has(type)) this.listeners.set(type, []);
            const listeners = this.listeners.get(type);
            listeners.push(callback);
        }
    }
    
    public emit(event) {
        const type = event.constructor;
        if (!type.Priority) this.consume(event);
        else this.queue(event);
    }
    
    public dispatch(): void {
        this.events.forEach(
            (events) => {
                const length = events.length;
                for (let i = 0; i < length; i++) {
                    const event = events.pop();
                    this.consume(event);
                }
            }
        );
    }
    
    private consume(event) {
        const type = event.constructor;
        const listeners = this.listeners.get(type);
        if (listeners) listeners.forEach((listener) => listener(event));
    }
    
    private queue(event) {
        const type = event.constructor;
        const Priority = type.Priority as number;
        if (!this.events[Priority]) this.events[Priority] = [];
        const events = this.events[Priority] as Event[];
        events.push(event);
    }
    
}