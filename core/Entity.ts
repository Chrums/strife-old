import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

export default class Entity extends Unique {
    
    public scene: Scene;
    public components: Components = new Components(this);
    
    public constructor(scene: Scene) {
        super();
        this.scene = scene;
    }
    
}

export type Constructor<E extends Entity = Entity> = new (scene: Scene) => E;

class Components {
    
    private entity: Entity;
    
    public constructor(entity: Entity) {
        this.entity = entity;
    }
    
    public add<C extends Component>(type: ComponentConstructor<C>): C {
        return this.entity.scene.components.add(type)(this.entity);
    }
    
    public remove<C extends Component>(type: ComponentConstructor<C>): boolean {
        return this.entity.scene.components.remove(type)(this.entity);
    }
    
    public get<C extends Component>(type: ComponentConstructor<C>): Optional<C> {
        return this.entity.scene.components.get(type)(this.entity);
    }
    
}