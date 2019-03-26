import Base, { Constructor as BaseConstructor } from '@core/Component';
import Entity from '@common/core/Entity';

export type Constructor<ComponentType extends Component> = new (entity: Entity) => ComponentType;

export default class Component extends Base<Entity> {
    
}