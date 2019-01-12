import Entity from '@core/Entity';
import Unique from '@core/Unique';

export default class Component extends Unique {
    
    public entity: Entity;
    
    public constructor(entity: Entity) {
        super();
        this.entity = entity;
    }
    
}

export type Constructor<C extends Component = Component> = new (entity: Entity) => C;