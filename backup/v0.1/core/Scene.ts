import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import Storage, { Constructor as StorageConstructor } from '@core/Storage';

export default class Scene<IEntity extends Entity, IComponent extends Component<IEntity>, IStorage extends Storage<IEntity, IComponent>> {
    
    public static Register<C extends Component<Entity>>(componentConstructor: ComponentConstructor<Entity, C>) {
        Scene.m_componentConstructors.push(componentConstructor);
    }
    private static m_componentConstructors: ComponentConstructor<Entity, Component<Entity>>[] = [];
    
    public get entities(): Entities<IEntity> {
        return this.m_entities;
    }
    private m_entities: Entities<IEntity>;
    
    public get components(): Components<IEntity, IComponent, IStorage> {
        return this.m_components;
    }
    private m_components: Components<IEntity, IComponent, IStorage>;
    
    public constructor(entityConstructor: EntityConstructor<IEntity>, storageConstructor: StorageConstructor<IEntity, IComponent, IStorage>) {
        this.m_entities = new Entities(this, entityConstructor);
        this.m_components = new Components(storageConstructor);
        Scene.m_componentConstructors.forEach((componentConstructor: ComponentConstructor<Entity, Component<Entity>>): void => this.m_components.register(componentConstructor as unknown as ComponentConstructor<IEntity, IComponent>));
    }
    
}

class Entities<IEntity extends Entity> {
    
    private m_scene: Scene<IEntity, any, any>;
    private m_entityConstructor: EntityConstructor<IEntity>;
    
    public constructor(scene: Scene<IEntity, any, any>, entityConstructor: EntityConstructor<IEntity>) {
        this.m_scene = scene;
        this.m_entityConstructor = entityConstructor;
    }
    
    public add(): IEntity {
        return new this.m_entityConstructor(this.m_scene);
    }
    
    public remove(): boolean {
        // TODO: Implment this...
        return false;
    }
    
}

class Components<IEntity extends Entity, IComponent extends Component<IEntity>, IStorage extends Storage<IEntity, IComponent>> {
    
    private m_storageConstructor: StorageConstructor<IEntity, IComponent, IStorage>;
    private m_components: Map<ComponentConstructor<IEntity, Component<IEntity>>, Storage<IEntity, Component<IEntity>>> = new Map();
    
    public constructor(storageConstructor: StorageConstructor<IEntity, IComponent, IStorage>) {
        this.m_storageConstructor = storageConstructor;
    }
    
    public register<C extends IComponent>(componentConstructor: ComponentConstructor<IEntity, C>): void {
        const storage = new this.m_storageConstructor(componentConstructor);
        this.m_components.set(componentConstructor, storage);
    }
    
    public add<C extends IComponent>(componentConstructor: ComponentConstructor<IEntity, C>): (entity: IEntity) => C {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return storage.add.bind(storage);
    }
    
    public remove<C extends IComponent>(componentConstructor: ComponentConstructor<IEntity, C>): (entity: IEntity) => boolean {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return storage.remove.bind(storage);
    }
    
    public get<C extends Component<IEntity>>(componentConstructor: ComponentConstructor<IEntity, C>): (entity: IEntity) => Optional<C> {
        const storage = this.m_components.get(componentConstructor) as Storage<IEntity, IComponent>;
        return storage.get.bind(storage);
    }
    
}