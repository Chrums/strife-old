import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import Event, { Constructor as EventConstructor } from '@core/Event';
import System from '@core/System';
import Unique from '@core/Unique';

export default class Component<IEntity extends typeof Entity> extends Unique {
    
    public static On(eventConstructor: EventConstructor<any, any>) {
        return System.On(eventConstructor);
    }
    
    public get entity(): IEntity {
        return this.m_entity;
    }
    private m_entity: IEntity;
    
    public constructor(entity: IEntity) {
        super();
        this.m_entity = entity;
    }
    
}