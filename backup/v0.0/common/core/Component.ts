import Base from '@core/Component';
import Entity from '@common/core/Entity';

export interface Constructor<C extends Component> {
    new (entity: Entity): C;
}

export default class Component extends Base<Entity> {
    
    public value: string = "Hello, world!";
    
}