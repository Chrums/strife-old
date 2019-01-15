import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import { Constructor as EventConstructor } from '@core/Event';
import System from '@core/System';
import Unique from '@core/Unique';

export interface Constructor<IEntity extends Entity, IComponent extends Component<IEntity>> {
    new (entity: IEntity): IComponent;
}

export default class Component<IEntity extends Entity> extends Unique {
    
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