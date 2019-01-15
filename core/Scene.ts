import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Dispatcher from '@core/Dispatcher';
import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import Storage from '@core/Storage';
import System from '@core/System';

export interface Constructor<IEntity extends Entity, IScene extends Scene<IEntity>> {
    new (entityConstructor: EntityConstructor<IEntity>): IScene;
}

export default class Scene<IEntity extends Entity> {
    
    public get dispatcher(): Dispatcher<IEntity> {
        return this.m_dispatcher;
    }
    private m_dispatcher: Dispatcher<IEntity> = new Dispatcher<IEntity>();
    
    public get entities(): Entities<IEntity> {
        return this.m_entities;
    }
    private m_entities: Entities<IEntity>;
    
    public get components(): Components<IEntity> {
        return this.m_components;
    }
    private m_components: Components<IEntity> = new Components<IEntity>(this);
    
    public get systems(): Systems<IEntity> {
        return this.m_systems;
    }
    private m_systems: Systems<IEntity> = new Systems<IEntity>(this);
    
    public constructor(entityConstructor: EntityConstructor<IEntity>) {
        this.m_entities = new Entities<IEntity>(this, entityConstructor);
    }
    
}

class Entities<IEntity extends Entity> {
    
    private m_scene: Scene<IEntity>;
    private m_constructor: EntityConstructor<IEntity>;
    
    public constructor(scene: Scene<IEntity>, entityConstructor: EntityConstructor<IEntity>) {
        this.m_scene = scene;
        this.m_constructor = entityConstructor;
    }
    
    public add(): IEntity {
        return new this.m_constructor(this.m_scene);
    }
    
    public remove(entity: IEntity): boolean {
        // TODO: Implement this...
        return false;
    }
    
}

class Components<IEntity extends Entity> {
    
    private m_scene: Scene<IEntity>;
    private m_components: Map<ComponentConstructor<IEntity, any>, Storage<IEntity, any>> = new Map();
    
    public constructor(scene: Scene<IEntity>) {
        this.m_scene = scene;
    }
    
    public register<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): void {
        const storage = new Storage(componentConstructor);
        this.m_components.set(componentConstructor, storage);
    }
    
    public add<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): (entity: IEntity) => IComponent {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return (entity: IEntity): IComponent => storage.add(entity);
    }
    
    public remove<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): (entity: IEntity) => boolean {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return (entity: IEntity): boolean => storage.remove(entity);
    }
    
    public get<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): (entity: IEntity) => Optional<IComponent> {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return (entity: IEntity): Optional<IComponent> => storage.get(entity);
    }
    
    public all<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): Storage<IEntity, IComponent> {
        return this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
    }
    
}

class Systems<IEntity extends Entity> {
    
    private m_scene: Scene<IEntity>;
    private m_systems: Map<ComponentConstructor<IEntity, any>, System<IEntity, any>> = new Map();
    
    public constructor(scene: Scene<IEntity>) {
        this.m_scene = scene;
    }
    
    public register<IComponent extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, IComponent>): void {
        const system = new System(this.m_scene, componentConstructor);
        this.m_systems.set(componentConstructor, system);
    }
    
}