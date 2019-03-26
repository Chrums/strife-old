import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Scene from '@core/Scene';
import System from '@core/System';
import Unique from '@core/Unique';

export interface Constructor<IEntity extends Entity, IComponent extends Component<IEntity>> {
    new (scene: Scene<IEntity, IComponent>): IEntity;
}

export default class Entity extends Unique {
    
    public get scene(): Scene<this, Component<this>> {
        return this.m_scene;
    }
    private m_scene: Scene<this, Component<this>>;
    
    public get components(): Components<this> {
        return this.m_components;
    }
    private m_components: Components<this> = new Components(this);
    
    public constructor(scene: Scene<any, any>) {
        super();
        this.m_scene = scene;
    }
    
    public destroy(): void {
        this.m_scene.entities.remove(this);
    }
    
}

class Components<IEntity extends Entity> {
    
    private m_entity: IEntity;
    
    public constructor(entity: IEntity) {
        this.m_entity = entity;
    }
    
    public add<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): IComponent {
        return this.m_entity.scene.components.add(componentConstructor)(this.m_entity);
    }
    
    public remove<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): boolean {
        return this.m_entity.scene.components.remove(componentConstructor)(this.m_entity);
    }
    
    public get<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): Optional<IComponent> {
        return this.m_entity.scene.components.get(componentConstructor)(this.m_entity);
    }
    
}