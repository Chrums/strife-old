import Entity from '@core/Entity';

export interface Constructor<IEntity extends Entity, IEvent extends Event<IEntity>> {
    new (entity?: IEntity): IEvent;
    Priority?: number;
}

export default class Event<IEntity extends Entity> {
    
    public get entity(): Optional<IEntity> {
        return this.m_entity;
    }
    private m_entity?: IEntity;
    
    public constructor(entity?: IEntity) {
        this.m_entity = entity;
    }
    
}