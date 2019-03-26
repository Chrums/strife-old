import Entity from '@core/Entity';

//export type Constructor<EventType extends Event> = new (...args: any[]) => EventType;

export interface Constructor<EntityType extends Entity<EntityType>, EventType extends Event<EntityType>> {
    new (...args: any[]): EventType;
    Priority?: number;
}

export default class Event<EntityType extends Entity<EntityType>> {
    
    public get entity(): Optional<EntityType> {
        return this.m_entity;
    }
    private m_entity?: EntityType;
    
}