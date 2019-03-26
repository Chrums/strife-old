import Base from '@core/System';
import Component, { Constructor as ComponentConstructor } from '@common/core/Component';
import Entity from '@common/core/Entity';
import Scene from '@common/core/Scene';

export default class System<IComponent extends Component> extends Base<Entity, IComponent> {
    
    public constructor(scene: Scene, componentConstructor: ComponentConstructor<IComponent>) {
        super(scene, componentConstructor);
        
    }
    
}