import Entity from '@core/Entity';
import Event, { Constructor as EventConstructor } from '@core/Event';

export interface Constructor<IEntity extends Entity, IDispatcher extends Dispatcher<IEntity>> {
    new (): IDispatcher;
}

type Callback<IEntity extends Entity, IEvent extends Event<IEntity>> = (event: IEvent) => void;

export default class Dispatcher<IEntity extends Entity> {
    
    private m_events: Event<IEntity>[][] = [];
    private m_listeners = new Map<EventConstructor<IEntity, Event<IEntity>>, Callback<IEntity, Event<IEntity>>[]>();
    
    public on<IEvent extends Event<IEntity>>(eventConstructor: EventConstructor<IEntity, IEvent>): (callback: Callback<IEntity, IEvent>) => void {
        return (callback: Callback<IEntity, IEvent>): void => {
            const listeners = this.m_listeners.has(eventConstructor)
                ? this.m_listeners.get(eventConstructor) as Callback<IEntity, IEvent>[]
                : this.m_listeners.set(eventConstructor, []).get(eventConstructor) as Callback<IEntity, IEvent>[];
            listeners.push(callback);
        }
    }
    
    public emit<IEvent extends Event<IEntity>>(event: IEvent) {
        const eventConstructor = event.constructor as EventConstructor<IEntity, IEvent>;
        if (!eventConstructor.Priority) this.consume(event);
        else this.queue(event);
    }
    
    public dispatch(): void {
        this.m_events.forEach(
            (events: Event<IEntity>[]): void => {
                const length = events.length;
                for (let i = 0; i < length; i++) {
                    const event = events.pop() as Event<IEntity>;
                    this.consume(event);
                }
            }
        );
    }
    
    private consume<IEvent extends Event<IEntity>>(event: IEvent): void {
        const eventConstructor = event.constructor as EventConstructor<IEntity, IEvent>;
        const listeners = this.m_listeners.get(eventConstructor);
        if (listeners) listeners.forEach((listener: Callback<IEntity, IEvent>) => listener(event));
    }
    
    private queue<IEvent extends Event<IEntity>>(event: IEvent) {
        const eventConstructor = event.constructor as EventConstructor<IEntity, IEvent>;
        const priority = eventConstructor.Priority as number;
        if (!this.m_events[priority]) this.m_events[priority] = [];
        this.m_events[priority].push(event);
    }
    
}