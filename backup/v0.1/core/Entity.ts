import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

export type Constructor<IEntity extends Entity> = new (scene: Scene<IEntity, any, any>, id?: string) => IEntity;

export default class Entity extends Unique {
    
    public get scene(): Scene<this, any, any> {
        return this.m_scene;
    }
    private m_scene: Scene<this, any, any>;
    
    public get components(): Components<any> {
        return this.m_components;
    }
    private m_components: Components<any> = new Components(this);
    
    public constructor(scene: Scene<any, any, any>, id?: string) {
        super(id);
        this.m_scene = scene;
    }
    
}

class Components<IEntity extends Entity> {
    
    private m_entity: IEntity;
    
    public constructor(entity: IEntity) {
        this.m_entity = entity;
    }
    
    public add<C extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, C>): C {
        return this.m_entity.scene.components.add(componentConstructor)(this.m_entity);
    }
    
    public remove<C extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, C>): boolean {
        return this.m_entity.scene.components.remove(componentConstructor)(this.m_entity);
    }
    
    public get<C extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, C>): Optional<C> {
        return this.m_entity.scene.components.get(componentConstructor)(this.m_entity);
    }
    
}